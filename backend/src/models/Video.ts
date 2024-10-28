import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  url: string;
  creatorId: string;
  description: string;
  tags: string[];
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  creatorId: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
});

export default mongoose.model<IVideo>('Video', VideoSchema);