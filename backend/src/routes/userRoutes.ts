import { Router } from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById); // Protected route if needed

export default router;