// =============================================================================
// CHAT ROUTES
// =============================================================================

import { Router } from 'express';

const router = Router();

// Messages d'un événement
router.get('/:eventId/messages', (req, res) => {
  const { eventId } = req.params;
  res.json({
    success: true,
    data: [
      {
        id: '1',
        content: 'Salut tout le monde ! 👋',
        userId: 'demo-user',
        eventId,
        user: { firstName: 'Demo', lastName: 'User' },
        createdAt: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: '2',
        content: 'L\'événement commence bientôt !',
        userId: 'user2',
        eventId,
        user: { firstName: 'John', lastName: 'Doe' },
        createdAt: new Date(Date.now() - 60000).toISOString()
      }
    ]
  });
});

// Envoyer un message
router.post('/:eventId/messages', (req, res) => {
  const { eventId } = req.params;
  res.status(201).json({
    success: true,
    data: {
      id: Date.now().toString(),
      content: req.body.content,
      userId: 'demo-user',
      eventId,
      user: { firstName: 'Demo', lastName: 'User' },
      createdAt: new Date().toISOString()
    }
  });
});

export default router; 