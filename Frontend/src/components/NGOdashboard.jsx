import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Pending: "bg-yellow-200",
  Verified: "bg-blue-200",
  Resolved: "bg-green-200",
};

const NGODashboard = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState({ status: "", animalType: "" });
  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, [filter, search]);

  const fetchReports = async () => {
    const res = await axios.get("/api/reports", { params: { ...filter, search } });
    setReports(res.data);
  };

  const handleExport = (type) => {
    setExporting(true);
    const data = type === "csv"
      ? convertToCSV(reports)
      : JSON.stringify(reports, null, 2);
    const blob = new Blob([data], { type: type === "csv" ? "text/csv" : "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `straysafe-reports.${type}`;
    a.click();
    setExporting(false);
  };

  function convertToCSV(arr) {
    if (!arr.length) return "";
    const header = Object.keys(arr[0]).join(",");
    const rows = arr.map(obj => Object.values(obj).map(val =>
      typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val
    ).join(","));
    return [header, ...rows].join("\r\n");
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">NGO Dashboard</h2>
      <div className="flex gap-4 mb-4">
        <select onChange={e => setFilter(f => ({ ...f, status: e.target.value }))} className="border rounded p-2">
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Verified</option>
          <option>Resolved</option>
        </select>
        <select onChange={e => setFilter(f => ({ ...f, animalType: e.target.value }))} className="border rounded p-2">
          <option value="">All Animals</option>
          <option>Cow</option>
          <option>Dog</option>
          <option>Monkey</option>
          <option>Other</option>
        </select>
        <input type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} className="border rounded p-2"/>
        <button onClick={() => handleExport("csv")} disabled={exporting} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          Export CSV
        </button>
        <button onClick={() => handleExport("json")} disabled={exporting} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Export JSON
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Image</th>
              <th className="p-2">Type</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Time</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-2">
                  <img src={r.imageUrl} alt={r.animalType} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2">{r.animalType}</td>
                <td className="p-2">{r.lat.toFixed(4)}, {r.lng.toFixed(4)}</td>
                <td className={`p-2 font-bold ${statusColors[r.status]}`}>{r.status}</td>
                <td className="p-2">{r.notes}</td>
                <td className="p-2">{new Date(r.submittedAt).toLocaleString()}</td>
                <td className="p-2">
                  {/* You can add status update buttons, modal for rescue note, view on map etc here */}
                  {/* Example: */}
                  {/* <button onClick={() => openStatusModal(r._id)}>Update</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NGODashboard;