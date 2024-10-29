import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  url: string;
  creatorId: string;
  description: string;
  tags: string[];
  likes: string[]; // Array of user IDs who liked the video
  bookmarks: string[]; // Array of user IDs who bookmarked the video
  likeCount?: number; // Optional because they may not always be present
  bookmarkCount?: number;
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  creatorId: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  likes: [{ type: String }],
  bookmarks: [{ type: String }]
});

export default mongoose.model<IVideo>('Video', VideoSchema);