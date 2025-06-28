// =============================================================================
// SOCKET.IO SERVER
// =============================================================================

import { Server as SocketIOServer } from 'socket.io';
import { logger } from '../utils/logger';
import { redis } from '../services/redis';

export function initializeSocketIO(io: SocketIOServer) {
  logger.info('Initializing Socket.IO server...');

  // Middleware d'authentification Socket.IO (placeholder)
  io.use((socket, next) => {
    // Pour la démo, on autorise toutes les connexions
    logger.info('Socket.IO: Client connecting', { socketId: socket.id });
    next();
  });

  io.on('connection', (socket) => {
    logger.info('Socket.IO: Client connected', { socketId: socket.id });

    // Rejoindre une room d'événement
    socket.on('join_room', async (eventId: string) => {
      logger.info('Socket.IO: User joining room', { socketId: socket.id, eventId });
      
      await socket.join(`event:${eventId}`);
      await redis.addUserToRoom(eventId, socket.id);
      
      // Notifier les autres utilisateurs
      socket.to(`event:${eventId}`).emit('user_joined', {
        eventId,
        user: { id: 'demo-user', firstName: 'Demo', lastName: 'User' }
      });

      socket.emit('joined_room', { eventId, success: true });
    });

    // Quitter une room d'événement
    socket.on('leave_room', async (eventId: string) => {
      logger.info('Socket.IO: User leaving room', { socketId: socket.id, eventId });
      
      await socket.leave(`event:${eventId}`);
      await redis.removeUserFromRoom(eventId, socket.id);
      
      // Notifier les autres utilisateurs
      socket.to(`event:${eventId}`).emit('user_left', {
        eventId,
        user: { id: 'demo-user', firstName: 'Demo', lastName: 'User' }
      });
    });

    // Envoyer un message
    socket.on('send_message', async (data: { eventId: string; content: string }) => {
      logger.info('Socket.IO: Message sent', { socketId: socket.id, data });
      
      const message = {
        id: Date.now().toString(),
        content: data.content,
        userId: 'demo-user',
        eventId: data.eventId,
        user: { firstName: 'Demo', lastName: 'User' },
        createdAt: new Date().toISOString()
      };

      // Broadcast le message à tous les clients de la room
      io.to(`event:${data.eventId}`).emit('message_sent', message);
    });

    // Indicateur de frappe
    socket.on('typing_start', async (eventId: string) => {
      await redis.setTypingIndicator(eventId, socket.id);
      socket.to(`event:${eventId}`).emit('user_typing', {
        eventId,
        user: { id: 'demo-user', firstName: 'Demo', lastName: 'User' }
      });
    });

    socket.on('typing_stop', async (eventId: string) => {
      await redis.removeTypingIndicator(eventId, socket.id);
      socket.to(`event:${eventId}`).emit('user_stopped_typing', {
        eventId,
        user: { id: 'demo-user', firstName: 'Demo', lastName: 'User' }
      });
    });

    // Déconnexion
    socket.on('disconnect', (reason) => {
      logger.info('Socket.IO: Client disconnected', { 
        socketId: socket.id, 
        reason 
      });
    });

    // Gestion d'erreurs
    socket.on('error', (error) => {
      logger.error('Socket.IO: Socket error', { 
        socketId: socket.id, 
        error: error.message 
      });
    });

    // Événement de test
    socket.emit('welcome', {
      message: 'Bienvenue sur SyncIt!',
      timestamp: new Date().toISOString()
    });
  });

  logger.info('Socket.IO server initialized successfully');
} 