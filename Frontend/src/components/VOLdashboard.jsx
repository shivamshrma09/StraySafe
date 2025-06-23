import React, { useState } from "react";
import "./dashboard.css";

const animalTypes = ["Cow", "Dog", "Monkey", "Other"];

export default function VolunteerDashboard() {
  const [report, setReport] = useState({
    animal: "",
    notes: "",
    image: null,
    imageUrl: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [myReports, setMyReports] = useState([]);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setReport((r) => ({
          ...r,
          location: `${pos.coords.latitude},${pos.coords.longitude}`,
        }));
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Submit to backend and update myReports
  };

  return (
    <div className="vol-bg">
      <nav className="navbar">
        <div className="logo">StraySafe</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Report Animal</a>
          <a href="#">Track Status</a>
          <a href="#">My Reports</a>
          <span className="nav-user">👤 Shivam ▼</span>
        </div>
      </nav>
      <div className="container">
        <h2>Report Stray Animal</h2>
        <form onSubmit={handleSubmit} className="card">
          <label>Animal Type</label>
          <select
            value={report.animal}
            required
            onChange={(e) =>
              setReport((r) => ({ ...r, animal: e.target.value }))
            }
          >
            <option value="">Select type</option>
            {animalTypes.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <label>Photo (Camera Only)</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            required
            onChange={handleImageChange}
          />
          {report.imageUrl && (
            <img
              src={report.imageUrl}
              alt="preview"
              className="preview-img"
            />
          )}

          <label>Location (Auto-detected)</label>
          <input
            type="text"
            value={report.location || "Detecting..."}
            disabled
          />

          <label>Notes (Optional)</label>
          <textarea
            value={report.notes}
            onChange={(e) =>
              setReport((r) => ({ ...r, notes: e.target.value }))
            }
            placeholder="e.g. 'injured leg', 'causing jam'"
          />

          <button type="submit">Submit Report</button>
          {submitted && (
            <div className="success-msg">
              Report submitted! Track status using your Report ID.
            </div>
          )}
        </form>

        <div className="section">
          <h3>Track Report Status</h3>
          <form className="track-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Enter Report ID"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <button>Track</button>
          </form>
        </div>

        <div className="section">
          <h3>My Reports</h3>
          <div className="card">
            {myReports.length === 0 ? (
              <div className="empty-msg">No reports yet.</div>
            ) : (
              <ul className="reports-list">
                {myReports.map((rep, idx) => (
                  <li key={idx} className="report-item">
                    <span>
                      <b>{rep.animal}</b> at {rep.location} -{" "}
                      <span className="status-badge">{rep.status}</span>
                    </span>
                    <span className="report-time">{rep.timestamp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}