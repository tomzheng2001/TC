import { Router } from 'express';
import { registerUser, loginUser, getUserById, getUserProfile } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/:id/profile', getUserProfile)

export default router;