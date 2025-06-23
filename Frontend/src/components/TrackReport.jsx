import React, { useState } from "react";

export default function TrackReport() {
  const [reportId, setReportId] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setError("");
    setReport(null);
    if (!reportId.trim()) {
      setError("Please enter a Report ID.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/${reportId.trim()}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setReport(data);
    } catch {
      setError("Report not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Track Your Report</h2>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={reportId}
          onChange={e => setReportId(e.target.value)}
          placeholder="Enter Report ID"
          style={styles.input}
          onKeyDown={e => e.key === "Enter" && fetchReport()}
        />
        <button style={styles.button} onClick={fetchReport} disabled={loading}>
          {loading ? "Searching..." : "Track"}
        </button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {report && (
        <div style={styles.reportCard}>
          <p style={styles.statusRow}>
            <span style={{ ...styles.status, ...statusStyles[report.status?.toLowerCase() || "pending"] }}>
              {report.status?.toUpperCase() || "PENDING"}
            </span>
          </p>
          <p><strong>Location:</strong> {report.location?.lat}, {report.location?.lng}</p>
          <p>
            <strong>Submitted:</strong>{" "}
            {report.location?.timestamp
              ? new Date(report.location.timestamp).toLocaleString()
              : "Unknown"}
          </p>
          {report.photoUrl && (
            <img
              src={report.photoUrl}
              alt="Report"
              width={220}
              style={styles.image}
            />
          )}
          <p>
            <strong>NGO Notes:</strong>{" "}
            {report.rescueProof ? report.rescueProof : <em>Pending...</em>}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "50px auto",
    padding: "28px 18px",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 2px 18px #0001",
    fontFamily: "Segoe UI, Arial, sans-serif",
    minHeight: 290,
  },
  heading: {
    textAlign: "center",
    color: "#1976d2",
    marginBottom: 28,
    letterSpacing: 1,
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    padding: "8px 12px",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #90caf9",
    outline: "none",
    minWidth: 0,
    boxSizing: "border-box",
  },
  button: {
    padding: "8px 18px",
    background: "#43A047",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.18s",
  },
  error: {
    color: "#d32f2f",
    background: "#fff0f0",
    borderRadius: 6,
    padding: "8px 10px",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 15,
  },
  reportCard: {
    background: "#f5f5f5",
    borderRadius: 10,
    padding: "18px 12px",
    marginTop: 8,
    boxShadow: "0 1px 6px #0001",
    textAlign: "center",
  },
  statusRow: {
    marginBottom: 10,
  },
  status: {
    display: "inline-block",
    minWidth: 98,
    borderRadius: 8,
    padding: "6px 16px",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 14,
  },
  image: {
    margin: "12px 0",
    borderRadius: 6,
    boxShadow: "0 1px 6px #0002",
    maxWidth: "95%",
    height: "auto",
  },
};

const statusStyles = {
  pending: {
    background: "#fff3cd",
    color: "#856404",
  },
  verified: {
    background: "#cce5ff",
    color: "#004085",
  },
  resolved: {
    background: "#d4edda",
    color: "#155724",
  },
};