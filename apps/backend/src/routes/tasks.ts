// =============================================================================
// TASKS ROUTES
// =============================================================================

import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Liste des tâches
router.get('/', (req, res) => {
  const { eventId } = req.query;
  logger.info('Get tasks request', { eventId });
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Préparer la présentation',
        description: 'Créer les slides pour la demo',
        status: 'todo',
        priority: 'high',
        eventId: eventId || '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Réserver la salle',
        description: 'Contacter le service réservation',
        status: 'in_progress',
        priority: 'medium',
        eventId: eventId || '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Préparer le matériel',
        description: 'Vérifier projecteur et micros',
        status: 'done',
        priority: 'low',
        eventId: eventId || '1',
        createdAt: new Date().toISOString()
      }
    ]
  });
});

// Créer une tâche
router.post('/', (req, res) => {
  logger.info('Create task request', req.body);
  res.status(201).json({
    success: true,
    data: {
      id: Date.now().toString(),
      ...req.body,
      status: 'todo',
      createdAt: new Date().toISOString()
    },
    message: 'Task created successfully'
  });
});

// Mettre à jour une tâche
router.put('/:id', (req, res) => {
  const { id } = req.params;
  logger.info(`Update task ${id}`, req.body);
  
  res.json({
    success: true,
    data: {
      id,
      ...req.body,
      updatedAt: new Date().toISOString()
    },
    message: 'Task updated successfully'
  });
});

export default router; 