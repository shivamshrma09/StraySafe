const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Handles user signup: validates input, checks for duplicates, creates user, returns token
 */
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gender, password, role } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: 'All required fields missing' });
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({ firstName, lastName, email, phone, gender, password, role });

    // Generate JWT token
    const token = generateToken(user);

    // Respond with token and user info
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
        role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

/**
 * Handles user login: validates input, checks credentials, returns token
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password (ensure User model has comparePassword method)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Respond with token and user info
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};