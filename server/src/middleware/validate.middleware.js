import AppError from '../utils/AppError.js';

/**
 * Validation Middleware Factory
 * -------------------------------------------------------------
 * Validates request payload against a Joi schema.
 * Formats validation issues into structured errors array.
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));

      return next(new AppError('Invalid input data provided.', 400, formattedErrors));
    }

    req[property] = value;
    next();
  };
};
