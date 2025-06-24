import React from "react";
import "./Singup.css";

export default function Singup() {
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
    <div className="signup-outer">
      <div className="signup-card">
        <div className="signup-imgside">
          <div className="signup-img-brand">
            <img src="whatsapp.jpg" alt="Logo" className="signup-logo" />
            <span className="signup-brand">StraySafe</span>
          </div>
          <img src="Singup.jpg" alt="Cow" className="signup-cowimg" />
        </div>
        <div className="signup-formside">
          <h2 className="signup-title">Create a new account</h2>
          <p className="signup-desc">
            Create your StraySafe account to join a community<br />
            working for animal safety. Start reporting,<br />
            tracking, and making a positive impact today.
          </p>
          <button className="signup-btn-primary" onClick={handleVolunteerSignup}>
            Sign up as a Volunteer
          </button>
          <button className="signup-btn-outline" onClick={handleNGOSignup}>
            Sign up as an NGO
          </button>
          <div className="signup-bottom-row">
            <span>
              Already have an account?{" "}
              <span className="signup-login-link" onClick={handleLogin}>
                Login
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
