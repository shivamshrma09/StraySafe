import React, { useState } from "react";
import "./Singupvol.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
};

const Singupvol = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
    setSuccess(false);
  };

  const handleGender = (gender) => {
    setForm({ ...form, gender });
    setErrors({ ...errors, gender: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Valid email is required";
    if (!form.phone.match(/^\d{10}$/))
      newErrors.phone = "10-digit phone required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          password: form.password,
          role: "volunteer",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Signup failed");
        setSuccess(false);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setApiError("");
      setForm(initialForm);
    } catch (err) {
      setApiError("Network error");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-box">
      <div className="signup-img-section">
        <div className="signup-logo-row">
          <img src="whatsapp.jpg" alt="StraySafe Logo" className="signup-logo" />
          <span className="signup-brand">StraySafe</span>
        </div>
        <img className="signup-main-img" src="Singup.jpg" alt="Cow" />
      </div>
      <form className="signup-form-section" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="signup-title">
          <span className="signup-arrow">&#8592;</span> Sign up as Volunteer
        </h2>
        <div className="signup-row">
          <div className="signup-field">
            <label>First Name*</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              autoComplete="off"
            />
            {errors.firstName && <span className="signup-error">{errors.firstName}</span>}
          </div>
          <div className="signup-field">
            <label>Last name*</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              autoComplete="off"
            />
            {errors.lastName && <span className="signup-error">{errors.lastName}</span>}
          </div>
        </div>
        <div className="signup-field">
          <label>Email*</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          {errors.email && <span className="signup-error">{errors.email}</span>}
        </div>
        <div className="signup-field">
          <label>Phone*</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone"
            autoComplete="off"
          />
          {errors.phone && <span className="signup-error">{errors.phone}</span>}
        </div>
        <div className="signup-field">
          <label>Gender *</label>
          <div className="signup-gender-group">
            <button
              type="button"
              className={form.gender === "male" ? "gender-btn selected" : "gender-btn"}
              onClick={() => handleGender("male")}
            >
              Male
            </button>
            <button
              type="button"
              className={form.gender === "female" ? "gender-btn selected" : "gender-btn"}
              onClick={() => handleGender("female")}
            >
              Female
            </button>
            <button
              type="button"
              className={form.gender === "other" ? "gender-btn selected" : "gender-btn"}
              onClick={() => handleGender("other")}
            >
              Other
            </button>
          </div>
          {errors.gender && <span className="signup-error">{errors.gender}</span>}
        </div>
        <div className="signup-row">
          <div className="signup-field">
            <label>Password *</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            {errors.password && <span className="signup-error">{errors.password}</span>}
          </div>
          <div className="signup-field">
            <label>Confirm Password *</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="signup-error">{errors.confirmPassword}</span>}
          </div>
        </div>
        <div className="signup-actions-row">
          <span className="signup-login-text">
            Already have an account?{" "}
            <a href="/login" className="signup-login-link">Login</a>
          </span>
          <button type="submit" className="signup-next-btn" disabled={loading}>
            {loading ? "Signing up..." : "Next"}
          </button>
        </div>
        {apiError && <div className="signup-error">{apiError}</div>}
        {success && <div className="signup-success">Signup successful! You can now log in.</div>}
      </form>
    </div>
  );
};

export default Singupvol;