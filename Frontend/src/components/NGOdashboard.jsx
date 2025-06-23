// import React, { useEffect, useState } from "react";
// import "./NGOdashboard.css";

// export default function NGOdashboard() {
//   const [activeReports, setActiveReports] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getReports = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch("/api/reports/active");
//         const data = await res.json();
//         if (!res.ok) {
//           setError(data?.message || "Failed to load reports");
//           setActiveReports([]);
//         } else {
//           setActiveReports(Array.isArray(data.reports) ? data.reports : []);
//         }
//       } catch (err) {
//         setError("Network error");
//         setActiveReports([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getReports();
//   }, []);

//   return (
//     <div className="dashboard-bg">
//       <div className="table-container">
//         <h2>Active Rescue Reports</h2>
//         {loading && <div className="info">Loading reports...</div>}
//         {error && <div className="error">{error}</div>}
//         <table className="styled-table">
//           <thead>
//             <tr>
//               <th>Photo</th>
//               <th>Animal Type</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>ID</th>
//               <th>Situation</th>
//               <th>Description</th>
//               <th>Time</th>
//               <th>Name</th>
//               <th>Phone number</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && activeReports.length === 0 ? (
//               <tr>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   No active reports available.
//                 </td>
//               </tr>
//             ) : (
//               activeReports.map((r) => (
//                 <tr key={r.id || r._id}>
//                   <td>
//                     <img
//                       src={r.photo || "/default-animal.png"}
//                       alt={r.animal || "No image"}
//                       style={{
//                         width: 48,
//                         height: 48,
//                         borderRadius: "8px",
//                         objectFit: "cover",
//                       }}
//                       loading="lazy"
//                     />
//                   </td>
//                   <td>{r.animal || "Unknown"}</td>
//                   <td>{r.location || "Unknown"}</td>
//                   <td>
//                     <span
//                       className={`dash-status ${r.status ? r.status.toLowerCase() : ""}`}
//                     >
//                       {r.status || "Unknown"}
//                     </span>
//                   </td>
//                   <td>{r.id || r._id}</td>
//                   <td>{r.situation || "Unknown"}</td>
//                   <td>{r.description || "No description"}</td>
//                   <td>{r.time ? new Date(r.time).toLocaleString() : "Unknown"}</td>
//                   <td>{r.name || "Unknown"}</td>
//                   <td>{r.phone || "Unknown"}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
// Optionally import map library here (e.g., react-leaflet or Google Maps component)
export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // For clustering/analytics, add more state as needed

  useEffect(() => {
    setLoading(true);
    setError("");
    let url = "/api/reports";
    if (filter !== "all") url += `?status=${filter}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then(data => setReports(data.reports || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  // Update report status or upload rescue proof
  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/reports/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setReports(reports =>
        reports.map(r => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admindash-bg">
      <h2>NGO/Admin Dashboard</h2>
      <div className="admindash-summary">
        <div className="dash-card">New: {reports.filter(r => r.status==="pending").length}</div>
        <div className="dash-card">Verified: {reports.filter(r => r.status==="verified").length}</div>
        <div className="dash-card">Resolved: {reports.filter(r => r.status==="resolved").length}</div>
        {/* Add top zone, clustering analytics etc here */}
      </div>
      <div style={{marginTop:16, marginBottom:12}}>
        <label>Filter by Status:</label>
        <select value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{overflowX:"auto"}}>
          <table className="admindash-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Photo</th>
                <th>Type</th>
                <th>Status</th>
                <th>Location</th>
                <th>Situation</th>
                <th>Reported At</th>
                <th>Reporter</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{textAlign:"center"}}>No reports found.</td>
                </tr>
              ) : (
                reports.map(r => (
                  <tr key={r._id}>
                    <td>{r._id}</td>
                    <td>
                      {r.photoUrl ? (
                        <img src={r.photoUrl} alt="animal" width={60} height={60}
                          style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                        />
                      ) : <span>No Photo</span>}
                    </td>
                    <td>{r.animalType || "N/A"}</td>
                    <td>
                      <span className={`status-chip ${r.status}`}>{r.status}</span>
                    </td>
                    <td>
                      {r.location ? (
                        <span>
                          {r.location.lat.toFixed(4)}, {r.location.lng.toFixed(4)}
                        </span>
                      ) : "N/A"}
                    </td>
                    <td>{r.situation || "N/A"}</td>
                    <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "N/A"}</td>
                    <td>
                      {r.reportedBy
                        ? `${r.reportedBy.firstName || ""} ${r.reportedBy.lastName || ""}`
                        : "N/A"}
                    </td>
                    <td>
                      {r.status !== "pending" && (
                        <button className="dash-action-btn" onClick={() => updateStatus(r._id, "pending")}>Set Pending</button>
                      )}
                      {r.status !== "verified" && (
                        <button className="dash-action-btn" onClick={() => updateStatus(r._id, "verified")}>Verify</button>
                      )}
                      {r.status !== "resolved" && (
                        <button className="dash-action-btn dash-action-resolve" onClick={() => updateStatus(r._id, "resolved")}>Resolve</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Map and clustering/analytics section can go here */}
      {/* You can embed a map view below for visualizing reports */}
    </div>
  );
}