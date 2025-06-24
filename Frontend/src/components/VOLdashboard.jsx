import React, { useState, useEffect } from "react";
import "./dashboard.css"; // Assuming you have some styles

const VOLdashboard = () => {
  // Location and design state
  const [report, setReport] = useState({
    animalType: "",
    notes: "",
    image: null,
    imageUrl: "",
    lat: "",
    lng: "",
    location: "", // For address or place name
    design: "",   // For animal markings or description
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [myReports, setMyReports] = useState([]);
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");

  // GPS auto-detect with better error handling and logging
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("Location success:", pos.coords);
          setReport((r) => ({
            ...r,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
        },
        (err) => {
          console.error("Location error:", err);
          let msg = "";
          switch (err.code) {
            case 1:
              msg = "Location access denied. Please enable location services and allow permission in your browser.";
              break;
            case 2:
              msg = "Location information is unavailable. Try again or check your device settings.";
              break;
            case 3:
              msg = "Location request timed out. Please try again.";
              break;
            default:
              msg = "Unknown error occurred while fetching location.";
          }
          setError(msg);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Image change (camera only)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setReport((r) => ({
        ...r,
        image: e.target.files[0],
        imageUrl: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  // Submit report (to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !report.animalType ||
      !report.image ||
      !report.lat ||
      !report.lng
    ) {
      setError("Please fill all required fields and enable location.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("photo", report.image);
      formData.append("animalType", report.animalType);
      formData.append("notes", report.notes);
      formData.append("lat", report.lat);
      formData.append("lng", report.lng);

      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.reportId) {
        setTrackId(data.reportId);
        setSubmitted(true);
        fetchMyReports(); // This will use the current lat/lng
        setReport((r) => ({
          ...r,
          animalType: "",
          notes: "",
          image: null,
          imageUrl: "",
          // Do not reset lat and lng here to keep location for next report
        }));
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.error || "Submission failed. Try again.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  // Fetch my reports
  const fetchMyReports = async () => {
    if (!report.lat || !report.lng) return;
    try {
      const res = await fetch(`/api/reports?lat=${report.lat}&lng=${report.lng}`);
      const data = await res.json();
      setMyReports(data);
    } catch (err) {
      // Optionally handle error
    }
  };

  // Track by ID
  const handleTrack = async (e) => {
    e.preventDefault();
    setTracking(null);
    if (!trackId) return;
    try {
      const res = await fetch(`/api/reports/${trackId}`);
      if (res.ok) {
        const data = await res.json();
        setTracking(data);
      } else {
        setTracking({ notfound: true });
      }
    } catch {
      setTracking({ notfound: true });
    }
  };

  // Debug: Show report state in console
  useEffect(() => {
    console.log("Report state:", report);
  }, [report]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Animal Type*</label>
        <select
          value={report.animalType}
          onChange={(e) =>
            setReport((r) => ({ ...r, animalType: e.target.value }))
          }
          required
        >
          <option value="">Select</option>
          <option value="Cow">Cow</option>
          <option value="Dog">Dog</option>
          <option value="Monkey">Monkey</option>
          <option value="Other">Other</option>
        </select>

        <label>Photo*</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          required
        />
        {report.imageUrl && (
          <img src={report.imageUrl} alt="Preview" width={120} />
        )}

        <label>Notes (Optional)</label>
        <textarea
          value={report.notes}
          onChange={(e) =>
            setReport((r) => ({ ...r, notes: e.target.value }))
          }
          placeholder="e.g. 'injured leg', 'causing jam'"
        />

        <button
          type="submit"
          className="btn-green w-full"
          disabled={
            !report.animalType ||
            !report.image ||
            !report.lat ||
            !report.lng
          }
        >
          Submit Report
        </button>
        {!report.lat || !report.lng ? (
          <div className="text-yellow-600">
            Waiting for location... Please enable location services and allow permission in your browser.
          </div>
        ) : null}
        {submitted && (
          <div className="success-msg">
            Report submitted! Track status using your Report ID:{" "}
            <span className="font-mono">{trackId}</span>
            <button
              className="ml-2 btn-blue"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(trackId);
              }}
            >
              Copy
            </button>
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </form>
      {/* Baaki dashboard ka code yahan ho sakta hai */}
    </div>
  );
};

export default VOLdashboard;
