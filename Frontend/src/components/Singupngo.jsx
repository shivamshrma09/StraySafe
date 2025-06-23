import React, { useState } from "react";
import "./Singupngo.css";

const Singupngo = () => {
  const [form, setForm] = useState({
    ngoName: "",
    regNumber: "",
    email: "",
    phone: "",
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
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Valid email is required";
    if (!form.phone.match(/^\d{10}$/))
      newErrors.phone = "10-digit phone required";
    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
          ngoName: form.ngoName,
          regNumber: form.regNumber,
          email: form.email,
          phone: form.phone,
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
      // Optionally: window.location.href = "/login";
    } catch (err) {
      setApiError("Network error");
      setSuccess(false);
    }
  };

  return (
    <div className='box'>
      <div className="cowimg">
        <img className="main-img" src="Singup.jpg" alt="Signup Visual" />
        <img className="logo-img" src="whatsapp.jpg" alt="Company Logo" /> 
      </div>
      <h4 className='h4'>StraySafe</h4>
      <div className='content'>
        <h2>← Sign up as NGO</h2>
        <p>Join us to help stray animals and make a difference in your community!</p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-row">
          <div>
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
          <div>
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
          <label>Organisation Email</label>
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
          <label>Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone Number"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
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
        <div className='alredy'>
          <p>Already have an account?</p>
          <button className='h5' type="button" onClick={()=>window.location.href="/login"}>Login</button>
        </div>
        <button type="submit">Sign Up</button>
        {apiError && <div className="error">{apiError}</div>}
        {success && <div className="success">Signup successful! You can now log in.</div>}
      </form>
    </div>
  );
};

export default Singupngo;