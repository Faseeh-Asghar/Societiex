import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

/**
 * @desc    Register a new student account
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { fullName, rollNo, email, password, department, semester } = req.body;

    // Check for existing rollNo or email
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { rollNo: rollNo.toUpperCase() }],
    });

    if (existingUser) {
      const conflictField = existingUser.email === email.toLowerCase() ? 'Email' : 'Roll number';
      return next(new AppError(`${conflictField} is already registered.`, 400));
    }

    // Create user
    const user = await User.create({
      fullName,
      rollNo: rollNo.toUpperCase(),
      email: email.toLowerCase(),
      password,
      department,
      semester,
    });

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Login with email or roll number + password
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // Search by email or rollNo (explicitly include password field)
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { rollNo: identifier.toUpperCase() }],
    }).select('+password');

    if (!user) {
      return next(new AppError('Invalid email/roll number or password.', 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid email/roll number or password.', 401));
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/v1/auth/refresh
 * @access  Public
 */
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError('Refresh token is required.', 400));
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'societix_default_jwt_refresh_secret_key_32_chars'
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User not found.', 401));
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (err) {
    return next(new AppError('Invalid or expired refresh token.', 401));
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/me
 * @access  Protected
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('societies', 'name shortName slug coverImage');
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update current user profile
 * @route   PATCH /api/v1/auth/me
 * @access  Protected
 */
export const updateMe = async (req, res, next) => {
  try {
    const { fullName, department, semester, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, department, semester, avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: { user: updatedUser },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Change password
 * @route   PATCH /api/v1/auth/me/password
 * @access  Protected
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return next(new AppError('Current password does not match.', 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Logout (client invalidation acknowledgement)
 * @route   POST /api/v1/auth/logout
 * @access  Protected
 */
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Signed out successfully.',
  });
};
