const Report = require('../models/Report');
const cloudinary = require('../utils/cloudinary');

/**
 * Create a new stray animal report.
 * - Requires live photo, animal type, situation, location, timestamp.
 * - Uploads image to Cloudinary.
 * - Saves all metadata and reporter info.
 */
exports.createReport = async (req, res) => {
  try {
    const {
      animalType,
      situation,
      description,
      name,
      contact,
      visibility,
      lat,
      lng,
      timestamp
    } = req.body;

    // Validate required fields
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!animalType || !situation || !lat || !lng || !timestamp) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'straysafe/reports'
    });

    // Create report in DB
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

/**
 * Get all reports (for admin/NGO dashboard).
 * Populates reporter and rescuer information.
 */
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

/**
 * Update a report's status or upload rescue proof (Admin/NGO only).
 * Allows updating status, rescue proof image, rescuer info.
 */
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let rescueProofUrl;

    // Optional: upload rescue proof image if present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'straysafe/rescue_proofs'
      });
      rescueProofUrl = result.secure_url;
    }

    // Build update object
    const update = { status, rescuedBy: req.user._id };
    if (rescueProofUrl) update.rescueProof = rescueProofUrl;

    const report = await Report.findByIdAndUpdate(id, update, { new: true });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report updated', report });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

/**
 * Get all reports submitted by the current user.
 */
exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user._id });
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user reports', error: err.message });
  }
};