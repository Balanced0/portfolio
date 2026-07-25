import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  designation: string;
  aboutText: string;
  hobbies: string[];
  photoUrl: string;
  resumeUrl: string;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutNarrativeTitle?: string;
  aboutText2?: string;
  highlight1Title?: string;
  highlight1Label?: string;
  highlight2Title?: string;
  highlight2Label?: string;
  highlight3Title?: string;
  highlight3Label?: string;
  hobbiesTitle?: string;
  ethosQuote?: string;
  ethosSubtitle?: string;
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
    aboutTitle: { type: String, default: 'Engineering Background' },
    aboutSubtitle: { type: String, default: 'Background & Philosophy' },
    aboutNarrativeTitle: { type: String, default: 'My Journey & Philosophy' },
    aboutText2: { type: String, default: 'I specialize in modern JavaScript/TypeScript ecosystems — building resilient web apps with Next.js App Router, scaling backend services with Node.js and MongoDB, and designing smooth 60fps user interactions using Framer Motion and WebGL.' },
    highlight1Title: { type: String, default: 'Architected' },
    highlight1Label: { type: String, default: 'Clean System Design' },
    highlight2Title: { type: String, default: '60 FPS' },
    highlight2Label: { type: String, default: 'Fluid Micro-Motion' },
    highlight3Title: { type: String, default: '< 50 ms' },
    highlight3Label: { type: String, default: 'Target Response Latency' },
    hobbiesTitle: { type: String, default: 'Passions & Interests' },
    ethosQuote: { type: String, default: 'Obsessed with detail, driven by curiosity.' },
    ethosSubtitle: { type: String, default: 'Engineering Ethos' },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
