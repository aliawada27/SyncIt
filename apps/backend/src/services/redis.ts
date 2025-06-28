// =============================================================================
// SYNCIT BACKEND - REDIS SERVICE
// =============================================================================

import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

class RedisService {
  private static instance: RedisService;
  private _client: RedisClientType;

  private constructor() {
    this._client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD || undefined,
      retry_strategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    // Event handlers
    this._client.on('error', (error) => {
      logger.error('Redis Client Error:', error);
    });

    this._client.on('connect', () => {
      logger.info('Redis Client Connected');
    });

    this._client.on('ready', () => {
      logger.info('Redis Client Ready');
    });

    this._client.on('end', () => {
      logger.info('Redis Client Connection Ended');
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public get client(): RedisClientType {
    return this._client;
  }

  public async connect(): Promise<void> {
    try {
      if (!this._client.isOpen) {
        await this._client.connect();
      }
      logger.info('Redis connected successfully');
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this._client.isOpen) {
        await this._client.disconnect();
      }
      logger.info('Redis disconnected successfully');
    } catch (error) {
      logger.error('Failed to disconnect from Redis:', error);
      throw error;
    }
  }

  public async healthCheck(): Promise<{ status: 'up' | 'down'; responseTime?: number }> {
    try {
      const start = Date.now();
      await this._client.ping();
      const responseTime = Date.now() - start;
      
      return {
        status: 'up',
        responseTime
      };
    } catch (error) {
      logger.error('Redis health check failed:', error);
      return {
        status: 'down'
      };
    }
  }

  // =============================================================================
  // CACHE OPERATIONS
  // =============================================================================

  public async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      if (ttl) {
        await this._client.setEx(key, ttl, stringValue);
      } else {
        await this._client.set(key, stringValue);
      }
    } catch (error) {
      logger.error(`Redis SET error for key ${key}:`, error);
      throw error;
    }
  }

  public async get<T = any>(key: string): Promise<T | null> {
    try {
      const value = await this._client.get(key);
      if (!value) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value as T;
      }
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error);
      throw error;
    }
  }

  public async del(key: string): Promise<number> {
    try {
      return await this._client.del(key);
    } catch (error) {
      logger.error(`Redis DEL error for key ${key}:`, error);
      throw error;
    }
  }

  public async exists(key: string): Promise<boolean> {
    try {
      const result = await this._client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Redis EXISTS error for key ${key}:`, error);
      throw error;
    }
  }

  public async expire(key: string, seconds: number): Promise<boolean> {
    try {
      const result = await this._client.expire(key, seconds);
      return result === 1;
    } catch (error) {
      logger.error(`Redis EXPIRE error for key ${key}:`, error);
      throw error;
    }
  }

  // =============================================================================
  // SESSION MANAGEMENT
  // =============================================================================

  public async setSession(sessionId: string, sessionData: any, ttl: number = 86400): Promise<void> {
    const key = `session:${sessionId}`;
    await this.set(key, sessionData, ttl);
  }

  public async getSession<T = any>(sessionId: string): Promise<T | null> {
    const key = `session:${sessionId}`;
    return this.get<T>(key);
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const key = `session:${sessionId}`;
    await this.del(key);
  }

  // =============================================================================
  // CHAT & REAL-TIME FEATURES
  // =============================================================================

  public async setUserOnline(userId: string, socketId: string): Promise<void> {
    const key = `user:online:${userId}`;
    await this.set(key, { socketId, timestamp: Date.now() }, 300); // 5 minutes TTL
  }

  public async setUserOffline(userId: string): Promise<void> {
    const key = `user:online:${userId}`;
    await this.del(key);
  }

  public async isUserOnline(userId: string): Promise<boolean> {
    const key = `user:online:${userId}`;
    return this.exists(key);
  }

  public async addUserToRoom(roomId: string, userId: string): Promise<void> {
    const key = `room:${roomId}:users`;
    await this._client.sAdd(key, userId);
    await this.expire(key, 3600); // 1 hour TTL
  }

  public async removeUserFromRoom(roomId: string, userId: string): Promise<void> {
    const key = `room:${roomId}:users`;
    await this._client.sRem(key, userId);
  }

  public async getRoomUsers(roomId: string): Promise<string[]> {
    const key = `room:${roomId}:users`;
    return this._client.sMembers(key);
  }

  public async setTypingIndicator(eventId: string, userId: string): Promise<void> {
    const key = `typing:${eventId}:${userId}`;
    await this.set(key, Date.now(), 5); // 5 seconds TTL
  }

  public async removeTypingIndicator(eventId: string, userId: string): Promise<void> {
    const key = `typing:${eventId}:${userId}`;
    await this.del(key);
  }

  public async getTypingUsers(eventId: string): Promise<string[]> {
    const pattern = `typing:${eventId}:*`;
    const keys = await this._client.keys(pattern);
    return keys.map(key => key.split(':')[2]);
  }

  // =============================================================================
  // RATE LIMITING
  // =============================================================================

  public async incrementCounter(key: string, ttl: number = 3600): Promise<number> {
    const result = await this._client.incr(key);
    if (result === 1) {
      await this.expire(key, ttl);
    }
    return result;
  }

  public async getCounter(key: string): Promise<number> {
    const value = await this._client.get(key);
    return value ? parseInt(value, 10) : 0;
  }

  // =============================================================================
  // NOTIFICATIONS QUEUE
  // =============================================================================

  public async queueNotification(notification: any): Promise<void> {
    const key = 'notifications:queue';
    await this._client.lPush(key, JSON.stringify(notification));
  }

  public async dequeueNotification(): Promise<any> {
    const key = 'notifications:queue';
    const notification = await this._client.rPop(key);
    return notification ? JSON.parse(notification) : null;
  }

  public async getQueueLength(): Promise<number> {
    const key = 'notifications:queue';
    return this._client.lLen(key);
  }
}

// Export singleton instance
export const redis = RedisService.getInstance();

// Initialize Redis connection
export async function initializeRedis(): Promise<void> {
  await redis.connect();
}

// Cleanup function
export async function cleanupRedis(): Promise<void> {
  await redis.disconnect();
} 