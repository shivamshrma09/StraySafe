const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // JWT token check

// GET /api/user/me — Logged-in NGO info
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'NGO not found' });

    // Dummy total rescue count logic (you can make this real)
    const totalRescues = await require('../models/Report').countDocuments({ status: 'Resolved' });

    res.json({
      ngoName: `${user.firstName} ${user.lastName}`,
      registrationNumber: 'NGO-' + user._id.toString().slice(-6).toUpperCase(),
      email: user.email,
      totalRescues
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
