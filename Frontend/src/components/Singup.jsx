import React from "react";
import "./Singup.css";

export default function Singup() {
  // Navigation (replace with useNavigate from react-router-dom if you use it)
  const handleVolunteerSignup = () => {
    window.location.href = "/signupvol";
  };
  const handleNGOSignup = () => {
    window.location.href = "/signupngo";
  };
  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="box">
      <div className="cowimg">
        <img className="main-img" src="Singup.jpg" alt="Signup Visual" />
        <img className="logo-img" src="whatsapp.jpg" alt="Company Logo" />
      </div>

      <h4 className="h4">StraySafe</h4>

      <div className="content">
        <h2>Create a new account</h2>
        <p>
          Create your StraySafe account to join a community
          <br />
          working for animal safety. Start reporting,
          <br />
          tracking, and making a positive impact today.
        </p>
      </div>

      <button className="volentier" onClick={handleVolunteerSignup}>
        <img
          className="img1"
          src="volenteer-removebg-preview.png"
          alt="Volunteer"
        />
        <h2>Sign up as a Volunteer</h2>
        <img
          className="img2"
          src="yes-removebg-preview.png"
          alt="Selected"
        />
      </button>

      <button className="volentier2" onClick={handleNGOSignup}>
        <img
          className="img1"
          src="ngo-removebg-preview.png"
          alt="NGO"
        />
        <h2>Sign up as a NGO</h2>
        <img
          className="img2"
          src="yes-removebg-preview.png"
          alt="Selected"
        />
      </button>

      <div className="alredy">
        <p>Already have an account?</p>
        <button className="h5" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}