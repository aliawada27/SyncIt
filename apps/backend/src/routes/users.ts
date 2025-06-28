// =============================================================================
// USERS ROUTES
// =============================================================================

import { Router } from 'express';

const router = Router();

// Profil utilisateur
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'demo-user',
      email: 'demo@syncit.app',
      firstName: 'Demo',
      lastName: 'User',
      avatar: null,
      createdAt: new Date().toISOString()
    }
  });
});

// Rechercher des utilisateurs
router.get('/search', (req, res) => {
  const { q } = req.query;
  res.json({
    success: true,
    data: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com'
      }
    ].filter(user => 
      !q || `${user.firstName} ${user.lastName}`.toLowerCase().includes(q.toString().toLowerCase())
    )
  });
});

export default router; 