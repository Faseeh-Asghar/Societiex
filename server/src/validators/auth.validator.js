import Joi from 'joi';

export const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Full name cannot be empty',
    'any.required': 'Full name is required',
  }),
  rollNo: Joi.string().trim().uppercase().required().messages({
    'string.empty': 'Roll number cannot be empty',
    'any.required': 'Roll number is required',
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(128).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  department: Joi.string().valid('BSCS', 'BSSE', 'BSAI', 'BSDS', 'BBA').required(),
  semester: Joi.string().valid('1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th').required(),
});

export const loginSchema = Joi.object({
  identifier: Joi.string().trim().required().messages({
    'string.empty': 'Email or roll number is required',
    'any.required': 'Email or roll number is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
});

export const updateProfileSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100),
  department: Joi.string().valid('BSCS', 'BSSE', 'BSAI', 'BSDS', 'BBA'),
  semester: Joi.string().valid('1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'),
  avatar: Joi.string().allow(null, ''),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
  }),
  newPassword: Joi.string().min(6).max(128).required().messages({
    'string.min': 'New password must be at least 6 characters long',
    'any.required': 'New password is required',
  }),
});
