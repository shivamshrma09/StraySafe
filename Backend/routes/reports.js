const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const {
  createReport,
  getAllReports,
  updateReport,
  getUserReports
} = require('../controllers/reportController');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to create a new report (animal lover & volunteer)
router.post(
  '/',
  auth,
  authorizeRoles('animal_lover', 'volunteer'),
  upload.single('photo'),
  createReport
);

// Route to get all reports (NGO only)
router.get(
  '/',
  auth,
  authorizeRoles('ngo'),
  getAllReports
);

// Route to update a report (status/rescue proof) (NGO only)
router.put(
  '/:id',
  auth,
  authorizeRoles('ngo'),
  upload.single('rescueProof'),
  updateReport
);

// Route to get current user's reports (animal lover & volunteer)
router.get(
  '/my',
  auth,
  authorizeRoles('animal_lover', 'volunteer'),
  getUserReports
);

module.exports = router;