// =============================================================================
// EVENTS ROUTES
// =============================================================================

import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Liste des événements
router.get('/', (req, res) => {
  logger.info('Get events request');
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Événement de démonstration',
        description: 'Ceci est un événement de test pour SyncIt',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(),
        status: 'active',
        participantsCount: 5
      }
    ],
    meta: {
      total: 1,
      page: 1,
      limit: 20
    }
  });
});

// Créer un événement
router.post('/', (req, res) => {
  logger.info('Create event request', req.body);
  res.status(201).json({
    success: true,
    data: {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    message: 'Event created successfully'
  });
});

// Détails d'un événement
router.get('/:id', (req, res) => {
  const { id } = req.params;
  logger.info(`Get event ${id} request`);
  
  res.json({
    success: true,
    data: {
      id,
      title: 'Événement de démonstration',
      description: 'Ceci est un événement de test pour SyncIt',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000).toISOString(),
      status: 'active',
      inviteCode: 'DEMO1234',
      participants: [
        { id: '1', name: 'John Doe', role: 'organizer' },
        { id: '2', name: 'Jane Smith', role: 'participant' }
      ],
      tasks: [
        { id: '1', title: 'Préparer la présentation', status: 'todo' },
        { id: '2', title: 'Réserver la salle', status: 'done' }
      ]
    }
  });
});

export default router; 