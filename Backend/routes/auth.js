const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');

// Correct routes: email से login और signup
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;