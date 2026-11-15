import RSVP from '../models/RSVP.js';
import Event from '../models/Event.js';
import AppError from '../utils/AppError.js';

/**
 * @desc    RSVP for an event
 * @route   POST /api/v1/rsvps
 * @access  Protected
 */
export const createRSVP = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return next(new AppError('Target event does not exist.', 404));
    }

    if (event.status === 'completed' || event.status === 'cancelled') {
      return next(new AppError(`Cannot RSVP to an event that has already ${event.status}.`, 400));
    }

    // Capacity check if maxCapacity is defined
    if (event.maxCapacity && event.rsvpCount >= event.maxCapacity) {
      return next(new AppError('This event has reached full capacity.', 400));
    }

    // Check if already RSVP'd
    const existing = await RSVP.findOne({ user: req.user._id, event: eventId });
    if (existing) {
      if (existing.status === 'confirmed') {
        return next(new AppError('You have already reserved a seat for this event.', 400));
      }
      existing.status = 'confirmed';
      await existing.save();
      event.rsvpCount += 1;
      await event.save();

      return res.status(200).json({
        success: true,
        message: 'RSVP re-confirmed.',
        data: { rsvp: existing },
      });
    }

    const rsvp = await RSVP.create({
      user: req.user._id,
      event: eventId,
      status: 'confirmed',
    });

    event.rsvpCount += 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Your seat has been reserved.',
      data: { rsvp },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Cancel an existing RSVP
 * @route   DELETE /api/v1/rsvps/:id
 * @access  Protected
 */
export const cancelRSVP = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rsvp = await RSVP.findOne({ _id: id, user: req.user._id });
    if (!rsvp) {
      return next(new AppError('RSVP record not found or does not belong to you.', 404));
    }

    if (rsvp.status === 'confirmed') {
      rsvp.status = 'cancelled';
      await rsvp.save();

      // Decrement event RSVP counter
      await Event.findByIdAndUpdate(rsvp.event, { $inc: { rsvpCount: -1 } });
    }

    res.status(200).json({
      success: true,
      message: 'RSVP cancelled successfully.',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get user's personal RSVP reservations
 * @route   GET /api/v1/rsvps/my
 * @access  Protected
 */
export const getMyRSVPs = async (req, res, next) => {
  try {
    const rsvps = await RSVP.find({ user: req.user._id, status: 'confirmed' })
      .populate({
        path: 'event',
        select: 'title slug date time location coverImage status',
        populate: { path: 'society', select: 'name shortName slug' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { rsvps },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get attendee list for an event
 * @route   GET /api/v1/rsvps/event/:eventSlug
 * @access  Public
 */
export const getEventRSVPs = async (req, res, next) => {
  try {
    const { eventSlug } = req.params;

    const event = await Event.findOne({ slug: eventSlug });
    if (!event) {
      return next(new AppError('Event not found.', 404));
    }

    const rsvps = await RSVP.find({ event: event._id, status: 'confirmed' })
      .populate('user', 'fullName rollNo department avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        eventTitle: event.title,
        rsvpCount: rsvps.length,
        attendees: rsvps.map((r) => r.user),
      },
    });
  } catch (err) {
    next(err);
  }
};
