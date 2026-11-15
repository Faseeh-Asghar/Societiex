import JoinRequest from '../models/JoinRequest.js';
import Society from '../models/Society.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

/**
 * @desc    Submit application to join a society
 * @route   POST /api/v1/join-requests
 * @access  Protected (Students)
 */
export const submitJoinRequest = async (req, res, next) => {
  try {
    const { societyId, interest } = req.body;

    const society = await Society.findById(societyId);
    if (!society || !society.isActive) {
      return next(new AppError('Target society does not exist or is inactive.', 404));
    }

    // Check if user is already a member
    if (society.members.includes(req.user._id)) {
      return next(new AppError('You are already an active member of this society.', 400));
    }

    // Check for existing pending request
    const existing = await JoinRequest.findOne({
      user: req.user._id,
      society: societyId,
      status: 'pending',
    });

    if (existing) {
      return next(new AppError('You already have a pending application for this society.', 400));
    }

    const request = await JoinRequest.create({
      user: req.user._id,
      society: societyId,
      interest,
    });

    res.status(201).json({
      success: true,
      message: `Your application to join ${society.name} has been received.`,
      data: { request },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get current user's join requests
 * @route   GET /api/v1/join-requests/my
 * @access  Protected
 */
export const getMyJoinRequests = async (req, res, next) => {
  try {
    const requests = await JoinRequest.find({ user: req.user._id })
      .populate('society', 'name shortName slug category coverImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { requests },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all join requests for a society
 * @route   GET /api/v1/join-requests/society/:societySlug
 * @access  President of this society OR Admin
 */
export const getSocietyJoinRequests = async (req, res, next) => {
  try {
    const { societySlug } = req.params;
    const { status } = req.query;

    const society = await Society.findOne({ slug: societySlug });
    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    const isPresident = society.president && society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('You do not have authorization to view applications for this society.', 403));
    }

    const query = { society: society._id };
    if (status && status !== 'all') {
      query.status = status;
    }

    const requests = await JoinRequest.find(query)
      .populate('user', 'fullName rollNo email department semester avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        societyName: society.name,
        requests,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Approve join request
 * @route   PATCH /api/v1/join-requests/:id/approve
 * @access  President of society OR Admin
 */
export const approveJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await JoinRequest.findById(id).populate('society');
    if (!request) {
      return next(new AppError('Application request not found.', 404));
    }

    if (request.status !== 'pending') {
      return next(new AppError(`Request has already been ${request.status}.`, 400));
    }

    const society = request.society;
    const isPresident = society.president && society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('Unauthorized to review this application.', 403));
    }

    request.status = 'approved';
    request.reviewedBy = req.user._id;
    await request.save();

    // Add user to society members list
    if (!society.members.includes(request.user)) {
      society.members.push(request.user);
      society.memberCount += 1;
      await society.save();
    }

    // Add society to user's societies list
    await User.findByIdAndUpdate(request.user, {
      $addToSet: { societies: society._id },
    });

    res.status(200).json({
      success: true,
      message: 'Application approved. Student added to society members.',
      data: { request },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Reject join request
 * @route   PATCH /api/v1/join-requests/:id/reject
 * @access  President of society OR Admin
 */
export const rejectJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reviewNote } = req.body;

    const request = await JoinRequest.findById(id).populate('society');
    if (!request) {
      return next(new AppError('Application request not found.', 404));
    }

    if (request.status !== 'pending') {
      return next(new AppError(`Request has already been ${request.status}.`, 400));
    }

    const society = request.society;
    const isPresident = society.president && society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('Unauthorized to review this application.', 403));
    }

    request.status = 'rejected';
    request.reviewedBy = req.user._id;
    request.reviewNote = reviewNote || null;
    await request.save();

    res.status(200).json({
      success: true,
      message: 'Application marked as rejected.',
      data: { request },
    });
  } catch (err) {
    next(err);
  }
};
