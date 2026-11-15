import { Router } from 'express';
import {
  getSocietyAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcement.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

// Public view
router.get('/society/:societySlug', getSocietyAnnouncements);

// Protected actions (Presidents & Admins)
router.use(protect);
router.post('/', requireRole('president', 'admin'), createAnnouncement);
router.patch('/:id', requireRole('president', 'admin'), updateAnnouncement);
router.delete('/:id', requireRole('president', 'admin'), deleteAnnouncement);

export default router;
