import React, { useState } from "react";
import "./Singupngo.css";

const Singupngo = () => {
  const [form, setForm] = useState({
    ngoName: "",
    regNumber: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.ngoName.trim()) newErrors.ngoName = "NGO Name is required";
    if (!form.regNumber.trim()) newErrors.regNumber = "Registration number is required";
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Valid email is required";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "10-digit phone required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.ngoName,
          lastName: form.regNumber,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          password: form.password,
          role: "ngo"
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Signup failed");
        setSuccess(false);
        return;
      }
      setSuccess(true);
      setApiError("");
    } catch (err) {
      setApiError("Network error");
      setSuccess(false);
    }
  };

  return (
    <div className="box">
      <div className="cowimg">
        <img className="main-img" src="Singup.jpg" alt="Signup Visual" />
        <img className="logo-img" src="whatsapp.jpg" alt="Company Logo" />
      </div>
      <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="signup-header">
          <button
            className="signup-arrow"
            type="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            &#8592;
          </button>
          <h2 style={{ margin: 0 }}>Sign up as NGO</h2>
        </div>
        <div className="form-row">
          <div style={{ flex: 1 }}>
            <label>NGO Name</label>
            <input
              name="ngoName"
              value={form.ngoName}
              onChange={handleChange}
              type="text"
              placeholder="NGO Name"
            />
            {errors.ngoName && <span className="error">{errors.ngoName}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <label>Registration Number</label>
            <input
              name="regNumber"
              value={form.regNumber}
              onChange={handleChange}
              type="text"
              placeholder="Reg. Number"
            />
            {errors.regNumber && <span className="error">{errors.regNumber}</span>}
          </div>
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone Number"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="gender-row">
          <label>Gender</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
            /> Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={form.gender === "other"}
              onChange={handleChange}
            /> Other
          </label>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <div className="alredy">
          <p>Already have an account?</p>
          <button
            className="h5"
            type="button"
            style={{
              background: "none",
              color: "#1976d2",
              padding: 0,
              fontWeight: 500,
              border: "none",
              borderRadius: 0,
              cursor: "pointer"
            }}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
        <button type="submit">Next</button>
        {apiError && <div className="error">{apiError}</div>}
        {success && <div className="success">Signup successful! You can now log in.</div>}
      </form>
    </div>
  );
};

export default Singupngo;
