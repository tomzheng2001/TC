import { Request, Response } from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Video from '../models/Video';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const upload = multer({ storage: multer.memoryStorage() }).single('video');

export const createVideo = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: 'Video upload failed', error: err.message });
    }

    const { title, description, tags } = req.body;
    const file = req.file;
    const creatorId = (req as any).userId;

    if (!file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const s3Key = `${Date.now()}_${path.basename(file.originalname)}`

    try {
      const putObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(putObjectParams));
      const videoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

      const video = new Video({
        title,
        url: videoUrl,
        creatorId,
        description,
        tags: tags ? tags.split(',') : [],
      });

      await video.save();
      res.status(201).json({ message: 'Video uploaded successfully', video });
    } catch (error) {
      console.error('Error saving video to database:', error);
      res.status(500).json({ message: 'Failed to save video', error });
    }
  });
};

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving videos', error });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
      const videoId = req.params.id;
      const video = await Video.findById(videoId);

      if (!video) {
          res.status(404).json({ message: 'Video not found' });
          return;
      }

      res.status(200).json(video);
  } catch (error) {
      console.error('Error fetching video by ID:', error);
      res.status(500).json({ message: 'Error fetching video', error });
  }
};

export const getPaginatedVideos = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
  
    try {
      const videos = await Video.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching videos', error });
    }
};

// Like a Video
export const likeVideo = async (req: Request, res: Response) => {
  try {
    const { id: videoId } = req.params;
    const userId = (req as any).userId;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { $addToSet: { likes: userId } }, // Prevent duplicate likes
      { new: true }
    );

    if (!video) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }
    res.json(video);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error liking video', error });
    return;
  }
};

// Unlike a Video
export const unlikeVideo = async (req: Request, res: Response) => {
  try {
    const { id: videoId } = req.params;
    const userId = (req as any).userId;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { $pull: { likes: userId } },
      { new: true }
    );

    if (!video) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }
    res.json(video);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error unliking video', error });
    return;
  }
};

// Bookmark a Video
export const bookmarkVideo = async (req: Request, res: Response) => {
  try {
    const { id: videoId } = req.params;
    const userId = (req as any).userId;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { $addToSet: { bookmarks: userId } },
      { new: true }
    );

    if (!video) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }
    res.json(video);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error bookmarking video', error });
    return;
  }
};

// Unbookmark a Video
export const unbookmarkVideo = async (req: Request, res: Response) => {
  try {
    const { id: videoId } = req.params;
    const userId = (req as any).userId;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { $pull: { bookmarks: userId } },
      { new: true }
    );

    if (!video) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }
    res.json(video);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error unbookmarking video', error });
    return;
  }
};
