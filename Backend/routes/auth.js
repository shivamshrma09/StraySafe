const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sahi tarike se controller methods ko pass karein
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;