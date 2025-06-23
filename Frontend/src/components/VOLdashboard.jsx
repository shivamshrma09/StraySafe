import React, { useState } from 'react';
import "./VOLdashboard.css";
 
const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  password: '',
  confirmPassword: ''
};

export default function VOLdashboard() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setError('');
    setSuccess(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Valid email is required';
    if (!form.phone.match(/^\d{10}$/))
      newErrors.phone = '10-digit phone required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: "volunteer" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Signup failed');
        return;
      }
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Signup successful! You can now log in.</div>}
      <div>
        <label>First Name</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone Number" />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div>
        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </div>
      <div>
        <label>Password</label>
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      <div className='alredy'>
        <p>Already have an account?</p>
        <button className='h5' type="button" onClick={() => window.location.href = "/login"}>Login</button>
      </div>
    </form>
  );
}