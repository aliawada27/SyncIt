// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Route de test pour l'authentification
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working',
    timestamp: new Date().toISOString()
  });
});

// Placeholder pour Google OAuth
router.post('/google', (req, res) => {
  logger.info('Google auth request received');
  res.json({
    success: false,
    message: 'Google OAuth not implemented yet',
    todo: 'Configure Google OAuth credentials'
  });
});

// Placeholder pour Facebook OAuth
router.post('/facebook', (req, res) => {
  logger.info('Facebook auth request received');
  res.json({
    success: false,
    message: 'Facebook OAuth not implemented yet',
    todo: 'Configure Facebook OAuth credentials'
  });
});

// Placeholder pour le profil utilisateur
router.get('/profile', (req, res) => {
  res.json({
    success: false,
    message: 'Authentication middleware not implemented yet',
    todo: 'Implement JWT middleware'
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router; 