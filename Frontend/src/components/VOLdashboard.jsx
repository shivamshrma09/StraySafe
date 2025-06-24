// VolunteerDashboard.jsx
import React, { useState, useEffect } from "react";
import "./dashboard.css"; // Tailwind या अपनी CSS

const animalTypes = ["Cow", "Dog", "Monkey", "Other"];

export default function VolunteerDashboard() {
  const [report, setReport] = useState({
    animalType: "",
    notes: "",
    image: null,
    imageUrl: "",
    lat: "",
    lng: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [myReports, setMyReports] = useState([]);
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");

  // GPS auto-detect
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setReport((r) => ({
          ...r,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }));
      });
    }
  }, []);

  // Image change (camera only)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setReport((r) => ({
        ...r,
        image: e.target.files[0],
        imageUrl: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  // Submit report (to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("photo", report.image);
      formData.append("animalType", report.animalType);
      formData.append("notes", report.notes);
      formData.append("lat", report.lat);
      formData.append("lng", report.lng);

      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.reportId) {
        setTrackId(data.reportId);
        setSubmitted(true);
        // My reports को refresh करो
        fetchMyReports();
        setReport({
          animalType: "",
          notes: "",
          image: null,
          imageUrl: "",
          lat: report.lat,
          lng: report.lng,
        });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.error || "Submission failed. Try again.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  // Fetch my reports (by location or user, as per backend)
  const fetchMyReports = async () => {
    const res = await fetch(`/api/reports?lat=${report.lat}&lng=${report.lng}`);
    const data = await res.json();
    setMyReports(data);
  };

  // Track by ID
  const handleTrack = async (e) => {
    e.preventDefault();
    setTracking(null);
    if (!trackId) return;
    const res = await fetch(`/api/reports/${trackId}`);
    if (res.ok) {
      const data = await res.json();
      setTracking(data);
    } else {
      setTracking({ notfound: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <nav className="navbar">
        <div className="logo">🐾 StraySafe</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Report Animal</a>
          <a href="#">Track Status</a>
          <a href="#">My Reports</a>
          <span className="nav-user">👤 Volunteer</span>
        </div>
      </nav>
      <div className="container max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mt-6 mb-3">Report Stray Animal</h2>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <label>Animal Type</label>
          <select
            value={report.animalType}
            required
            onChange={(e) =>
              setReport((r) => ({ ...r, animalType: e.target.value }))
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
            value={
              report.lat && report.lng
                ? `${report.lat},${report.lng}`
                : "Detecting..."
            }
            disabled
          />
          {report.lat && report.lng && (
            <iframe
              title="Map"
              className="rounded-md border my-2"
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${report.lat},${report.lng}&z=15&output=embed`}
            />
          )}

          <label>Notes (Optional)</label>
          <textarea
            value={report.notes}
            onChange={(e) =>
              setReport((r) => ({ ...r, notes: e.target.value }))
            }
            placeholder="e.g. 'injured leg', 'causing jam'"
          />

          <button type="submit" className="btn-green w-full">
            Submit Report
          </button>
          {submitted && (
            <div className="success-msg">
              Report submitted! Track status using your Report ID:{" "}
              <span className="font-mono">{trackId}</span>
              <button
                className="ml-2 btn-blue"
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(trackId);
                }}
              >
                Copy
              </button>
            </div>
          )}
          {error && <div className="text-red-600">{error}</div>}
        </form>

        <div className="section">
          <h3>Track Report Status</h3>
          <form className="track-form" onSubmit={handleTrack}>
            <input
              type="text"
              placeholder="Enter Report ID"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <button className="btn-blue" type="submit">Track</button>
          </form>
          {tracking &&
            (tracking.notfound ? (
              <div className="card mt-2 text-red-600">
                Report not found.
              </div>
            ) : (
              <div className="card mt-2">
                <div>
                  <b>Animal:</b> {tracking.animalType}
                  <br />
                  <b>Location:</b> {tracking.lat},{tracking.lng}
                  <br />
                  <b>Time:</b>{" "}
                  {new Date(tracking.submittedAt).toLocaleString()}
                  <br />
                  <b>Status:</b>{" "}
                  <span
                    className={`status-badge status-${tracking.status?.toLowerCase()}`}
                  >
                    {tracking.status}
                  </span>
                  <br />
                  {tracking.rescueNote && (
                    <div className="mt-2">
                      <b>Rescue Note:</b> {tracking.rescueNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
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
                      <b>{rep.animalType}</b> at {rep.lat},{rep.lng} -{" "}
                      <span
                        className={`status-badge status-${rep.status?.toLowerCase()}`}
                      >
                        {rep.status}
                      </span>
                    </span>
                    <span className="report-time">
                      {new Date(rep.submittedAt).toLocaleString()}
                    </span>
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
