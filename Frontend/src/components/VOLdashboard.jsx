import React, { useState } from "react";
import EXIF from "exif-js";
import "./VOLdashboard.css";

export default function VOLdashboard() {
  const [animalType, setAnimalType] = useState("");
  const [situation, setSituation] = useState("");
  const [description, setDescription] = useState("");
  const [imgData, setImgData] = useState("");
  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [locError, setLocError] = useState("");
  const [descCount, setDescCount] = useState(0);
  const [submitMsg, setSubmitMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Photo input & EXIF validation
  const handlePhoto = (e) => {
    setPhotoError("");
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Camera-only enforce
    if (e.target.capture !== "environment") {
      setPhotoError("Please use your camera to take a live photo.");
      return;
    }

    EXIF.getData(file, function () {
      const exifTime = EXIF.getTag(this, "DateTimeOriginal");
      const exifLat = EXIF.getTag(this, "GPSLatitude");
      const exifLng = EXIF.getTag(this, "GPSLongitude");

      // Time check (within 2 min)
      if (exifTime) {
        // EXIF time is like "2025:06:23 19:15:00"
        const [date, time] = exifTime.split(" ");
        const photoTime = new Date(
          date.replace(/:/g, "-") + "T" + time
        );
        const now = new Date();
        if (Math.abs(now - photoTime) > 2 * 60 * 1000) {
          setPhotoError("Photo is not recent. Please take a live photo.");
          return;
        }
      }
      // GPS check
      if (!exifLat || !exifLng) {
        setPhotoError(
          "Photo must have GPS location (enable location for camera)."
        );
        return;
      }
      // If all checks pass, set image
      const reader = new FileReader();
      reader.onloadend = () => setImgData(reader.result);
      reader.readAsDataURL(file);
    });
  };

  // Location
  const handleLocation = () => {
    setLocLoading(true);
    setLocError("");
    setLocation(null);
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: new Date(pos.timestamp).toISOString(),
        });
        setLocLoading(false);
      },
      (err) => {
        setLocError("Could not get your location. Enable GPS and try again.");
        setLocLoading(false);
      }
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");
    if (!animalType || !situation || !description || !imgData || !location) {
      setSubmitMsg("Please fill all fields, upload a valid photo, and capture location.");
      return;
    }
    setLoading(true);
    try {
      // Send to backend
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animalType,
          situation,
          description,
          photo: imgData,
          location,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitMsg("Report submitted successfully!");
      setAnimalType(""); setSituation(""); setDescription(""); setImgData(""); setLocation(null);
    } catch {
      setSubmitMsg("Error submitting report. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form-heading">Report Stray Animal for Rescue</div>

      <label className="form-label">Animal Type <span className="required">*</span></label>
      <select
        className="form-select"
        value={animalType}
        onChange={e => setAnimalType(e.target.value)}
        required
      >
        <option value="">Select Animal</option>
        <option value="dog">Dog</option>
        <option value="cow">Cow</option>
        <option value="cat">Cat</option>
        <option value="other">Other</option>
      </select>

      <label className="form-label">Situation <span className="required">*</span></label>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="situation"
            value="injured"
            checked={situation === "injured"}
            onChange={e => setSituation(e.target.value)}
            required
          />
          Injured
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="situation"
            value="aggressive"
            checked={situation === "aggressive"}
            onChange={e => setSituation(e.target.value)}
          />
          Aggressive
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="situation"
            value="ill"
            checked={situation === "ill"}
            onChange={e => setSituation(e.target.value)}
          />
          Ill
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="situation"
            value="other"
            checked={situation === "other"}
            onChange={e => setSituation(e.target.value)}
          />
          Other
        </label>
      </div>

      <label className="form-label">
        Description <span className="required">*</span>
      </label>
      <textarea
        className="form-textarea"
        value={description}
        maxLength={250}
        rows={3}
        onChange={e => {
          setDescription(e.target.value);
          setDescCount(e.target.value.length);
        }}
        required
        placeholder="Describe the situation (max 250 chars)"
      />
      <div className="char-count">{descCount}/250</div>

      <label className="form-label">
        Upload Live Photo <span className="required">*</span>
      </label>
      {imgData && (
        <img src={imgData} alt="Uploaded" className="uploaded-img" />
      )}
      {photoError && (
        <div className="retake-btn" onClick={() => setImgData("")}>
          {photoError} Retake Photo
        </div>
      )}
      {!imgData && (
        <input
          type="file"
          accept="image/*"
          capture="environment"
          required
          onChange={handlePhoto}
          className="form-input"
        />
      )}

      <label className="form-label">
        Location <span className="required">*</span>
      </label>
      {location ? (
        <div className="location-info">
          Latitude: {location.lat}, Longitude: {location.lng}
          <br />
          <span style={{ fontSize: 12 }}>
            Captured at: {new Date(location.timestamp).toLocaleString()}
          </span>
        </div>
      ) : (
        <button
          type="button"
          className="location-btn"
          onClick={handleLocation}
          disabled={locLoading}
        >
          {locLoading ? "Getting location..." : "Capture Location"}
        </button>
      )}
      {locError && <div className="location-info" style={{ color: "#e53e3e" }}>{locError}</div>}
      {location && (
        <iframe
          title="map"
          className="map-preview"
          src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
          allowFullScreen
        />
      )}
      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Report"}
      </button>
      {submitMsg && (
        <div
          style={{
            color: submitMsg.includes("success") ? "#38a169" : "#e53e3e",
            background: "#f7fafc",
            padding: "8px 0",
            borderRadius: 7,
            marginTop: 12,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {submitMsg}
        </div>
      )}
    </form>
  );
}