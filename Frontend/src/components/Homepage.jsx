import React from "react";
import "./Homepage.css";

export default function Homepage() {
  // Navigation button handlers (add routing if using react-router)
  const handleReportNow = () => {
    window.location.href = "/report"; // Update to your report page route
  };
  const handleLearnMore = () => {
    window.location.href = "/about"; // Update to your about page route
  };
  const handleLogin = () => {
    window.location.href = "/login";
  };
  const handleSignUp = () => {
    window.location.href = "/signup";
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="leftnav">
          <img src="whatsapp.jpg" alt="Whatsapp contact" />
          <span className="brand">StraySafe</span>
        </div>
        <div className="rightnav">
          <ul>
            <li>Home</li>
            <li>How it works</li>
            <li style={{ cursor: "pointer" }} onClick={handleLogin}>Login</li>
            <li>
              <button className="signup-btn" onClick={handleSignUp}>
                SignUp
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {/* Hero */}
        <section className="hero">
          <div className="hero-text">
            <h1>
              Be the Voice for the Voiceless.<br />
              Report, Rescue, Repeat
            </h1>
            <p>
              StraySafe lets you quickly alert NGOs about stray animals with proof and location.<br />
              No login, no hassle—just instant help, right when it matters.
            </p>
            <div className="hero-btns">
              <button className="primary-btn" onClick={handleReportNow}>
                Report Now
              </button>
              <button className="primary-btn1" onClick={handleLearnMore}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-images">
            <img src="image1.jpg" className="img1" alt="Rescued dog" loading="lazy" />
            <img src="image2.jpg" className="img2" alt="NGO volunteers" loading="lazy" />
            <img src="image3.jpg" className="img3" alt="Animal rescue" loading="lazy" />
          </div>
        </section>

        {/* How it Works */}
        <section className="howitworks">
          <h2>How It Works</h2>
          <p>
            Reporting is easy—just capture a live photo, auto-share your location, and submit.
            Our verified system ensures every alert reaches the right rescue teams, fast and reliably.
          </p>
          <div className="steps">
            <div className="step">
              <img src="step1.jpg" alt="Spot & Capture" loading="lazy" />
              <div className="step-num">1</div>
              <h4>Spot & Capture</h4>
              <p>See a stray animal on the street? Instantly capture a live photo and start your report on StraySafe.</p>
            </div>
            <div className="step">
              <img src="step2.jpg" alt="Submit Location & Proof" loading="lazy" />
              <div className="step-num">2</div>
              <h4>Submit Location & Proof</h4>
              <p>Automatically add your location from your phone and submit the report with the photo—just one click away.</p>
            </div>
            <div className="step">
              <img src="step3.jpg" alt="Rescue & Help" loading="lazy" />
              <div className="step-num">3</div>
              <h4>Rescue & Help</h4>
              <p>Your report reaches the NGO team immediately, who then rescue or provide help to the animal.</p>
            </div>
          </div>
        </section>

        {/* Track Reports Live */}
        <section className="tracking">
          <h2>Track Reports Live</h2>
          <div className="tracking-content">
            <img className="tracking-map" src="map.jpg" alt="Live reports map" loading="lazy" />
            <ul>
              <li>
                <strong>📍 View Real-Time Animal Reports:</strong> <br />
                See all stray animal cases reported by citizens in your city, updated instantly on the map.
              </li>
              <li>
                <strong>📍 Track Rescue Progress:</strong><br />
                Each pin shows where help is needed or where rescue action has already been taken—making the process transparent.
              </li>
              <li>
                <strong>📍 Quick Access for Rescue Teams:</strong><br />
                NGOs and volunteers can easily find and respond to new reports, ensuring faster help for animals in need.
              </li>
            </ul>
          </div>
        </section>

        {/* Our Work */}
        <section className="ourwork-section">
          <h2 className="ourwork-title">Our Work</h2>
          <p className="ourwork-desc">
            StraySafe’s impact grows with every report—hundreds of animals rescued, action volunteers, and strong NGO partnerships. Together, we’re making cities safer for all.
          </p>
          <div className="ourwork-row">
            <div className="ourwork-card">
              <div className="ourwork-icon">🐾 420+</div>
              <div className="ourwork-label animals">Animals Reported</div>
              <div className="ourwork-subtext">Citizens have reported over 420 stray animals in need.</div>
            </div>
            <div className="ourwork-card">
              <div className="ourwork-icon">❤️🐾 310+</div>
              <div className="ourwork-label rescued">Rescued</div>
              <div className="ourwork-subtext">Our partner NGOs have rescued and cared for 310+ animals.</div>
            </div>
            <div className="ourwork-card">
              <div className="ourwork-icon">👥 1200+</div>
              <div className="ourwork-label volunteers">Volunteers</div>
              <div className="ourwork-subtext">More than 1200 volunteers and NGOs are working together.</div>
            </div>
            <div className="ourwork-card">
              <div className="ourwork-icon">🤝 20+</div>
              <div className="ourwork-label ngos">NGOs</div>
              <div className="ourwork-subtext">20+ trusted NGOs collaborate for faster, better rescues.</div>
            </div>
          </div>
        </section>

        {/* Partner NGOs */}
        <section className="partners">
          <h2>Partner NGOs</h2>
          <div className="partner-logos">
            <img src="ngo1.jpg" alt="NGO1" loading="lazy" />
            <img src="ngo2.jpg" alt="NGO2" loading="lazy" />
            <img src="ngo3.jpg" alt="NGO3" loading="lazy" />
            <img src="ngo4.jpg" alt="NGO4" loading="lazy" />
            <img src="ngo5.jpg" alt="NGO5" loading="lazy" />
            <img src="ngo6.jpg" alt="NGO6" loading="lazy" />
          </div>
          <p>
            Our trusted NGO partners respond to your reports and ensure every animal gets the care it deserves. Collaboration is our strength.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-cols">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Report</li>
              <li>Track Rescue</li>
              <li>Join as NGO/Volunteer</li>
              <li>About StraySafe</li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Animal Privacy Policy</li>
              <li>Reporting Disclaimer</li>
              <li>Transparency Report</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Email: support@straysafe.org</li>
              <li>Phone: +91-8368296406</li>
              <li>Location: Delhi, India</li>
              <li>Website: www.straysafe.org</li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <ul>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Twitter (X)</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <h3>About Us</h3>
          <p>
            StraySafe is a civic-tech platform that enables citizens to report stray cows and dogs causing traffic or requiring help. We connect reports to verified NGOs, ensure rescue with proof, and track status transparently. Our goal is to create safer roads and secure shelter for strays through tech, trust, and teamwork.
          </p>
          <div className="footer-mission">
            <strong>Why We Stand Out</strong>
            <ul>
              <li>GPS & timestamp-based reports</li>
              <li>Verified NGOs only</li>
              <li>Rescue proof submission</li>
              <li>Real-time tracking</li>
              <li>Urban + rural compatible</li>
            </ul>
            <br />
            <strong>Mission</strong>
            <p>
              Empower citizens to act, protect animals, and build smarter, safer cities — together.
            </p>
          </div>
          <div className="footer-copyright">
            © 2025 StraySafe. All rights reserved. | A CivicTech Initiative for Safer Streets
          </div>
        </div>
      </footer>
    </>
  );
}