import { Router } from 'express';
import { createVideo, getAllVideos, getPaginatedVideos } from '../controllers/videoController';
import { authenticateToken } from '../middleware/authMiddleware'; // Ensure authenticated uploads

const router = Router();

router.post('/upload', authenticateToken, createVideo);
router.get('/', getAllVideos);
router.get('/feed', getPaginatedVideos);

export default router;
