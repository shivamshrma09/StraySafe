import React, { useState, useEffect } from "react";
import axios from "axios";

const animalTypes = ["Cow", "Dog", "Monkey", "Other"];

const ReportForm = () => {
  const [photo, setPhoto] = useState(null);
  const [animalType, setAnimalType] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Get GPS location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setStatus("Could not get GPS location. Please enable location services.")
    );
  }, []);

  const handlePhoto = (e) => {
    if (e.target.files[0]) setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!animalType || !photo || !location) {
      setStatus("Please fill all the fields and allow camera/GPS.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("animalType", animalType);
    formData.append("notes", notes);
    formData.append("photo", photo);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);

    try {
      const res = await axios.post("/api/reports", formData);
      setStatus(`Report submitted! Your Report ID: ${res.data.reportId}`);
    } catch (err) {
      setStatus("Submission failed: " + (err.response?.data?.error || "Please try again."));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded p-8 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Report a Stray Animal</h2>
      <label className="block font-semibold">Animal Type:</label>
      <select
        value={animalType}
        onChange={e => setAnimalType(e.target.value)}
        required
        className="w-full border rounded p-2"
      >
        <option value="">Select</option>
        {animalTypes.map(type => <option key={type}>{type}</option>)}
      </select>
      <label className="block font-semibold">Photo (live camera only):</label>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        required
        onChange={handlePhoto}
        className="w-full"
      />
      <label className="block font-semibold">Optional Notes:</label>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="e.g. Injured, causing jam, etc."
        className="w-full border rounded p-2"
      />
      <div>
        <span className="font-semibold">GPS: </span>
        {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : "Detecting..."}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
      {status && <div className="text-center text-red-600 mt-2">{status}</div>}
    </form>
  );
};

export default ReportForm;