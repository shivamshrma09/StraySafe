// NgoDashboard.jsx
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
  const [filter, setFilter] = useState({
    animalType: "",
    status: "",
    search: "",
  });

  // Fetch all reports from backend
  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    let url = "/api/reports?";
    if (filter.status) url += `status=${filter.status}&`;
    if (filter.animalType) url += `animalType=${filter.animalType}&`;
    if (filter.search) url += `search=${filter.search}&`;
    const res = await fetch(url);
    const data = await res.json();
    setReports(data);
  };

  // Update status and rescue note
  const handleStatusUpdate = async (id, status, rescueNote) => {
    await fetch(`/api/reports/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, rescueNote }),
    });
    setSelected(null);
    fetchReports();
  };

  // Export CSV
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="navbar">
        <div className="logo">StraySafe NGO</div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">New Reports</a>
          <a href="#">Ongoing</a>
          <a href="#">Completed</a>
          <span className="nav-user">👤 NGO Admin</span>
        </div>
      </nav>
      <div className="container wide">
        <div className="filters flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Search by notes"
            value={filter.search}
            onChange={(e) =>
              setFilter((f) => ({ ...f, search: e.target.value }))
            }
          />
          <select
            value={filter.animalType}
            onChange={(e) =>
              setFilter((f) => ({ ...f, animalType: e.target.value }))
            }
          >
            <option value="">All Types</option>
            {animalTypes.map((a) => (
              <option key={a}>{a}</option>
            ))}
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
          <button className="btn-green" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
        <div className="card wide overflow-x-auto">
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
                <th>Rescue Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td className="font-mono">{r._id}</td>
                  <td>{r.animalType}</td>
                  <td>
                    <img src={r.imageUrl} alt="" className="thumb-img" />
                  </td>
                  <td>
                    {r.lat},{r.lng}
                  </td>
                  <td>
                    {new Date(r.submittedAt).toLocaleString()}
                  </td>
                  <td>{r.notes}</td>
                  <td>
                    <span className={statusClasses[r.status]}>
                      {r.status}
                    </span>
                  </td>
                  <td>{r.rescueNote}</td>
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
              {reports.length === 0 && (
                <tr>
                  <td colSpan={9} className="empty-msg">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="map-section">
          <span className="map-placeholder">
            {/* Embed OpenStreetMap/Google Map here */}
            [Map view: visualize all reports]
          </span>
        </div>
      </div>
      {selected && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Update Report Status</h3>
            <div>
              Report ID: <span className="font-mono">{selected._id}</span>
            </div>
            <div>
              Current Status: <b>{selected.status}</b>
            </div>
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
