import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = form.email.trim();
    const password = form.password;
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user?.role === "ngo") {
        window.location.href = "/NGOdashboard";
      } else if (data.user?.role === "admin") {
        window.location.href = "/AdminDashboard";
      } else if (data.user?.role === "volunteer" || data.user?.role === "VOL") {
        window.location.href = "/VOLdashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <div className="login-img-side">
        <img className="main-img" src="Singup.jpg" alt="Visual" loading="lazy" />
        <img className="logo-img" src="whatsapp.jpg" alt="Logo" loading="lazy" />
      </div>
      <div className="login-content">
        <div className="brand">StraySafe</div>
        <h2>Login to your account</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            autoFocus
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <span className="form-error">{error}</span>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-links">
          <span>
            Don&apos;t have an account?{' '}
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
