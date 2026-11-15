import User from '../models/User.js';
import AppError from '../utils/AppError.js';

/**
 * @desc    Get all users (paginated, searchable)
 * @route   GET /api/v1/users
 * @access  Admin only
 */
export const getUsers = async (req, res, next) => {
  try {
    const { role, department, search, page = 1, limit = 20 } = req.query;

    const query = {};
    if (role) query.role = role;
    if (department) query.department = department;

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { fullName: { $regex: q, $options: 'i' } },
        { rollNo: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: { users },
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
 * @desc    Get single user details
 * @route   GET /api/v1/users/:id
 * @access  Admin only
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('societies', 'name shortName slug');
    if (!user) {
      return next(new AppError('User not found.', 404));
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update user platform role
 * @route   PATCH /api/v1/users/:id/role
 * @access  Admin only
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['student', 'president', 'admin'].includes(role)) {
      return next(new AppError('Invalid role specified. Must be student, president, or admin.', 400));
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new AppError('User not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: `User role updated to '${role}'.`,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete/Remove user account
 * @route   DELETE /api/v1/users/:id
 * @access  Admin only
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError('User not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'User removed from platform.',
    });
  } catch (err) {
    next(err);
  }
};
