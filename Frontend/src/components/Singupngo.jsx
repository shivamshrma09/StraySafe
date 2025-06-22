import React, { useState } from "react";
import "./Singupvol.css";

const SignupForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Valid email is required";
    if (!form.phone.match(/^\d{10}$/))
      newErrors.phone = "10-digit phone required";
    if (!form.gender) newErrors.gender = "Gender required";
    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onSubmit) onSubmit(form);
      // setForm({ ...initialState }); // Reset if needed
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
        <h2>← Sign up as Volunteer</h2>
        <p>Join us to help stray animals and make a difference in your community!</p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
       
        <div className="form-row">
          <div>
            <label>NGO Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div>
            <label>Registretion Number</label>
            <input
              name="Registrationnumber"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Reg. Number"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
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
          {/* <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select> */}
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

        <div className='alredy'>
        <p>Already have an account?</p>
        <button className='h5' type="button">Login</button>
        <button className='button1'>Next</button>
         <button type="submit">Sign Up</button>
      </div>
      </form>
    </div>
  );
};

export default SignupForm;
