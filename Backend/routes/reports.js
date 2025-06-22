const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { createReport, getAllReports, updateReport, getUserReports } = require('../controllers/reportController');

const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  auth,
  authorizeRoles('animal_lover', 'volunteer'),
  upload.single('photo'),
  createReport
);

router.get(
  '/',
  auth,
  authorizeRoles('ngo'),
  getAllReports
);

router.put(
  '/:id',
  auth,
  authorizeRoles('ngo'),
  upload.single('rescueProof'),
  updateReport
);

router.get(
  '/my',
  auth,
  authorizeRoles('animal_lover', 'volunteer'),
  getUserReports
);

module.exports = router;
