import React, { useState } from 'react';

function ReportStrayForm() {
  const [imgData, setImgData] = useState(null);
  const [animalType, setAnimalType] = useState('');
  const [otherAnimalType, setOtherAnimalType] = useState('');
  const [situation, setSituation] = useState('');
  const [otherSituation, setOtherSituation] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [location, setLocation] = useState({ lat: '', lng: '', timestamp: '' });
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // GPS लोकेशन
  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            timestamp: new Date(pos.timestamp).toISOString(),
          });
        },
        (err) => {
          setError("Failed to fetch location. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  };

  // फोटो अपलोड
  const handlePhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // फॉर्म सबमिट
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!imgData) {
      setError("Please upload a photo.");
      return;
    }
    if (!location.lat || !location.lng) {
      setError("Please fetch your location.");
      return;
    }
    let finalAnimalType = animalType === "other" ? otherAnimalType : animalType;
    let finalSituation = situation === "other" ? otherSituation : situation;
    if (!finalAnimalType) {
      setError("Please select or specify an animal type.");
      return;
    }
    if (!finalSituation) {
      setError("Please select or describe the situation.");
      return;
    }
    if (!captcha.trim()) {
      setError("Please enter the captcha.");
      return;
    }

    const data = {
      photo: imgData,
      animalType: finalAnimalType,
      situation: finalSituation,
      description,
      name,
      contact,
      visibility,
      location,
      captcha,
    };

    setSubmitting(true);
    try {
      // Replace the below with your API endpoint
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        setError(resData.message || "Failed to submit report.");
      } else {
        alert("Report submitted successfully!");
        // Optionally, reset form
        setImgData(null);
        setAnimalType('');
        setOtherAnimalType('');
        setSituation('');
        setOtherSituation('');
        setDescription('');
        setName('');
        setContact('');
        setVisibility('private');
        setLocation({ lat: '', lng: '', timestamp: '' });
        setCaptcha('');
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // CSS styles
  const styles = {
    form: {
      maxWidth: '500px',
      margin: '30px auto',
      padding: '24px',
      border: '1px solid #b2f5ea',
      borderRadius: '10px',
      background: '#f9fafb',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 12px #c6f6d5',
    },
    heading: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '18px',
      color: '#2f855a',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#276749',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '14px',
      borderRadius: '4px',
      border: '1px solid #cbd5e0',
      fontSize: '15px',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      marginBottom: '14px',
      borderRadius: '4px',
      border: '1px solid #cbd5e0',
      fontSize: '15px',
      resize: 'vertical',
    },
    radioGroup: {
      display: 'flex',
      gap: '16px',
      marginBottom: '14px',
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#276749',
      fontWeight: '500',
    },
    button: {
      backgroundColor: '#38a169',
      color: 'white',
      padding: '12px 0',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px',
    },
    mapPreview: {
      marginTop: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      width: '100%',
      height: '160px',
    },
    charCount: {
      fontSize: '12px',
      color: '#4a5568',
      textAlign: 'right',
      marginTop: '-10px',
      marginBottom: '10px',
    },
    error: {
      color: '#e53e3e',
      marginBottom: '10px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <h2 style={styles.heading}>Report a Stray Animal</h2>
      {error && <div style={styles.error}>{error}</div>}

      {/* Photo Upload */}
      <label style={styles.label}>
        Photo <span style={{ color: 'red' }}>*</span>
      </label>
      {!imgData ? (
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          required
          onChange={handlePhoto}
          style={styles.input}
        />
      ) : (
        <>
          <img src={imgData} alt="Uploaded" style={{ width: '100%', borderRadius: '6px', marginBottom: '10px' }} />
          <button type="button" onClick={() => setImgData(null)} style={{ ...styles.button, background: '#e53e3e' }}>
            Retake Photo
          </button>
        </>
      )}

      {/* GPS Location */}
      <label style={styles.label}>
        Location <span style={{ color: 'red' }}>*</span>
      </label>
      <button
        type="button"
        onClick={handleGetLocation}
        style={{ ...styles.button, width: 'auto', marginBottom: '10px', padding: '8px 18px', fontSize: '14px' }}
        disabled={submitting}
      >
        Auto-Fetch Location
      </button>
      {location.lat && location.lng && (
        <>
          <div style={{ marginBottom: '8px', color: '#276749' }}>
            Latitude: {Number(location.lat).toFixed(6)}, Longitude: {Number(location.lng).toFixed(6)}
            <br />
            Timestamp: {location.timestamp}
          </div>
          <iframe
            title="map"
            style={styles.mapPreview}
            loading="lazy"
            src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
          />
        </>
      )}

      {/* Animal Type */}
      <label style={styles.label}>
        Animal Type <span style={{ color: 'red' }}>*</span>
      </label>
      <div style={styles.radioGroup}>
        {['dog', 'cow', 'other'].map((type) => (
          <label key={type} style={styles.radioLabel}>
            <input
              type="radio"
              name="animalType"
              value={type}
              required
              checked={animalType === type}
              onChange={() => setAnimalType(type)}
              disabled={submitting}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
      {animalType === 'other' && (
        <input
          type="text"
          placeholder="Specify animal type"
          value={otherAnimalType}
          onChange={(e) => setOtherAnimalType(e.target.value)}
          style={styles.input}
          required
          disabled={submitting}
        />
      )}

      {/* Situation */}
      <label style={styles.label}>
        Situation <span style={{ color: 'red' }}>*</span>
      </label>
      <select
        required
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        style={styles.input}
        disabled={submitting}
      >
        <option value="">Select...</option>
        <option value="traffic">Causing traffic</option>
        <option value="injured">Injured/sick</option>
        <option value="unconscious">Unconscious</option>
        <option value="aggressive">Aggressive</option>
        <option value="trapped">Trapped</option>
        <option value="school_area">In school/hospital area</option>
        <option value="other">Other</option>
      </select>
      {situation === 'other' && (
        <input
          type="text"
          placeholder="Describe situation"
          value={otherSituation}
          onChange={(e) => setOtherSituation(e.target.value)}
          style={styles.input}
          required
          disabled={submitting}
        />
      )}

      {/* Short Description */}
      <label style={styles.label}>Short Description (optional)</label>
      <textarea
        maxLength={150}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
        placeholder="E.g., limping, stuck in drain, etc."
        disabled={submitting}
      />
      <div style={styles.charCount}>{description.length}/150</div>

      {/* Name and Contact */}
      <label style={styles.label}>Your Name (optional)</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        placeholder="Autofill if logged in"
        disabled={submitting}
      />

      <label style={styles.label}>Contact Info (optional)</label>
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={styles.input}
        placeholder="Email or phone"
        disabled={submitting}
      />

      {/* Visibility */}
      <label style={styles.label}>Visibility</label>
      <div style={styles.radioGroup}>
        {['private', 'ngo', 'anonymous'].map((vis) => (
          <label key={vis} style={styles.radioLabel}>
            <input
              type="radio"
              name="visibility"
              value={vis}
              checked={visibility === vis}
              onChange={() => setVisibility(vis)}
              disabled={submitting}
            />
            {vis.charAt(0).toUpperCase() + vis.slice(1)}
          </label>
        ))}
      </div>

      {/* Captcha */}
      <label style={styles.label}>Captcha <span style={{ color: 'red' }}>*</span></label>
      <input
        type="text"
        value={captcha}
        onChange={(e) => setCaptcha(e.target.value)}
        style={styles.input}
        placeholder="Type the code shown"
        required
        disabled={submitting}
      />

      <button type="submit" style={styles.button} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}

export default ReportStrayForm;