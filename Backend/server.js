const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // optional
app.use('/api/reports', require('./routes/reports')); // Main reporting route

// Connect MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('✅ MongoDB connected!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log('🚀 Server running on port', PORT);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
