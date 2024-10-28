// backend/src/app.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is working!');
});

// Test Route for Frontend Connection
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

// Connect to MongoDB and Start the Server
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.error('Connection error', error));
