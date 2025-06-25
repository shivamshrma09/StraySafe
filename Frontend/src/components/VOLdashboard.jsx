import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import "./VOLdashboard.css";
import {
  FaPaw, FaMapMarkerAlt, FaClipboardList, FaUser, FaTrophy, FaSearch, FaLocationArrow, FaSync
} from "react-icons/fa";

// Example animal zones (should come from backend/database)
const ANIMAL_ZONES = [
  { name: "Shelter 1", lat: 28.6139, lng: 77.2090, radius: 1000 }, // 1km
  // ...add more zones
];

// Helper: Haversine formula to check proximity (in meters)
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  function toRad(v) { return v * Math.PI / 180; }
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const VOLdashboard = () => {
  const [report, setReport] = useState({
    animalType: "",
    notes: "",
    image: null,
    imageUrl: "",
    lat: "",
    lng: "",
  });
  const [trackId, setTrackId] = useState("");
  const [myReports, setMyReports] = useState([]);
  const [tracking, setTracking] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("report");
  const [loading, setLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [locationDenied, setLocationDenied] = useState(false);

  // Get browser location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setReport((r) => ({
            ...r,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
          setLocationDenied(false);
        },
        (err) => {
          setError("Location error. Please enable GPS.");
          setLocationDenied(true);
        },
        { timeout: 10000 }
      );
    }
  }, []);

  // Retry location
  const requestLocation = () => {
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setReport((r) => ({
            ...r,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
          setLocationDenied(false);
        },
        (err) => {
          setError("Location error. Please enable GPS.");
          setLocationDenied(true);
        },
        { timeout: 10000 }
      );
    }
  };

  // Fetch my reports when location changes or after submit
  useEffect(() => {
    if (report.lat && report.lng) fetchMyReports();
    // eslint-disable-next-line
  }, [report.lat, report.lng]);

  // 1. Gallery-Only Photo Upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }
      setReport((r) => ({
        ...r,
        image: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  // 2. EXIF Timestamp Validation (must be within 2 min)
  const validateEXIFTimestamp = (file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        const dateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
        if (!dateTimeOriginal) return reject("Photo must have EXIF timestamp (gallery photo required).");
        // Convert "YYYY:MM:DD HH:MM:SS" to JS Date
        const exifDate = new Date(dateTimeOriginal.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3"));
        const now = new Date();
        const diff = Math.abs(now - exifDate) / 1000; // seconds
        if (diff > 120) return reject("Photo must be taken within 2 minutes.");
        resolve();
      });
    });
  };

  // 3. GPS Cross-Verification (compare EXIF GPS with browser GPS)
  const validateGPSCross = (file, userLat, userLng) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        const lat = EXIF.getTag(this, "GPSLatitude");
        const latRef = EXIF.getTag(this, "GPSLatitudeRef");
        const lng = EXIF.getTag(this, "GPSLongitude");
        const lngRef = EXIF.getTag(this, "GPSLongitudeRef");
        if (!lat || !lng) return reject("Photo must have GPS location (enable camera location in phone).");
        // Convert DMS to decimal
        const dmsToDec = (dms, ref) => {
          let dec = dms[0] + dms[1] / 60 + dms[2] / 3600;
          if (ref === "S" || ref === "W") dec = -dec;
          return dec;
        };
        const photoLat = dmsToDec(lat, latRef);
        const photoLng = dmsToDec(lng, lngRef);
        const dist = getDistanceFromLatLonInM(photoLat, photoLng, userLat, userLng);
        if (dist > 100) return reject("Photo location does not match your current location.");
        resolve();
      });
    });
  };

  // 4. Proximity Check with Animal Zones (within 1km of any zone)
  const isNearAnimalZone = (lat, lng) => {
    return ANIMAL_ZONES.some(zone =>
      getDistanceFromLatLonInM(lat, lng, zone.lat, zone.lng) <= zone.radius
    );
  };

  // 5. Rate Limiting (1 report per 2 minutes)
  const canSubmit = () => {
    const now = Date.now();
    if (now - lastSubmitTime < 120000) {
      setError("You can only submit one report every 2 minutes.");
      return false;
    }
    return true;
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!report.animalType || !report.image) {
      setError("Please select animal type and upload a photo from gallery.");
      setLoading(false);
      return;
    }
    if (!canSubmit()) {
      setLoading(false);
      return;
    }
    try {
      // EXIF timestamp validation
      await validateEXIFTimestamp(report.image);
      // GPS Cross-Verification
      await validateGPSCross(report.image, report.lat, report.lng);
      // Proximity check
      if (!isNearAnimalZone(report.lat, report.lng)) {
        setError("Report location is not near any known animal zone.");
        setLoading(false);
        return;
      }
      // All checks passed, submit to backend
      const formData = new FormData();
      formData.append("photo", report.image);
      formData.append("animalType", report.animalType);
      formData.append("notes", report.notes);
      formData.append("lat", report.lat);
      formData.append("lng", report.lng);

      const res = await fetch("/api/reports", { method: "POST", body: formData });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setTrackId(data.reportId);
        setSubmitted(true);
        setLastSubmitTime(Date.now());
        fetchMyReports();
        setTimeout(() => setSubmitted(false), 3000);
        setReport({
          animalType: "",
          notes: "",
          image: null,
          imageUrl: "",
          lat: report.lat,
          lng: report.lng,
        });
      } else setError(data.error || "Submission failed.");
    } catch (err) {
      setError(err.toString());
      setLoading(false);
    }
  };

  const fetchMyReports = async () => {
    setLoading(true);
    const res = await fetch(`/api/reports?lat=${report.lat}&lng=${report.lng}`);
    const data = await res.json();
    setMyReports(data);
    setLoading(false);
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackId) return;
    setLoading(true);
    const res = await fetch(`/api/reports/${trackId}`);
    if (res.ok) setTracking(await res.json());
    else setTracking({ notfound: true });
    setLoading(false);
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending": return "#f39c12";
      case "In Progress": return "#2980b9";
      case "Resolved": return "#27ae60";
      default: return "#888";
    }
  };

  return (
    <div className="vol-dashboard">
      <nav className="navbar">
        <h2><img src="whatsapp.jpg" alt="" /><strong>StraySafe</strong></h2>
        <div className="nav-links">
          <button onClick={() => setActiveSection("report")}><FaPaw /> Report</button>
          <button onClick={() => setActiveSection("track")}><FaClipboardList /> Track ID</button>
          <button onClick={() => setActiveSection("myreports")}><FaUser /> My Reports</button>
          <button onClick={() => setActiveSection("map")}><FaMapMarkerAlt /> Map</button>
          <button onClick={() => setActiveSection("badges")}><FaTrophy /> Badges</button>
        </div>
      </nav>

      <main>
        {/* REPORT FORM */}
        {activeSection === "report" && (
          <form className="report-form" onSubmit={handleSubmit}>
            <h1><img src="whatsapp.jpg" alt="" /> StraySafe</h1>
            <h4 className="form-heading">Report a Stray Animal</h4>
            <p className="form-description">
              Spotted an injured or stray animal? Upload a photo from your gallery (with location enabled) to help us ensure faster rescue and safer streets.
            </p>
            <hr />
            <label>Select Animal *</label>
            <select
              value={report.animalType}
              onChange={(e) => setReport({ ...report, animalType: e.target.value })}>
              <option value="">Select Animal</option>
              <option value="Cow">Cow</option>
              <option value="Dog">Dog</option>
              <option value="Monkey">Monkey</option>
              <option value="Other">Other</option>
            </select>
            <label>Describe the situation</label>
            <textarea
              placeholder="Optional notes (e.g. injured leg, blocking traffic)"
              value={report.notes}
              onChange={(e) => setReport({ ...report, notes: e.target.value })}
            ></textarea>
            <label>Upload Photo from Gallery *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {report.imageUrl && <img src={report.imageUrl} alt="Preview" className="preview-img" />}
            {/* Location enable button */}
            {locationDenied && (
              <button
                type="button"
                className="btn-green"
                style={{ marginTop: 12 }}
                onClick={requestLocation}
              >
                Enable Location
              </button>
            )}
            <button type="submit" className="btn-green" disabled={loading}>
              {loading ? "Submitting..." : <><FaLocationArrow /> Submit</>}
            </button>
            {error && <div className="error">{error}</div>}
            {submitted && (
              <div className="success">Report ID: {trackId}</div>
            )}
          </form>
        )}

        {/* TRACK SECTION */}
        {activeSection === "track" && (
          <form className="track-section" onSubmit={handleTrack}>
            <h4 className="form-heading"><FaClipboardList /> Track Your Report</h4>
            <p className="form-description">Enter your Report ID to check the status of your submission.</p>
            <input
              type="text"
              placeholder="Enter Report ID"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <button type="submit" className="btn-green" disabled={loading}>
              {loading ? "Loading..." : <><FaSearch /> Track</>}
            </button>
            {tracking && (
              <div className="tracking-result">
                {tracking.notfound ? (
                  <span className="error">Report not found.</span>
                ) : (
                  <div className="track-card">
                    <img src={tracking.imageUrl} alt="animal" />
                    <p><b>{tracking.animalType}</b></p>
                    <p>{tracking.notes}</p>
                    <p>
                      Status: <span style={{ color: statusColor(tracking.status) }}>{tracking.status}</span>
                    </p>
                    <p>Date: {new Date(tracking.createdAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
          </form>
        )}

        {/* MY REPORTS */}
        {activeSection === "myreports" && (
          <div className="myreports">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 className="form-heading"><FaUser /> My Submitted Reports</h4>
              <button className="refresh-btn" onClick={fetchMyReports}><FaSync /> Refresh</button>
            </div>
            <p className="form-description">Here are all the reports you've submitted based on your location.</p>
            {loading && <div>Loading...</div>}
            {myReports.length === 0 && !loading && <div>No reports found.</div>}
            <div className="report-list">
              {myReports.map((r, i) => (
                <div key={i} className="report-card">
                  <img src={r.imageUrl} alt="animal" />
                  <p><b>{r.animalType}</b></p>
                  <p>{r.notes}</p>
                  <p>
                    Status: <span style={{ color: statusColor(r.status) }}>{r.status}</span>
                  </p>
                  <p><small>{new Date(r.createdAt).toLocaleString()}</small></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAP SECTION */}
        {activeSection === "map" && (
          <div className="map-placeholder">
            <h4 className="form-heading"><FaMapMarkerAlt /> Rescue Map View</h4>
            <p className="form-description">Live map of nearby reports and rescue status. Coming soon!</p>
          </div>
        )}

        {/* BADGES SECTION */}
        {activeSection === "badges" && (
          <div className="badge-section">
            <h4 className="form-heading"><FaTrophy /> Your Volunteer Achievements</h4>
            <p className="form-description">Unlock badges for your contributions and dedication.</p>
            <ul>
              <li>🎖️ 5 Verified Reports</li>
              <li>🥇 First Responder Badge</li>
              <li>🐕‍🦺 Neighborhood Guardian</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default VOLdashboard;
