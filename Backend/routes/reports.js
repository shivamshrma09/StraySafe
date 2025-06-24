// routes/reports.js
const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const { uploadImage, validateExif } = require('../utils/imageUtils');

// Submit report with EXIF validation
router.post('/', uploadImage.single('photo'), async (req, res) => {
  try {
    const { animalType, notes, lat, lng } = req.body;
    if (!animalType || !lat || !lng || !req.file) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    // Optionally validate EXIF here
    if (!await validateExif(req.file, lat, lng)) {
      return res.status(400).json({ error: "Invalid photo. Must use live camera with correct GPS/time." });
    }
    const imageUrl = req.file.path; // Or Cloudinary URL if using Cloudinary
    const newReport = new Report({
      animalType,
      notes,
      imageUrl,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      status: 'Pending'
    });
    await newReport.save();
    res.json({ success: true, reportId: newReport._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get filtered reports
router.get('/', async (req, res) => {
  try {
    const { status, animalType, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (animalType) filter.animalType = animalType;
    if (search) {
      filter.$or = [
        { notes: new RegExp(search, 'i') },
        { rescueNote: new RegExp(search, 'i') }
      ];
    }
    const reports = await Report.find(filter).sort({ submittedAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get report by ID (for tracking)
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update status and rescue note
router.put('/:id/status', async (req, res) => {
  try {
    const { status, rescueNote } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, rescueNote },
      { new: true }
    );
    if (!report) return res.status(404).json({ error: "Not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
