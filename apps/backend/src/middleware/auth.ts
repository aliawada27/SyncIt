// =============================================================================
// AUTHENTICATION MIDDLEWARE
// =============================================================================

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Interface pour étendre Request avec user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// Middleware d'authentification (placeholder)
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Pour la démo, on simule un utilisateur connecté
  req.user = {
    id: 'demo-user',
    email: 'demo@syncit.app'
  };

  logger.info('Auth middleware - demo user authenticated', { userId: req.user.id });
  next();
};

// Middleware de vérification des rôles (placeholder)
export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Pour la démo, on autorise tout
    logger.info('Role middleware - demo authorization', { roles });
    next();
  };
}; 