// =============================================================================
// SYNCIT BACKEND - DATABASE SERVICE
// =============================================================================

import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

// Singleton Prisma Client
class DatabaseService {
  private static instance: DatabaseService;
  private _prisma: PrismaClient;

  private constructor() {
    this._prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public get prisma(): PrismaClient {
    return this._prisma;
  }

  public async connect(): Promise<void> {
    try {
      await this._prisma.$connect();
      logger.info('Database connected successfully');
    } catch (error) {
      logger.error('Failed to connect to database:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this._prisma.$disconnect();
      logger.info('Database disconnected successfully');
    } catch (error) {
      logger.error('Failed to disconnect from database:', error);
      throw error;
    }
  }

  public async healthCheck(): Promise<{ status: 'up' | 'down'; responseTime?: number }> {
    try {
      const start = Date.now();
      await this._prisma.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - start;
      
      return {
        status: 'up',
        responseTime
      };
    } catch (error) {
      logger.error('Database health check failed:', error);
      return {
        status: 'down'
      };
    }
  }

  // Transaction helper
  public async transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return this._prisma.$transaction(fn);
  }

  // Common query helpers
  public async findUserByEmail(email: string) {
    return this._prisma.user.findUnique({
      where: { email }
    });
  }

  public async findUserById(id: string) {
    return this._prisma.user.findUnique({
      where: { id }
    });
  }

  public async findEventById(id: string) {
    return this._prisma.event.findUnique({
      where: { id },
      include: {
        creator: true,
        participants: {
          include: {
            user: true
          }
        }
      }
    });
  }

  public async findEventByInviteCode(inviteCode: string) {
    return this._prisma.event.findUnique({
      where: { inviteCode },
      include: {
        creator: true,
        participants: {
          include: {
            user: true
          }
        }
      }
    });
  }

  public async isUserParticipantOfEvent(userId: string, eventId: string) {
    const participant = await this._prisma.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });
    return participant !== null;
  }

  public async getUserEvents(userId: string) {
    return this._prisma.event.findMany({
      where: {
        OR: [
          { createdBy: userId },
          {
            participants: {
              some: {
                userId,
                status: 'ACCEPTED'
              }
            }
          }
        ]
      },
      include: {
        creator: true,
        participants: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            tasks: true,
            messages: true,
            participants: true
          }
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    });
  }

  public async getEventTasks(eventId: string) {
    return this._prisma.task.findMany({
      where: { eventId },
      include: {
        assignee: true,
        creator: true,
        comments: {
          include: {
            user: true
          }
        },
        attachments: true
      },
      orderBy: [
        { status: 'asc' },
        { position: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();

// Initialize database connection
export async function initializeDatabase(): Promise<void> {
  await db.connect();
}

// Cleanup function
export async function cleanupDatabase(): Promise<void> {
  await db.disconnect();
} 