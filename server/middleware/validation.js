const { check, validationResult } = require('express-validator'); // Import express-validator functions
const httpStatus = require('http-status'); // Import HTTP status code constants for readability

// Define an array of middleware to validate an article before creation
const addArticleValidator = [
  // Validation chain for 'title' field
  check('title')
    .trim() // Remove whitespace from both ends of the title
    .not().isEmpty().withMessage('Title is required').bail() // Title must not be empty; stop here if it is
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long').bail() // Must have ≥5 chars
    .isLength({ max: 100 }).withMessage('Title must be at most 100 characters long').bail(), // Must have ≤100 chars

  // Validation chain for 'director' field
  check('director')
    .trim() // Remove surrounding whitespace from the director name
    .not().isEmpty().withMessage('Director is required').bail() // Must not be empty
    .not().isBoolean().withMessage('Director must be a string and cannot be boolean').bail() // Forbid boolean-like input
    .isLength({ min: 3, max: 100 }).withMessage('Director must be between 3 and 100 characters').bail(), // Length 3–100

  // Final middleware: check the validation result
  (req, res, next) => {
    const errors = validationResult(req); // Gather errors from previous validators
    if (!errors.isEmpty()) { // If any validation errors were found...
      // Return a 400 Bad Request with error details, and do NOT call next()
      return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }
    next(); // No errors: proceed to the next middleware or route handler
  }
];

module.exports = { addArticleValidator }; // Export the validator for use in routes
