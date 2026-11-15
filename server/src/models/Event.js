import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    society: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Society',
      default: null, // null denotes campus-wide event
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
      index: true,
    },
    time: {
      type: String,
      required: [true, 'Event time is required (e.g. 09:00 AM)'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event venue / location is required'],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image URL is required'],
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
    rsvpCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxCapacity: {
      type: Number,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ date: -1, status: 1 });

const Event = mongoose.model('Event', eventSchema);
export default Event;
