import React, { useState } from "react";
import "./dashboard.css";

const statusClasses = {
  Pending: "status-badge status-pending",
  Verified: "status-badge status-verified",
  Resolved: "status-badge status-resolved",
};

export default function NgoDashboard() {
  const [reports, setReports] = useState([
    {
      id: "RPT12345",
      animal: "Cow",
      image:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80",
      location: "28.7041,77.1025",
      timestamp: "2025-06-23 12:20",
      status: "Pending",
      notes: "Injured leg",
    },
    // Add more mock reports as needed
  ]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState({
    type: "",
    status: "",
    search: "",
  });

  const handleStatusUpdate = (id, status, rescueNote) => {
    setReports((reports) =>
      reports.map((r) =>
        r.id === id ? { ...r, status, rescueNote } : r
      )
    );
    setSelected(null);
  };

  const filteredReports = reports.filter(
    (r) =>
      (!filter.type || r.animal === filter.type) &&
      (!filter.status || r.status === filter.status) &&
      (!filter.search ||
        r.id.includes(filter.search) ||
        r.notes.toLowerCase().includes(filter.search.toLowerCase()))
  );

  return (
    <div className="ngo-bg">
      <nav className="navbar">
        <div className="logo">StraySafe NGO</div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">New Reports</a>
          <a href="#">Ongoing</a>
          <a href="#">Completed</a>
          <a href="#">Team</a>
          <span className="nav-user">👤 NGO Admin ▼</span>
        </div>
      </nav>
      <div className="container wide">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by ID or notes"
            value={filter.search}
            onChange={(e) =>
              setFilter((f) => ({ ...f, search: e.target.value }))
            }
          />
          <select
            value={filter.type}
            onChange={(e) =>
              setFilter((f) => ({ ...f, type: e.target.value }))
            }
          >
            <option value="">All Types</option>
            <option>Cow</option>
            <option>Dog</option>
            <option>Monkey</option>
            <option>Other</option>
          </select>
          <select
            value={filter.status}
            onChange={(e) =>
              setFilter((f) => ({ ...f, status: e.target.value }))
            }
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Verified</option>
            <option>Resolved</option>
          </select>
          <button className="btn-green">Export Reports</button>
        </div>
        <div className="card wide">
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Animal</th>
                <th>Photo</th>
                <th>Location</th>
                <th>Time</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono">{r.id}</td>
                  <td>{r.animal}</td>
                  <td>
                    <img src={r.image} alt="" className="thumb-img" />
                  </td>
                  <td>{r.location}</td>
                  <td>{r.timestamp}</td>
                  <td>{r.notes}</td>
                  <td>
                    <span className={statusClasses[r.status]}>{r.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn-blue"
                      onClick={() => setSelected(r)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={8} className="empty-msg">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="map-section">
          <span className="map-placeholder">
            [Map view coming soon: visualize all reports here]
          </span>
        </div>
      </div>
      {selected && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Update Report Status</h3>
            <div>
              Report ID: <span className="font-mono">{selected.id}</span>
            </div>
            <div>Current Status: <b>{selected.status}</b></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const status = e.target.status.value;
                const note = e.target.rescueNote.value;
                handleStatusUpdate(selected.id, status, note);
              }}
            >
              <select name="status" defaultValue={selected.status}>
                <option>Pending</option>
                <option>Verified</option>
                <option>Resolved</option>
              </select>
              <textarea
                name="rescueNote"
                placeholder="Rescue/Resolution note (visible to user)"
                defaultValue={selected.rescueNote || ""}
              />
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-green">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}