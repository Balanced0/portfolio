import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  slug: string;
  image: string;
  teaser: string;
  techStack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  challenges?: string;
  futureImprovements?: string;
  featured?: boolean;
  order: number;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    teaser: { type: String, required: true },
    techStack: [{ type: String }],
    description: { type: String, required: true },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    challenges: { type: String, default: '' },
    futureImprovements: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
