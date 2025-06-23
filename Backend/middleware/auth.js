const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware for protected routes.
 * Checks for Bearer token, verifies JWT, and attaches user to req.
 */
exports.auth = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and exclude password from result
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Proceed to next middleware/route
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};