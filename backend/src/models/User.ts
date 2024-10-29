import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  subscriptions: string[]; // Array of subscribed creator IDs
  subscribers: string[];   // Array of user IDs who follow this user
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptions: [{ type: String }],
  subscribers: [{ type: String }]
});

export default mongoose.model<IUser>('User', UserSchema);