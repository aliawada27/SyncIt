// =============================================================================
// HEALTH CHECK ROUTES
// =============================================================================

import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Health check simple
router.get('/', async (req: Request, res: Response) => {
  try {
    const timestamp = new Date().toISOString();
    
    const health = {
      status: 'ok',
      timestamp,
      version: '1.0.0',
      mode: 'demo',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      services: {
        api: { status: 'up' },
        socketio: { status: 'up' },
        database: { status: 'demo' },
        redis: { status: 'demo' }
      }
    };

    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

// Health check détaillé
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();
    const totalTime = Date.now() - startTime;

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      mode: 'demo',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      services: {
        api: { status: 'up', responseTime: totalTime },
        socketio: { status: 'up' },
        database: { status: 'demo', message: 'Running without database' },
        redis: { status: 'demo', message: 'Running without Redis' }
      },
      performance: {
        totalResponseTime: totalTime,
        nodeVersion: process.version,
        platform: process.platform
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 