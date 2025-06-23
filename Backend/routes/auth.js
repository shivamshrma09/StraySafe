const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

// Signup route
router.post('/signup', authController.signup);

// Login route (optional, for completeness)
router.post('/login', authController.login);

module.exports = router;