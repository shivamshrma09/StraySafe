import React, { useEffect, useState } from 'react';

export default function NGOdashboard() {
  const [activeReports, setActiveReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await fetch('/api/reports/active');
        const data = await res.json();
        if (!res.ok) {
          setError(data?.message || "Failed to load reports");
          return;
        }
        setActiveReports(data.reports || []);
      } catch (err) {
        setError("Network error");
      }
    };
    getReports();
  }, []);

  return (
    <div>
      <h2>Active Rescue Reports</h2>
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
          {activeReports.length === 0 ? (
            <tr>
              <td colSpan="10" style={{textAlign: "center"}}>No active reports available.</td>
            </tr>
          ) : (
            activeReports.map((r) => (
              <tr key={r.id}>
                <td>
                  <img src={r.photo || "/default-animal.png"} alt={r.animal || "No image"} style={{ width: 48, height: 48, borderRadius: '8px' }} />
                </td>
                <td>{r.animal || "Unknown"}</td>
                <td>{r.location || "Unknown"}</td>
                <td>
                  <span className={`dash-status ${r.status && r.status.toLowerCase()}`}>{r.status || "Unknown"}</span>
                </td>
                <td>{r.id}</td>
                <td>{r.situation || "Unknown"}</td>
                <td>{r.description || "No description"}</td>
                <td>{r.time || "Unknown"}</td>
                <td>{r.name || "Unknown"}</td>
                <td>{r.phone || "Unknown"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}