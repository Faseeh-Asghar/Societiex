import mongoose from 'mongoose';

const societySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Society name is required'],
      unique: true,
      trim: true,
      maxlength: [120, 'Society name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortName: {
      type: String,
      required: [true, 'Short name / acronym is required'],
      trim: true,
      maxlength: [20, 'Short name cannot exceed 20 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['tech', 'sports', 'media', 'literary', 'arts', 'community', 'professional', 'finance', 'design'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    founded: {
      type: Number,
      default: null,
    },
    memberCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    logo: {
      type: String,
      default: null,
    },
    gallery: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: '#f59e0b',
    },
    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual relationship to Event model
societySchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'society',
});

const Society = mongoose.model('Society', societySchema);
export default Society;
