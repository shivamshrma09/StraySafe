import React, { useEffect, useState } from "react";
// Optionally import map and analytics libraries here
export default function VOLdashboard() {
  const [assignedReports, setAssignedReports] = useState([]);
  const [availableReports, setAvailableReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [impact, setImpact] = useState({helped: 0, distance: 0, badges: 0});

  useEffect(() => {
    setLoading(true);
    // Fetch assigned and available reports for this volunteer
    Promise.all([
      fetch("/api/reports/assigned").then(r => r.json()),
      fetch("/api/reports/available").then(r => r.json()),
      fetch("/api/volunteer/impact").then(r => r.json())
    ])
      .then(([assigned, available, imp]) => {
        setAssignedReports(assigned.reports || []);
        setAvailableReports(available.reports || []);
        setImpact(imp || {helped: 0, distance: 0, badges: 0});
      })
      .finally(() => setLoading(false));
  }, []);

  // Accept report
  const acceptReport = async (id) => {
    setLoading(true);
    await fetch(`/api/reports/${id}/accept`, {method: "POST"});
    // Refresh available/assigned
    const [assigned, available] = await Promise.all([
      fetch("/api/reports/assigned").then(r => r.json()),
      fetch("/api/reports/available").then(r => r.json())
    ]);
    setAssignedReports(assigned.reports || []);
    setAvailableReports(available.reports || []);
    setLoading(false);
  };

  // Mark completed
  const completeReport = async (id) => {
    setLoading(true);
    await fetch(`/api/reports/${id}/complete`, {method: "POST"});
    // Refresh assigned
    const assigned = await fetch("/api/reports/assigned").then(r => r.json());
    setAssignedReports(assigned.reports || []);
    setLoading(false);
  };

  return (
    <div className="voldash-bg">
      <h2>Volunteer Dashboard</h2>
      <div className="impact-row">
        <div className="impact-card">Animals Helped: {impact.helped}</div>
        <div className="impact-card">Distance: {impact.distance} km</div>
        <div className="impact-card">Badges: {impact.badges}</div>
      </div>
      <h3>My Assigned Reports</h3>
      {loading ? <div>Loading...</div> : (
        <table className="voldash-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Situation</th>
              <th>Reported At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedReports.length === 0 ? (
              <tr><td colSpan={8} style={{textAlign:"center"}}>No assigned reports.</td></tr>
            ) : (
              assignedReports.map(r => (
                <tr key={r._id}>
                  <td>{r._id}</td>
                  <td>
                    {r.photoUrl ? (
                      <img src={r.photoUrl} alt="animal" width={48} height={48}
                        style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                      />
                    ) : <span>No Photo</span>}
                  </td>
                  <td>{r.animalType || "N/A"}</td>
                  <td><span className={`status-chip ${r.status}`}>{r.status}</span></td>
                  <td>{r.location ? `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}` : "N/A"}</td>
                  <td>{r.situation || "N/A"}</td>
                  <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A"}</td>
                  <td>
                    {r.status !== "resolved" &&
                      (<button className="dash-action-btn dash-action-resolve"
                        onClick={() => completeReport(r._id)}>Mark Completed</button>)
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      <h3>Available Reports (Nearby/Unassigned)</h3>
      <table className="voldash-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Type</th>
            <th>Status</th>
            <th>Location</th>
            <th>Situation</th>
            <th>Reported At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availableReports.length === 0 ? (
            <tr><td colSpan={8} style={{textAlign:"center"}}>No available reports.</td></tr>
          ) : (
            availableReports.map(r => (
              <tr key={r._id}>
                <td>{r._id}</td>
                <td>
                  {r.photoUrl ? (
                    <img src={r.photoUrl} alt="animal" width={48} height={48}
                      style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                    />
                  ) : <span>No Photo</span>}
                </td>
                <td>{r.animalType || "N/A"}</td>
                <td><span className={`status-chip ${r.status}`}>{r.status}</span></td>
                <td>{r.location ? `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}` : "N/A"}</td>
                <td>{r.situation || "N/A"}</td>
                <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A"}</td>
                <td>
                  <button className="dash-action-btn" onClick={() => acceptReport(r._id)}>Accept</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Map and leaderboard can go here */}
    </div>
  );
}