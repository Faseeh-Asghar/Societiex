import AppError from '../utils/AppError.js';

/**
 * Role-Based Access Control Middleware Factory
 * -------------------------------------------------------------
 * Enforces role restriction on routes.
 * Example: requireRole('admin') or requireRole('president', 'admin')
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Permission denied. This action requires one of the following roles: [${allowedRoles.join(', ')}].`,
          403
        )
      );
    }

    next();
  };
};
