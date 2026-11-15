import { Router } from 'express';
import {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/:slug', getEventBySlug);

// Protected routes (Society Presidents & University Admins)
router.use(protect);
router.post('/', requireRole('president', 'admin'), createEvent);
router.patch('/:slug', requireRole('president', 'admin'), updateEvent);
router.delete('/:slug', requireRole('president', 'admin'), deleteEvent);

export default router;
