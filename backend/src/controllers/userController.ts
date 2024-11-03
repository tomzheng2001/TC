import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Video from '../models/Video';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    return;
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
    return;
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      res.status(404).json({ message: 'User not found during login' });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate token if password matches
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, userId: user._id });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
    return;
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
    return;
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const uploadedVideos = await Video.find({ creatorId: new mongoose.Types.ObjectId(userId) });
      res.json({ user, uploadedVideos });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

export const toggleSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, creatorId } = req.body;
    const user = await User.findById(userId);
    const creator = await User.findById(creatorId);

    if (!user || !creator) {
      res.status(404).json({ message: 'User or Creator not found' });
      return;
    }

    const isSubscribed = user.subscriptions.includes(creatorId);
    if (isSubscribed) {
      user.subscriptions = user.subscriptions.filter(id => id !== creatorId);
      creator.subscribers = creator.subscribers.filter(id => id !== userId);
    } else {
      user.subscriptions.push(creatorId);
      creator.subscribers.push(userId);
    }

    await user.save();
    await creator.save();

    res.json({ message: isSubscribed ? 'Unsubscribed' : 'Subscribed' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error });
  }
};