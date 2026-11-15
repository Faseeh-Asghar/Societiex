import Society from '../models/Society.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

/**
 * @desc    Get all active societies (filterable, searchable, paginated)
 * @route   GET /api/v1/societies
 * @access  Public
 */
export const getSocieties = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;

    const query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { shortName: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Society.countDocuments(query);

    const societies = await Society.find(query)
      .populate('president', 'fullName email rollNo')
      .sort({ name: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: { societies },
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
 * @desc    Get single society by slug
 * @route   GET /api/v1/societies/:slug
 * @access  Public
 */
export const getSocietyBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const society = await Society.findOne({ slug, isActive: true })
      .populate('president', 'fullName email rollNo')
      .populate({
        path: 'events',
        match: { status: { $ne: 'cancelled' } },
        options: { sort: { date: 1 } },
      });

    if (!society) {
      return next(new AppError(`Society with slug '${slug}' was not found.`, 404));
    }

    res.status(200).json({
      success: true,
      data: { society },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create/Charter a new society
 * @route   POST /api/v1/societies
 * @access  Admin only
 */
export const createSociety = async (req, res, next) => {
  try {
    const { name, slug, shortName, category, description, coverImage, founded, color } = req.body;

    const existing = await Society.findOne({ $or: [{ slug }, { name }] });
    if (existing) {
      return next(new AppError('A society with this name or slug already exists.', 400));
    }

    const society = await Society.create({
      name,
      slug,
      shortName,
      category,
      description,
      coverImage,
      founded,
      color,
    });

    res.status(201).json({
      success: true,
      message: 'Society chartered successfully.',
      data: { society },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update society profile (description, cover, gallery, logo)
 * @route   PATCH /api/v1/societies/:slug
 * @access  Admin OR President of this specific society
 */
export const updateSociety = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const society = await Society.findOne({ slug });

    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    // Authorization: Admin or President of THIS society
    const isPresident = society.president && society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('You do not have authorization to edit this society.', 403));
    }

    const { description, coverImage, logo, gallery, color } = req.body;

    if (description !== undefined) society.description = description;
    if (coverImage !== undefined) society.coverImage = coverImage;
    if (logo !== undefined) society.logo = logo;
    if (gallery !== undefined) society.gallery = gallery;
    if (color !== undefined) society.color = color;

    await society.save();

    res.status(200).json({
      success: true,
      message: 'Society profile updated successfully.',
      data: { society },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Assign president to a society
 * @route   PATCH /api/v1/societies/:slug/president
 * @access  Admin only
 */
export const assignPresident = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { userId } = req.body;

    const society = await Society.findOne({ slug });
    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return next(new AppError('Specified user does not exist.', 404));
    }

    // Promote user role to president if still student
    if (targetUser.role === 'student') {
      targetUser.role = 'president';
      await targetUser.save();
    }

    society.president = targetUser._id;
    if (!society.members.includes(targetUser._id)) {
      society.members.push(targetUser._id);
      society.memberCount += 1;
    }
    await society.save();

    res.status(200).json({
      success: true,
      message: `${targetUser.fullName} assigned as President of ${society.name}.`,
      data: { society },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Deactivate society (Soft delete)
 * @route   DELETE /api/v1/societies/:slug
 * @access  Admin only
 */
export const deactivateSociety = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const society = await Society.findOneAndUpdate(
      { slug },
      { isActive: false },
      { new: true }
    );

    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Society deactivated.',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get society members roster
 * @route   GET /api/v1/societies/:slug/members
 * @access  President of this society OR Admin
 */
export const getSocietyMembers = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const society = await Society.findOne({ slug }).populate('members', 'fullName email rollNo department semester');

    if (!society) {
      return next(new AppError('Society not found.', 404));
    }

    const isPresident = society.president && society.president.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isPresident && !isAdmin) {
      return next(new AppError('You do not have permission to view members of this society.', 403));
    }

    res.status(200).json({
      success: true,
      data: {
        societyName: society.name,
        memberCount: society.members.length,
        members: society.members,
      },
    });
  } catch (err) {
    next(err);
  }
};
