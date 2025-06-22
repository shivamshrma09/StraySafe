import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic Validation
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required!");
      return;
    }
    // TODO: Add your login logic here
    alert("Login Success!\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div className="login-box">
      <div className="login-img-side">
        <img className="main-img" src="Singup.jpg" alt="Visual" />
        <img className="logo-img" src="whatsapp.jpg" alt="Logo" />
      </div>
      <div className="login-content">
        <h4 className="brand">StraySafe</h4>
        <h2>Login to your account</h2>
        <p>Welcome back! Please login to continue.</p>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            autoFocus
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {error && <span className="form-error">{error}</span>}
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <span>
            Don't have an account?{" "}
            <a href="/signup" className="link">
              Sign Up
            </a>
          </span>
          <span>
            <a href="/forgot" className="link">
              Forgot password?
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
