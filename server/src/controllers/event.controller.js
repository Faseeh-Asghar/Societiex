import Event from '../models/Event.js';
import Society from '../models/Society.js';
import AppError from '../utils/AppError.js';

/**
 * @desc    Get all events (filterable by status, society, date, paginated)
 * @route   GET /api/v1/events
 * @access  Public
 */
export const getEvents = async (req, res, next) => {
  try {
    const { status, societySlug, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (societySlug) {
      const society = await Society.findOne({ slug: societySlug });
      if (society) {
        query.society = society._id;
      }
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Event.countDocuments(query);

    const events = await Event.find(query)
      .populate('society', 'name shortName slug color coverImage')
      .sort({ date: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: { events },
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)) || 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single event by slug
 * @route   GET /api/v1/events/:slug
 * @access  Public
 */
export const getEventBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug })
      .populate('society', 'name shortName slug description category color coverImage')
      .populate('createdBy', 'fullName email rollNo');

    if (!event) {
      return next(new AppError(`Event with slug '${slug}' not found.`, 404));
    }

    res.status(200).json({
      success: true,
      data: { event },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a new event
 * @route   POST /api/v1/events
 * @access  President of society OR Admin
 */
export const createEvent = async (req, res, next) => {
  try {
    const { title, slug, societyId, description, date, time, location, coverImage, maxCapacity } = req.body;

    // Check if society exists (if provided)
    if (societyId) {
      const society = await Society.findById(societyId);
      if (!society) {
        return next(new AppError('Associated society not found.', 404));
      }

      // Check if user is president of this society or admin
      const isPresident = society.president && society.president.equals(req.user._id);
      const isAdmin = req.user.role === 'admin';

      if (!isPresident && !isAdmin) {
        return next(new AppError('You can only create events for societies you preside over.', 403));
      }
    }

    const existingSlug = await Event.findOne({ slug });
    if (existingSlug) {
      return next(new AppError('An event with this slug already exists.', 400));
    }

    const event = await Event.create({
      title,
      slug,
      society: societyId || null,
      description,
      date: new Date(date),
      time,
      location,
      coverImage,
      maxCapacity: maxCapacity || null,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Event published successfully.',
      data: { event },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update event details
 * @route   PATCH /api/v1/events/:slug
 * @access  President (own society) OR Admin
 */
export const updateEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug });

    if (!event) {
      return next(new AppError('Event not found.', 404));
    }

    // Verify permission
    let canEdit = req.user.role === 'admin';
    if (!canEdit && event.society) {
      const society = await Society.findById(event.society);
      canEdit = society?.president && society.president.equals(req.user._id);
    }

    if (!canEdit) {
      return next(new AppError('You do not have permission to update this event.', 403));
    }

    const { title, description, date, time, location, coverImage, status, maxCapacity } = req.body;

    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = new Date(date);
    if (time !== undefined) event.time = time;
    if (location !== undefined) event.location = location;
    if (coverImage !== undefined) event.coverImage = coverImage;
    if (status !== undefined) event.status = status;
    if (maxCapacity !== undefined) event.maxCapacity = maxCapacity;

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Event updated successfully.',
      data: { event },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete event
 * @route   DELETE /api/v1/events/:slug
 * @access  President (own society) OR Admin
 */
export const deleteEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug });

    if (!event) {
      return next(new AppError('Event not found.', 404));
    }

    let canDelete = req.user.role === 'admin';
    if (!canDelete && event.society) {
      const society = await Society.findById(event.society);
      canDelete = society?.president && society.president.equals(req.user._id);
    }

    if (!canDelete) {
      return next(new AppError('You do not have authorization to delete this event.', 403));
    }

    await Event.deleteOne({ _id: event._id });

    res.status(200).json({
      success: true,
      message: 'Event deleted.',
    });
  } catch (err) {
    next(err);
  }
};
