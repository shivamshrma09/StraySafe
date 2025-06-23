import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`/api/reports?status=${filter}`)
      .then(res => res.json())
      .then(setReports);
  }, [filter]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/reports/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setReports(reports.map(r => r._id === id ? { ...r, status } : r));
  };

  return (
    <div>
      <h2>Admin/NGO Dashboard</h2>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
        <option value="resolved">Resolved</option>
      </select>
      <table>
        <thead>
          <tr><th>ID</th><th>Photo</th><th>Type</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r._id}>
              <td>{r._id}</td>
              <td><img src={r.photoUrl} width={60} /></td>
              <td>{r.animalType}</td>
              <td>{r.status}</td>
              <td>
                {["pending", "verified"].map(s => (
                  <button key={s} onClick={() => updateStatus(r._id, s)}>{s}</button>
                ))}
                <button onClick={() => updateStatus(r._id, "resolved")}>Resolve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}