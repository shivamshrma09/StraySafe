import React, { useEffect, useState } from "react";
import "./VOLdashboard.css";
import {
  FaPaw,
  FaMapMarkerAlt,
  FaClipboardList,
  FaUser,
  FaTrophy,
  FaSearch,
  FaCamera,
  FaLocationArrow
} from "react-icons/fa";

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setReport((r) => ({
            ...r,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
        },
        (err) => setError("Location error. Please enable GPS."),
        { timeout: 10000 }
      );
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setReport((r) => ({
        ...r,
        image: e.target.files[0],
        imageUrl: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("photo", report.image);
    formData.append("animalType", report.animalType);
    formData.append("notes", report.notes);
    formData.append("lat", report.lat);
    formData.append("lng", report.lng);

    const res = await fetch("/api/reports", { method: "POST", body: formData });
    const data = await res.json();
    if (res.ok) {
      setTrackId(data.reportId);
      setSubmitted(true);
      fetchMyReports();
      setTimeout(() => setSubmitted(false), 3000);
    } else setError(data.error);
  };

  const fetchMyReports = async () => {
    const res = await fetch(`/api/reports?lat=${report.lat}&lng=${report.lng}`);
    const data = await res.json();
    setMyReports(data);
  };

  const handleTrack = async () => {
    if (!trackId) return;
    const res = await fetch(`/api/reports/${trackId}`);
    if (res.ok) setTracking(await res.json());
    else setTracking({ notfound: true });
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
        {activeSection === "report" && (
          <form className="report-form" onSubmit={handleSubmit}>
            <h1><img src="whatsapp.jpg" alt="" /> StraySafe</h1>
            <h4 className="form-heading"> Report a Stray Animal</h4>
            <p className="form-description">
              Spotted an injured or stray animal? Upload a live photo and location to help us ensure faster rescue and safer streets
            </p>
            <hr />
            <label>Select Animal</label>
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
            <label>Take a Live Photo *</label>
            <input type="file" accept="image/*" capture onChange={handleImageChange} required />
            {report.imageUrl && <img src={report.imageUrl} alt="Preview" className="preview-img" />}
            <button type="submit" className="btn-green"><FaLocationArrow /> Submit</button>
            {error && <div className="error">{error}</div>}
            {submitted && (
              <div className="success">Report ID: {trackId}</div>
            )}
          </form>
        )}

        {activeSection === "track" && (
          <form className="track-section">
            <h4 className="form-heading"><FaClipboardList /> Track Your Report</h4>
            <p className="form-description">Enter your Report ID to check the status of your submission.</p>
            <input
              type="text"
              placeholder="Enter Report ID"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <button onClick={handleTrack}><FaSearch /> Track</button>
            {tracking && (
              <div className="tracking-result">
                {tracking.notfound ? "Report not found." : JSON.stringify(tracking)}
              </div>
            )}
          </form>
        )}

        {activeSection === "myreports" && (
          <div className="myreports">
            <h4 className="form-heading"><FaUser /> My Submitted Reports</h4>
            <p className="form-description">Here are all the reports you've submitted based on your location.</p>
            {myReports.map((r, i) => (
              <div key={i} className="report-card">
                <img src={r.imageUrl} alt="animal" />
                <p><b>{r.animalType}</b></p>
                <p>{r.notes}</p>
                <p>Status: {r.status}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "map" && (
          <div className="map-placeholder">
            <h4 className="form-heading"><FaMapMarkerAlt /> Rescue Map View</h4>
            <p className="form-description">Live map of nearby reports and rescue status. Coming soon!</p>
          </div>
        )}

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
