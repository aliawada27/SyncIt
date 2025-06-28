// =============================================================================
// NOTIFICATIONS ROUTES
// =============================================================================

import { Router } from 'express';

const router = Router();

// Liste des notifications
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Nouvelle tâche assignée',
        body: 'Une nouvelle tâche vous a été assignée',
        type: 'task_assigned',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Événement bientôt',
        body: 'Votre événement commence dans 1 heure',
        type: 'event_reminder',
        isRead: true,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ]
  });
});

// Marquer comme lu
router.put('/:id/read', (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    message: `Notification ${id} marked as read`
  });
});

export default router; 