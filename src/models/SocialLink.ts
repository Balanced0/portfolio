import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISocialLink extends Document {
  platform: string;
  url: string;
  icon?: string;
  order: number;
}

const SocialLinkSchema: Schema = new Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SocialLink: Model<ISocialLink> =
  mongoose.models.SocialLink || mongoose.model<ISocialLink>('SocialLink', SocialLinkSchema);
