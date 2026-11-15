import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate RSVPs from the same user for the same event
rsvpSchema.index({ user: 1, event: 1 }, { unique: true });

const RSVP = mongoose.model('RSVP', rsvpSchema);
export default RSVP;
