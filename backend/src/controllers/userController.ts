import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

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
    res.json({ message: 'Login successful', token });
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