// EXIF parsing ke liye npm install exif-js karen
import EXIF from 'exif-js';

const VOLdashboard = (e) => {
  const file = e.target.files && e.target.files[0];
  if (file) {
    // Camera-only enforce
    if (e.target.capture !== "environment") {
      alert("Please use your camera to take a live photo.");
      return;
    }
    // EXIF Validation
    EXIF.getData(file, function () {
      const exifTime = EXIF.getTag(this, "DateTimeOriginal");
      const exifLat = EXIF.getTag(this, "GPSLatitude");
      const exifLng = EXIF.getTag(this, "GPSLongitude");

      // Time check (within 2 min)
      if (exifTime) {
        const photoTime = new Date(exifTime.replace(/:/g, '-'));
        const now = new Date();
        if (Math.abs(now - photoTime) > 2 * 60 * 1000) {
          alert("Photo is not recent. Please take a live photo.");
          return;
        }
      }
      // GPS check
      if (!exifLat || !exifLng) {
        alert("Photo must have GPS location (enable location for camera).");
        return;
      }
      // If all checks pass, set image
      const reader = new FileReader();
      reader.onloadend = () => setImgData(reader.result);
      reader.readAsDataURL(file);
    });
  }
};

// In your input:
<input
  type="file"
  accept="image/*"
  capture="environment"
  required
  onChange={handlePhoto}
  style={styles.input}
/>

export default VOLdashboard;