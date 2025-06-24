const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const { uploadImage, validateExif } = require('../utils/imageUtils');
const auth = require('../middleware/auth');

// Submit a report (public)
router.post('/', uploadImage.single('photo'), async (req, res) => {
  // Validate EXIF timestamp & location
  const valid = await validateExif(req.file, req.body.lat, req.body.lng);
  if (!valid) return res.status(400).json({ error: "Invalid photo. Must use live camera with correct GPS/time." });

  // Upload to Cloudinary, get url
  const imageUrl = req.file.cloudinaryUrl;
  const { animalType, notes, lat, lng } = req.body;
  const report = await Report.create({ animalType, notes, imageUrl, lat, lng });
  res.json({ reportId: report._id });
});

// Get all reports (NGO/volunteer only)
router.get('/', auth, async (req, res) => {
  // Add filtering, search, etc.
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.animalType) query.animalType = req.query.animalType;
  // TODO: Add text search, date filter, etc.
  const reports = await Report.find(query);
  res.json(reports);
});

// Update status (NGO only)
router.put('/:id/status', auth, async (req, res) => {
  const { status, rescueNote } = req.body;
  const report = await Report.findByIdAndUpdate(req.params.id, { status, rescueNote }, { new: true });
  res.json(report);
});

module.exports = router;