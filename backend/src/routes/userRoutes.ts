import { Router } from 'express';
import { registerUser, loginUser, getUserById, getUserProfile, toggleSubscription } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', authenticateToken, getUserProfile);
router.post('/subscribe', authenticateToken, toggleSubscription);

export default router;