const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  photoUrl:    { type: String, required: true }, // Cloudinary/Firebase image link
  animalType:  { type: String, required: true }, // Cow, Dog, Monkey, Other etc.
  situation:   { type: String, required: true }, // e.g., injured, causing traffic, etc.
  description: { type: String },                 // Optional notes
  name:        { type: String },                 // Reporter name (optional)
  contact:     { type: String },                 // Reporter contact (optional)
  visibility:  { type: String, enum: ['private', 'ngo', 'anonymous'], default: 'private' }, // Who can see
  location: {
    lat:       { type: Number, required: true },
    lng:       { type: Number, required: true },
    timestamp: { type: String, required: true } // ISO string or similar
  },
  status:      { type: String, enum: ['pending', 'verified', 'resolved'], default: 'pending' }, // Report state
  reportedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reporter (must exist)
  rescuedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // NGO/volunteer who resolved
  rescueProof: { type: String } // Proof image URL (e.g., after rescue)
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);