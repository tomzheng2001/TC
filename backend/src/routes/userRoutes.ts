import { Router } from 'express';
import { registerUser, loginUser, getUserById, getUserProfile, toggleSubscription } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/:id/profile', getUserProfile)
router.post('/subscribe', toggleSubscription)

export default router;