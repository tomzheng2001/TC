import { Router } from 'express';
import { createVideo, getAllVideos, upload } from '../controllers/videoController';
import { authenticateToken } from '../middleware/authMiddleware'; // Ensure authenticated uploads

const router = Router();

router.post('/upload', authenticateToken, createVideo);
router.get('/', getAllVideos);

export default router;
