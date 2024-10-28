import { Router } from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);

export default router;