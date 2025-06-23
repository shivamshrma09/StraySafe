import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch reports whenever filter changes
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
      .then(data => setReports(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  // Update report status
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin/NGO Dashboard</h2>
      <div style={styles.filterRow}>
        <label htmlFor="filter" style={styles.filterLabel}>Filter by Status:</label>
        <select
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Photo</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No reports found.</td>
                </tr>
              ) : (
                reports.map(r => (
                  <tr key={r._id}>
                    <td>{r._id}</td>
                    <td>
                      {r.photoUrl ? (
                        <img
                          src={r.photoUrl}
                          alt="animal"
                          width={60}
                          height={60}
                          style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                        />
                      ) : (
                        <span>No Photo</span>
                      )}
                    </td>
                    <td>{r.animalType || "N/A"}</td>
                    <td>{r.status}</td>
                    <td>
                      {r.status !== "pending" && (
                        <button
                          style={styles.actionBtn}
                          onClick={() => updateStatus(r._id, "pending")}
                        >
                          Set Pending
                        </button>
                      )}
                      {r.status !== "verified" && (
                        <button
                          style={styles.actionBtn}
                          onClick={() => updateStatus(r._id, "verified")}
                        >
                          Verify
                        </button>
                      )}
                      {r.status !== "resolved" && (
                        <button
                          style={{ ...styles.actionBtn, background: "#28a745" }}
                          onClick={() => updateStatus(r._id, "resolved")}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Basic responsive styling for better design
const styles = {
  container: {
    maxWidth: 950,
    margin: "auto",
    padding: "2rem 1rem",
    fontFamily: "Segoe UI, Arial, sans-serif",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 24,
    color: "#222",
    letterSpacing: 1,
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  filterLabel: {
    fontWeight: 500,
    fontSize: 16,
  },
  select: {
    fontSize: 16,
    padding: "4px 8px",
    borderRadius: 4,
    border: "1px solid #bbb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fafbfc",
    fontSize: 15,
    marginTop: 10,
  },
  loading: {
    textAlign: "center",
    margin: 30,
    color: "#666",
    fontSize: 18,
  },
  error: {
    color: "red",
    background: "#fff0f0",
    padding: "7px 12px",
    borderRadius: 4,
    marginBottom: 12,
    textAlign: "center",
  },
  actionBtn: {
    marginRight: 8,
    padding: "5px 11px",
    border: "none",
    borderRadius: 3,
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.2s",
  },
};