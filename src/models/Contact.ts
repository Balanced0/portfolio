import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  email: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
}

const ContactSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    linkedin: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
