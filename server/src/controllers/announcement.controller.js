import Announcement from '../models/Announcement.js';
import Society from '../models/Society.js';
import AppError from '../utils/AppError.js';

/**
 * @desc    Get all announcements for a society
 * @route   GET /api/v1/announcements/society/:societySlug
 * @access  Public
 */
export const getSocietyAnnouncements = async (req, res, next) => {
  try {
    const { societySlug } = req.params;

    const society = await Society.findOne({ slug: societySlug, isActive: true });
    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    const announcements = await Announcement.find({ society: society._id })
      .populate('author', 'fullName email avatar')
      .sort({ pinned: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { announcements },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Post a new announcement
 * @route   POST /api/v1/announcements
 * @access  President of society OR Admin
 */
export const createAnnouncement = async (req, res, next) => {
  try {
    const { societyId, title, body, pinned = false } = req.body;

    const society = await Society.findById(societyId);
    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    const isPresident = society.president && society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('You do not have permission to post announcements for this society.', 403));
    }

    const announcement = await Announcement.create({
      society: societyId,
      title,
      body,
      pinned,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Announcement posted.',
      data: { announcement },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update an announcement
 * @route   PATCH /api/v1/announcements/:id
 * @access  President of society OR Admin
 */
export const updateAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body, pinned } = req.body;

    const announcement = await Announcement.findById(id).populate('society');
    if (!announcement) {
      return next(new AppError('Announcement not found.', 404));
    }

    const isPresident = announcement.society?.president && announcement.society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('You do not have permission to edit this announcement.', 403));
    }

    if (title !== undefined) announcement.title = title;
    if (body !== undefined) announcement.body = body;
    if (pinned !== undefined) announcement.pinned = pinned;

    await announcement.save();

    res.status(200).json({
      success: true,
      message: 'Announcement updated.',
      data: { announcement },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete an announcement
 * @route   DELETE /api/v1/announcements/:id
 * @access  President of society OR Admin
 */
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id).populate('society');
    if (!announcement) {
      return next(new AppError('Announcement not found.', 404));
    }

    const isPresident = announcement.society?.president && announcement.society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('You do not have permission to delete this announcement.', 403));
    }

    await Announcement.deleteOne({ _id: announcement._id });

    res.status(200).json({
      success: true,
      message: 'Announcement deleted.',
    });
  } catch (err) {
    next(err);
  }
};
