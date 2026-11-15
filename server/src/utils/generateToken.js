import jwt from 'jsonwebtoken';

/**
 * Generate Access Token (short-lived, e.g. 15 minutes)
 */
export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'societix_default_jwt_secret_key_32_chars',
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
  );
};

/**
 * Generate Refresh Token (longer-lived, e.g. 7 days)
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'societix_default_jwt_refresh_secret_key_32_chars',
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
  );
};
