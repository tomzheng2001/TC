import { Request, Response } from 'express';
import Video from '../models/Video';

// Create Video
export const createVideo = async (req: Request, res: Response) => {
  try {
    const { title, url, creatorId, description, tags } = req.body;
    const video = new Video({ title, url, creatorId, description, tags });
    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully', video });
    return;
  } catch (error) {
    res.status(400).json({ message: 'Failed to upload video', error });
    return;
  }
};

// Get All Videos
export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find();
    res.json(videos);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving videos', error });
    return;
  }
};