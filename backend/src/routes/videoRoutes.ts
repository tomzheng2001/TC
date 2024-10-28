import { Router } from 'express';
import { createVideo, getAllVideos } from '../controllers/videoController';

const router = Router();

router.post('/upload', createVideo);
router.get('/', getAllVideos);

export default router;