import { Router } from 'express';
import {
  getSocieties,
  getSocietyBySlug,
  createSociety,
  updateSociety,
  assignPresident,
  deactivateSociety,
  getSocietyMembers,
} from '../controllers/society.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

// Public routes
router.get('/', getSocieties);
router.get('/:slug', getSocietyBySlug);

// Protected routes
router.use(protect);
router.post('/', requireRole('admin'), createSociety);
router.patch('/:slug', requireRole('president', 'admin'), updateSociety);
router.patch('/:slug/president', requireRole('admin'), assignPresident);
router.delete('/:slug', requireRole('admin'), deactivateSociety);
router.get('/:slug/members', requireRole('president', 'admin'), getSocietyMembers);

export default router;
