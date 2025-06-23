import React, { useEffect, useState } from "react";
import "./NGOdashboard.css";

export default function NGOdashboard() {
  const [activeReports, setActiveReports] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReports = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/reports/active");
        const data = await res.json();
        if (!res.ok) {
          setError(data?.message || "Failed to load reports");
          setActiveReports([]);
        } else {
          setActiveReports(Array.isArray(data.reports) ? data.reports : []);
        }
      } catch (err) {
        setError("Network error");
        setActiveReports([]);
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="table-container">
        <h2>Active Rescue Reports</h2>
        {loading && <div className="info">Loading reports...</div>}
        {error && <div className="error">{error}</div>}
        <table className="styled-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Animal Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>ID</th>
              <th>Situation</th>
              <th>Description</th>
              <th>Time</th>
              <th>Name</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {!loading && activeReports.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No active reports available.
                </td>
              </tr>
            ) : (
              activeReports.map((r) => (
                <tr key={r.id || r._id}>
                  <td>
                    <img
                      src={r.photo || "/default-animal.png"}
                      alt={r.animal || "No image"}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </td>
                  <td>{r.animal || "Unknown"}</td>
                  <td>{r.location || "Unknown"}</td>
                  <td>
                    <span
                      className={`dash-status ${r.status ? r.status.toLowerCase() : ""}`}
                    >
                      {r.status || "Unknown"}
                    </span>
                  </td>
                  <td>{r.id || r._id}</td>
                  <td>{r.situation || "Unknown"}</td>
                  <td>{r.description || "No description"}</td>
                  <td>{r.time ? new Date(r.time).toLocaleString() : "Unknown"}</td>
                  <td>{r.name || "Unknown"}</td>
                  <td>{r.phone || "Unknown"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}