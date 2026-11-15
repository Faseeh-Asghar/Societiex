import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

/**
 * Authentication Middleware
 * -------------------------------------------------------------
 * Protects endpoints by verifying the incoming Bearer JWT
 * and populating req.user with the active database record.
 */
export const protect = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Authentication required. Please sign in to access this resource.', 401));
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'societix_default_jwt_secret_key_32_chars'
    );

    // Retrieve active user
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('The user associated with this token no longer exists.', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
