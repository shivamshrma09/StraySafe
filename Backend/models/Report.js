const mongoose = require('mongoose');
const { uploadImage, validateExif } = require('../utils/imageUtils');

const reportSchema = new mongoose.Schema({
  animalType: { type: String, required: true },
  notes: String,
  imageUrl: { type: String, required: true },
  lat: Number,
  lng: Number,
  status: { 
    type: String, 
    enum: ['Pending', 'Verified', 'Resolved'], 
    default: 'Pending' 
  },
  submittedAt: { type: Date, default: Date.now },
  rescueNote: String,
  reporterId: String // Add reporter tracking
});

module.exports = mongoose.model('Report', reportSchema);
