// ✅ Final Improved NgoDashboard.jsx
import React, { useState, useEffect } from "react";
import "./dashboard.css";

const statusClasses = {
  Pending: "status-badge status-pending",
  Verified: "status-badge status-verified",
  Resolved: "status-badge status-resolved",
};

const animalTypes = ["Cow", "Dog", "Monkey", "Other"];

export default function NgoDashboard() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState({ animalType: "", status: "", search: "" });
  const [ngoProfile, setNgoProfile] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [filter]);

  useEffect(() => {
    fetch("/api/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNgoProfile(data))
      .catch((err) => console.error("Failed to load NGO profile", err));
  }, []);

  const fetchReports = async () => {
    let url = "/api/reports?";
    if (filter.status) url += `status=${filter.status}&`;
    if (filter.animalType) url += `animalType=${filter.animalType}&`;
    if (filter.search) url += `search=${filter.search}&`;
    const res = await fetch(url);
    const data = await res.json();
    setReports(data);
  };

  const handleStatusUpdate = async (id, status, rescueNote) => {
    await fetch(`/api/reports/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, rescueNote }),
    });
    setSelected(null);
    fetchReports();
  };

  const exportCSV = () => {
    if (!reports.length) return;
    const header = Object.keys(reports[0]).join(",");
    const rows = reports.map((obj) =>
      Object.values(obj)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "straysafe-reports.csv";
    a.click();
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <div className="logo">🐾 StraySafe NGO Portal</div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">My Reports</a>
          <a href="#">Resolved</a>
          <span className="nav-user">👤 {ngoProfile?.ngoName || "NGO Admin"}</span>
        </div>
      </nav>

      <div className="container wide">
        {ngoProfile ? (
          <div className="profile-card">
            <h2>👤 Welcome, {ngoProfile.ngoName}</h2>
            <p><b>Registration #:</b> {ngoProfile.registrationNumber}</p>
            <p><b>Email:</b> {ngoProfile.email}</p>
            <p><b>Phone:</b> {ngoProfile.phone || "Not Provided"}</p>
            <p><b>Total Rescues:</b> {ngoProfile.totalRescues}</p>
          </div>
        ) : (
          <div className="loading-profile">Loading NGO profile...</div>
        )}

        <div className="filters">
          <input
            type="text"
            placeholder="Search by notes"
            value={filter.search}
            onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
          />
          <select
            value={filter.animalType}
            onChange={(e) => setFilter((f) => ({ ...f, animalType: e.target.value }))}
          >
            <option value="">All Types</option>
            {animalTypes.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select
            value={filter.status}
            onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Verified</option>
            <option>Resolved</option>
          </select>
          <button className="btn-export" onClick={exportCSV}>⬇️ Export CSV</button>
        </div>

        <div className="reports-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Animal</th>
                <th>Photo</th>
                <th>Location</th>
                <th>Time</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Rescue Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{r._id.slice(-6)}</td>
                  <td>{r.animalType}</td>
                  <td><img src={r.imageUrl} alt="animal" className="report-img" /></td>
                  <td>{r.lat},{r.lng}</td>
                  <td>{new Date(r.submittedAt).toLocaleString()}</td>
                  <td>{r.notes}</td>
                  <td><span className={statusClasses[r.status]}>{r.status}</span></td>
                  <td>{r.rescueNote}</td>
                  <td><button className="btn-update" onClick={() => setSelected(r)}>✏️</button></td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr><td colSpan={9}>No reports found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="analytics-card">
          <h3>📊 Report Summary</h3>
          <ul>
            <li>Total: {reports.length}</li>
            <li>Pending: {reports.filter(r => r.status === 'Pending').length}</li>
            <li>Verified: {reports.filter(r => r.status === 'Verified').length}</li>
            <li>Resolved: {reports.filter(r => r.status === 'Resolved').length}</li>
          </ul>
        </div>

        <div className="map-view">📍 Map view placeholder</div>
      </div>

      {selected && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Update Status</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const status = e.target.status.value;
                const note = e.target.rescueNote.value;
                handleStatusUpdate(selected._id, status, note);
              }}
            >
              <select name="status" defaultValue={selected.status}>
                <option>Pending</option>
                <option>Verified</option>
                <option>Resolved</option>
              </select>
              <textarea
                name="rescueNote"
                placeholder="Write rescue note"
                defaultValue={selected.rescueNote || ""}
              />
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setSelected(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
