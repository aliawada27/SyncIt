// =============================================================================
// SYNCIT BACKEND - POINT D'ENTRÉE PRINCIPAL
// =============================================================================

import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server as SocketIOServer } from 'socket.io';

// Services
import { logger } from './utils/logger';

// Routes
import authRoutes from './routes/auth';
import eventsRoutes from './routes/events';
import tasksRoutes from './routes/tasks';
import usersRoutes from './routes/users';
import chatRoutes from './routes/chat';
import notificationsRoutes from './routes/notifications';
import uploadRoutes from './routes/upload';
import healthRoutes from './routes/health';

// Middleware
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

const PORT = process.env.BACKEND_PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    // =============================================================================
    // INITIALIZE SERVICES (SIMPLIFIED FOR DEMO)
    // =============================================================================
    
    logger.info('🚀 Starting SyncIt Backend Server (Demo Mode)...');
    
    // Note: Redis et Database sont désactivés pour la démo
    logger.info('✅ Running in demo mode (no external dependencies)');

    // =============================================================================
    // EXPRESS APP SETUP
    // =============================================================================
    
    const app = express();
    const server = http.createServer(app);
    
    // Basic middleware
    app.use(helmet());
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
      credentials: true
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use('/api', limiter);

    // Request logging
    app.use((req, res, next) => {
      logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      next();
    });

    // =============================================================================
    // SOCKET.IO SETUP
    // =============================================================================
    
    const io = new SocketIOServer(server, {
      cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
        credentials: true
      }
    });
    
    // Simple Socket.IO handlers
    io.on('connection', (socket) => {
      logger.info('Client connected to Socket.IO', { socketId: socket.id });

      socket.on('join_room', (eventId: string) => {
        socket.join(`event:${eventId}`);
        logger.info('User joined room', { socketId: socket.id, eventId });
        socket.emit('joined_room', { eventId, success: true });
      });

      socket.on('leave_room', (eventId: string) => {
        socket.leave(`event:${eventId}`);
        logger.info('User left room', { socketId: socket.id, eventId });
      });

      socket.on('send_message', (data: { eventId: string; content: string }) => {
        logger.info('Message sent', { socketId: socket.id, data });
        const message = {
          id: Date.now().toString(),
          content: data.content,
          userId: 'demo-user',
          eventId: data.eventId,
          user: { firstName: 'Demo', lastName: 'User' },
          createdAt: new Date().toISOString()
        };
        io.to(`event:${data.eventId}`).emit('message_sent', message);
      });

      socket.on('disconnect', (reason) => {
        logger.info('Client disconnected', { socketId: socket.id, reason });
      });
    });
    
    logger.info('✅ Socket.IO initialized');

    // Make io available to routes
    app.set('io', io);

    // =============================================================================
    // REST API ROUTES
    // =============================================================================
    
    // Public routes
    app.use('/api/health', healthRoutes);
    app.use('/api/auth', authRoutes);
    
    // Protected routes (simplified - no real auth for demo)
    app.use('/api/events', eventsRoutes);
    app.use('/api/tasks', tasksRoutes);
    app.use('/api/users', usersRoutes);
    app.use('/api/chat', chatRoutes);
    app.use('/api/notifications', notificationsRoutes);
    app.use('/api/upload', uploadRoutes);

    // Root endpoint
    app.get('/api', (req, res) => {
      res.json({
        name: 'SyncIt API',
        version: '1.0.0',
        status: 'running',
        mode: 'demo', 
        timestamp: new Date().toISOString(),
        endpoints: {
          health: '/api/health',
          auth: '/api/auth',
          events: '/api/events',
          tasks: '/api/tasks',
          users: '/api/users',
          chat: '/api/chat',
          notifications: '/api/notifications',
          upload: '/api/upload'
        }
      });
    });

    // =============================================================================
    // ERROR HANDLING
    // =============================================================================
    
    app.use(errorHandler);

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
      });
    });

    // =============================================================================
    // START SERVER
    // =============================================================================
    
    server.listen(PORT, () => {
      logger.info(`🎯 SyncIt Backend running on port ${PORT}`);
      logger.info(`🌐 API: http://localhost:${PORT}/api`);
      logger.info(`🔗 Socket.IO: http://localhost:${PORT}`);
      logger.info(`🌍 Environment: ${NODE_ENV} (Demo Mode)`);
      logger.info(`📊 Health Check: http://localhost:${PORT}/api/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`);
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer(); 