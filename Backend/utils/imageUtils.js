// utils/imageUtils.js
const multer = require('multer');
const path = require('path');

// Storage config (local uploads folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadImage = multer({ storage });

// Dummy EXIF validator (replace with real logic as needed)
const validateExif = async () => true;

module.exports = { uploadImage, validateExif };
