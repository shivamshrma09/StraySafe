import React, { useState } from "react";

export default function TrackReport() {
  const [reportId, setReportId] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setError("");
    setReport(null);
    try {
      const res = await fetch(`/api/reports/${reportId}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setReport(data);
    } catch {
      setError("Report not found.");
    }
  };

  return (
    <div>
      <h2>Track Your Report</h2>
      <input
        type="text"
        value={reportId}
        onChange={e => setReportId(e.target.value)}
        placeholder="Enter Report ID"
      />
      <button onClick={fetchReport}>Track</button>
      {error && <div>{error}</div>}
      {report && (
        <div>
          <p>Status: {report.status}</p>
          <p>Location: {report.location.lat}, {report.location.lng}</p>
          <p>Submitted: {report.location.timestamp}</p>
          <img src={report.photoUrl} alt="Report" width={200} />
          <p>NGO Notes: {report.rescueProof || "Pending..."}</p>
        </div>
      )}
    </div>
  );
}