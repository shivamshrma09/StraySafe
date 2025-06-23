const Report = require('../models/Report');
const cloudinary = require('../utils/cloudinary');

exports.createReport = async (req, res) => {
  try {
    const { animalType, situation, description, name, contact, visibility, lat, lng, timestamp } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });
    if (!animalType || !situation || !lat || !lng || !timestamp) return res.status(400).json({ message: 'Required fields missing' });

    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'straysafe/reports' });

    const report = await Report.create({
      photoUrl: result.secure_url,
      animalType,
      situation,
      description,
      name,
      contact,
      visibility,
      location: { lat, lng, timestamp },
      reportedBy: req.user._id
    });

    res.status(201).json({ message: 'Report created', report });
  } catch (err) {
    res.status(500).json({ message: 'Report creation failed', error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reportedBy', 'firstName lastName email')
      .populate('rescuedBy', 'firstName lastName email');
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let rescueProofUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'straysafe/rescue_proofs' });
      rescueProofUrl = result.secure_url;
    }
    const update = { status, rescuedBy: req.user._id };
    if (rescueProofUrl) update.rescueProof = rescueProofUrl;
    const report = await Report.findByIdAndUpdate(id, update, { new: true });
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json({ message: 'Report updated', report });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user._id });
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user reports', error: err.message });
  }
};