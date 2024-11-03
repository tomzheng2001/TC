import { Router } from 'express';
import { bookmarkVideo, createVideo, getAllVideos, getPaginatedVideos, getVideoById, likeVideo, unbookmarkVideo, unlikeVideo } from '../controllers/videoController';
import { authenticateToken } from '../middleware/authMiddleware'; // Ensure authenticated uploads

const router = Router();

router.post('/upload', authenticateToken, createVideo);
router.get('/', getAllVideos);
router.get('/feed', getPaginatedVideos);
router.get('/:id', getVideoById);

router.post('/:id/like', authenticateToken, likeVideo);
router.post('/:id/unlike', authenticateToken, unlikeVideo);
router.post('/:id/bookmark', authenticateToken, bookmarkVideo);
router.post('/:id/unbookmark', authenticateToken, unbookmarkVideo);

export default router;
