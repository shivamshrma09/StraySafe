const express = require('express');
const reportRoutes = require('./routes/reports');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('API is working!');
});

module.exports = app;
