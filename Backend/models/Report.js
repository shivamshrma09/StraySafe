const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  photoUrl:    { type: String, required: true },
  animalType:  { type: String, required: true },
  situation:   { type: String, required: true },
  description: { type: String },
  name:        { type: String },
  contact:     { type: String },
  visibility:  { type: String, enum: ['private', 'ngo', 'anonymous'], default: 'private' },
  location: {
    lat:       { type: Number, required: true },
    lng:       { type: Number, required: true },
    timestamp: { type: String, required: true }
  },
  status:      { type: String, enum: ['pending', 'verified', 'resolved'], default: 'pending' },
  reportedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rescuedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rescueProof: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);