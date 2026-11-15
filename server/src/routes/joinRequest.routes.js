import { Router } from 'express';
import {
  submitJoinRequest,
  getMyJoinRequests,
  getSocietyJoinRequests,
  approveJoinRequest,
  rejectJoinRequest,
} from '../controllers/joinRequest.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

router.use(protect);

// Student actions
router.post('/', submitJoinRequest);
router.get('/my', getMyJoinRequests);

// President / Admin actions
router.get('/society/:societySlug', requireRole('president', 'admin'), getSocietyJoinRequests);
router.patch('/:id/approve', requireRole('president', 'admin'), approveJoinRequest);
router.patch('/:id/reject', requireRole('president', 'admin'), rejectJoinRequest);

export default router;
