import React, { useState } from "react";

export default function Reportanimal() {
  const [animalType, setAnimalType] = useState("");
  const [situation, setSituation] = useState("");
  const [description, setDescription] = useState("");
  const [imgData, setImgData] = useState("");
  const [location, setLocation] = useState(null);
  const [submitMsg, setSubmitMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Camera-only input handler
  const handlePhoto = (e) => {
    setImgData(""); setSubmitMsg("");
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Enforce camera usage
    if (!file.type.startsWith("image/")) {
      setSubmitMsg("Upload a photo taken with your camera.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImgData(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Get GPS location
  const getLocation = () => {
    setSubmitMsg("");
    if (!navigator.geolocation) {
      setSubmitMsg("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        timestamp: pos.timestamp,
      }),
      () => setSubmitMsg("Unable to fetch location."),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Submit report
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");
    if (!animalType || !situation || !description || !imgData || !location) {
      setSubmitMsg("Please fill all fields, upload photo, and capture location.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animalType,
          situation,
          description,
          photo: imgData,
          location,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitMsg("Report submitted successfully! Track status on your dashboard.");
      setAnimalType(""); setSituation(""); setDescription(""); setImgData(""); setLocation(null);
    } catch {
      setSubmitMsg("Error submitting report. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reportanimal-form-bg">
      <form className="reportanimal-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Report a Stray Animal</h2>
        <label>Animal Type <span className="required">*</span></label>
        <select value={animalType} onChange={e => setAnimalType(e.target.value)} required>
          <option value="">Select Animal</option>
          <option value="dog">Dog</option>
          <option value="cow">Cow</option>
          <option value="cat">Cat</option>
          <option value="monkey">Monkey</option>
          <option value="other">Other</option>
        </select>
        <label>Situation <span className="required">*</span></label>
        <div className="radio-group">
          <label><input type="radio" name="situation" value="injured" checked={situation==="injured"} onChange={e=>setSituation(e.target.value)} /> Injured</label>
          <label><input type="radio" name="situation" value="roaming" checked={situation==="roaming"} onChange={e=>setSituation(e.target.value)} /> Roaming/Frightened</label>
          <label><input type="radio" name="situation" value="sick" checked={situation==="sick"} onChange={e=>setSituation(e.target.value)} /> Sick/Weak</label>
          <label><input type="radio" name="situation" value="traffic" checked={situation==="traffic"} onChange={e=>setSituation(e.target.value)} /> Causing Traffic</label>
        </div>
        <label>Description (Optional, max 120 chars)</label>
        <textarea value={description} maxLength={120} onChange={e=>setDescription(e.target.value)} placeholder="E.g., limping, bleeding, near main road, etc." />
        <label>Live Photo <span className="required">*</span></label>
        <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} required />
        <button type="button" onClick={getLocation} style={{marginBottom:8}}>Capture Location</button>
        {location && <div className="loc-confirmed">📍 Location captured!</div>}
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Report"}</button>
        {submitMsg && <div className="submitmsg">{submitMsg}</div>}
      </form>
    </div>
  );
}