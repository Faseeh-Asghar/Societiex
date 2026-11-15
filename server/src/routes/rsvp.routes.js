import { Router } from 'express';
import {
  createRSVP,
  cancelRSVP,
  getMyRSVPs,
  getEventRSVPs,
} from '../controllers/rsvp.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Public attendee query
router.get('/event/:eventSlug', getEventRSVPs);

// Protected routes
router.use(protect);
router.post('/', createRSVP);
router.delete('/:id', cancelRSVP);
router.get('/my', getMyRSVPs);

export default router;
