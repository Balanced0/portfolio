import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  designation: string;
  aboutText: string;
  hobbies: string[];
  photoUrl: string;
  resumeUrl: string;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    aboutText: { type: String, required: true },
    hobbies: [{ type: String }],
    photoUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
