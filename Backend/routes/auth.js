const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your user model

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username or email
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Wrong username" });

    // Compare password (hash compare in real apps)
    if (user.password !== password) {
      return res.status(401).json({ error: "Wrong password" });
    }
    // Remove password from response
    const { password: pwd, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
