// =============================================================================
// UPLOAD ROUTES
// =============================================================================

import { Router } from 'express';

const router = Router();

// Upload de fichier (placeholder)
router.post('/', (req, res) => {
  res.json({
    success: false,
    message: 'File upload not implemented yet',
    todo: 'Configure Cloudinary or file storage service'
  });
});

export default router; 