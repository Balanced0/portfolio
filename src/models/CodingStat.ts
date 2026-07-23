import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICodingStat extends Document {
  platform: 'codeforces' | 'leetcode';
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ratingHistory?: Array<{ title: string; rating: number; date: string }>;
  lastFetchedAt: Date;
}

const CodingStatSchema: Schema = new Schema(
  {
    platform: { type: String, required: true, enum: ['codeforces', 'leetcode'] },
    handle: { type: String, required: true },
    rating: { type: Number, default: 0 },
    maxRating: { type: Number, default: 0 },
    rank: { type: String, default: 'N/A' },
    totalSolved: { type: Number, default: 0 },
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    ratingHistory: [
      {
        title: { type: String },
        rating: { type: Number },
        date: { type: String },
      },
    ],
    lastFetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CodingStat: Model<ICodingStat> =
  mongoose.models.CodingStat || mongoose.model<ICodingStat>('CodingStat', CodingStatSchema);
