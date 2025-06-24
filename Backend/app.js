const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount your auth routes
app.use('/api/auth', require('./routes/auth'));

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI, { })
    .then(() => {
        console.log('MongoDB connected!');
        // FIX: File name plural
        const reportRoutes = require('./routes/reports');
        app.use('/api/reports', reportRoutes);

        // Optionally, add your other routes here

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log('Server running on port', PORT);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });