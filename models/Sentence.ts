import mongoose from 'mongoose';

export interface ISentence {
  english: string;
  chinese: string;
  createdAt: Date;
  updatedAt: Date;
}

const SentenceSchema = new mongoose.Schema<ISentence>(
  {
    english: {
      type: String,
      required: [true, 'Please provide the English sentence'],
      trim: true,
    },
    chinese: {
      type: String,
      required: [true, 'Please provide the Chinese translation'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Sentence || mongoose.model<ISentence>('Sentence', SentenceSchema); 