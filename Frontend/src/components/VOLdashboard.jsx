import React, { useState } from 'react';

export default function VOLdashboard() {
  const [imgData, setImgData] = useState(null);
  const [animalType, setAnimalType] = useState('');
  const [situation, setSituation] = useState('');
  const [otherSituation, setOtherSituation] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [location, setLocation] = useState({ lat: '', lng: '', timestamp: '' });
  const [captcha, setCaptcha] = useState('');

  // GPS लोकेशन
  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: new Date(pos.timestamp).toISOString(),
        });
      });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      photo: imgData,
      animalType,
      situation: situation === 'other' ? otherSituation : situation,
      description,
      name,
      contact,
      visibility,
      location,
      captcha,
    };
    console.log('Form data:', data);
    // यहाँ backend को भेजें
  };

  // Styles
  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '60px',
    background: '#2f855a',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
    boxShadow: '0 2px 8px #a0aec0',
    padding: '0 32px',
  };
  const brandStyle = {
    fontWeight: 'bold',
    fontSize: '1.4rem',
    letterSpacing: '1px',
    color: '#B56208',      // ← यही एक बार रखें, quotes के साथ
    marginLeft: '12px'
};

  const outerBg = {
    minHeight: '100vh',
    width: '100vw',
    background: '#f0fff4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingTop: '60px', // navbar की height के बराबर
  };
  const form = {
    width: '100%',
    maxWidth: '900px',
    margin: '40px auto 0 auto',
    padding: '32px',
    border: '1px solid #b2f5ea',
    borderRadius: '16px',
    background: '#fff',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 12px #c6f6d5',
  };
  const heading = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '18px',
    color: '#2f855a',
    textAlign: 'center',
  };
  const label = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#276749',
  };
  const input = {
    width: '100%',
    padding: '8px',
    marginBottom: '14px',
    borderRadius: '4px',
    border: '1px solid #cbd5e0',
    fontSize: '15px',
  };
  const textarea = {
    width: '100%',
    padding: '8px',
    marginBottom: '14px',
    borderRadius: '4px',
    border: '1px solid #cbd5e0',
    fontSize: '15px',
    resize: 'vertical',
  };
  const radioGroup = {
    display: 'flex',
    gap: '16px',
    marginBottom: '14px',
  };
  const radioLabel = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#276749',
    fontWeight: '500',
  };
  const button = {
    backgroundColor: '#38a169',
    color: 'white',
    padding: '12px 0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  };
  const mapPreview = {
    marginTop: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    height: '160px',
  };
  const charCount = {
    fontSize: '12px',
    color: '#4a5568',
    textAlign: 'right',
    marginTop: '-10px',
    marginBottom: '10px',
  };

  return (
    <div style={outerBg}>
      {/* Navbar */}
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="whatsapp.jpg" alt="Logo" style={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #38a169' }} />
          <span style={brandStyle}>StraySafe</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', fontSize: '1rem' }}>
          <span>About Us</span>
          <span>Home</span>
          <span>Completed </span>
          <span>Ongoin</span>
          <img src="man.jpg" alt="profile" style={{ height: 32, width: 32, borderRadius: '50%' }} />
          <button style={{
            background: 'white',
            color: '#2f855a',
            border: 'none',
            borderRadius: '6px',
            padding: '7px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #c6f6d5',
            marginLeft: '8px',
          }}>Log Out</button>
        </div>
      </nav>

      {/* Form */}
      <form style={form} onSubmit={handleSubmit}>
        <h2 style={heading}>Report a Stray Animal</h2>

        {/* Photo Upload */}
        <label style={label}>
          Photo <span style={{ color: 'red' }}>*</span>
        </label>
        {!imgData ? (
          <input
            type="file"
            accept="image/*"
            capture="environment"
            required
            onChange={handlePhoto}
            style={input}
          />
        ) : (
          <>
            <img src={imgData} alt="Uploaded" style={{ width: '100%', borderRadius: '6px', marginBottom: '10px' }} />
            <button type="button" onClick={() => setImgData(null)} style={{ ...button, background: '#e53e3e' }}>
              Retake Photo
            </button>
          </>
        )}

        {/* GPS Location */}
        <label style={label}>
          Location <span style={{ color: 'red' }}>*</span>
        </label>
        <button type="button" onClick={handleGetLocation} style={{ ...button, width: 'auto', marginBottom: '10px', padding: '8px 18px', fontSize: '14px' }}>
          Auto-Fetch Location
        </button>
        {location.lat && location.lng && (
          <>
            <div style={{ marginBottom: '8px', color: '#276749' }}>
              Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
              <br />
              Timestamp: {location.timestamp}
            </div>
            <iframe
              title="map"
              style={mapPreview}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
            />
          </>
        )}

        {/* Animal Type */}
        <label style={label}>
          Animal Type <span style={{ color: 'red' }}>*</span>
        </label>
        <div style={radioGroup}>
          {['dog', 'cow', 'other'].map((type) => (
            <label key={type} style={radioLabel}>
              <input
                type="radio"
                name="animalType"
                value={type}
                required
                checked={animalType === type}
                onChange={() => setAnimalType(type)}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
        {animalType === 'other' && (
          <input
            type="text"
            placeholder="Specify animal type"
            value={otherSituation}
            onChange={(e) => setOtherSituation(e.target.value)}
            style={input}
            required
          />
        )}

        {/* Situation */}
        <label style={label}>
          Situation <span style={{ color: 'red' }}>*</span>
        </label>
        <select
          required
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          style={input}
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
            style={input}
            required
          />
        )}

        {/* Short Description */}
        <label style={label}>Short Description (optional)</label>
        <textarea
          maxLength={150}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textarea}
          placeholder="E.g., limping, stuck in drain, etc."
        />
        <div style={charCount}>{description.length}/150</div>

        {/* Name and Contact */}
        <label style={label}>Your Name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
          placeholder="Autofill if logged in"
        />

        <label style={label}>Contact Info (optional)</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={input}
          placeholder="Email or phone"
        />

        {/* Visibility */}
        <label style={label}>Visibility</label>
        <div style={radioGroup}>
          {['private', 'ngo', 'anonymous'].map((vis) => (
            <label key={vis} style={radioLabel}>
              <input
                type="radio"
                name="visibility"
                value={vis}
                checked={visibility === vis}
                onChange={() => setVisibility(vis)}
              />
              {vis.charAt(0).toUpperCase() + vis.slice(1)}
            </label>
          ))}
        </div>

        {/* Captcha */}
        <label style={label}>Captcha</label>
        <input
          type="text"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          style={input}
          placeholder="Type the code shown"
          required
        />

        <button type="submit" style={button}>
          Submit Report
        </button>
      </form>
    </div>
  );
}
