// ✅ Updated Homepage.jsx
import React, { useState, useEffect } from "react";
import "./Homepage.css";

export default function Homepage() {
  const handleReportNow = () => window.location.href = "/report";
  const handleLearnMore = () => window.location.href = "/about";
  const handleLogin = () => window.location.href = "/login";
  const handleSignUp = () => window.location.href = "/signup";

  const [animalsReported, setAnimalsReported] = useState(0);
  const [rescued, setRescued] = useState(0);
  const [volunteers, setVolunteers] = useState(0);
  const [ngos, setNgos] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t * (2 - t);
    let frame = 0;
    const animate = () => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      setAnimalsReported(Math.floor(progress * 420));
      setRescued(Math.floor(progress * 310));
      setVolunteers(Math.floor(progress * 1200));
      setNgos(Math.floor(progress * 20));
      if (frame < totalFrames) requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="leftnav">
          <img src="whatsapp.jpg" alt="Whatsapp" />
          <span className="brand">StraySafe</span>
        </div>
        <div className="rightnav">
          <ul>
            <li>Home</li>
            <li>How it works</li>
            <li onClick={handleLogin}>Login</li>
            <li><button className="signup-btn" onClick={handleSignUp}>SignUp</button></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>Be the Voice for the Voiceless.<br />Report, Rescue, Repeat</h1>
            <p>StraySafe lets you quickly alert NGOs about stray animals with proof and location.</p>
            <div className="hero-btns">
              <button className="primary-btn" onClick={handleReportNow}>Report Now</button>
              <button className="primary-btn1" onClick={handleLearnMore}>Learn More</button>
            </div>
          </div>
          <div className="hero-images">
            <img src="image1.jpg" className="img1" alt="Dog" />
            <img src="image2.jpg" className="img2" alt="Volunteers" />
            <img src="image3.jpg" className="img3" alt="Rescue" />
          </div>
        </section>

        <section className="howitworks">
          <h2>How It Works</h2>
          <p>Reporting is easy—just capture a live photo, auto-share your location, and submit.</p>
          <div className="steps">
            <div className="step">
              <img src="step1.jpg" alt="Step 1" />
              <div className="step-num">1</div>
              <h4>Spot & Capture</h4>
              <p>Instantly capture a live photo and start your report.</p>
            </div>
            <div className="step">
              <img src="step2.jpg" alt="Step 2" />
              <div className="step-num">2</div>
              <h4>Submit Location & Proof</h4>
              <p>Auto-add your location & submit proof with one click.</p>
            </div>
            <div className="step">
              <img src="step3.jpg" alt="Step 3" />
              <div className="step-num">3</div>
              <h4>Rescue & Help</h4>
              <p>NGO teams act fast and help animals immediately.</p>
            </div>
          </div>
        </section>

        <section className="tracking">
          <h2>Track Reports Live</h2>
          <div className="tracking-content">
            <div className="live-map-placeholder">
              <p>Interactive map coming soon...</p>
            </div>
            <ul>
              <li><strong>📍 Real-Time Reports:</strong> See all reports from your city instantly.</li>
              <li><strong>📍 Track Progress:</strong> Know where action has been taken.</li>
              <li><strong>📍 Fast Access:</strong> Easy access for NGOs and Volunteers.</li>
            </ul>
          </div>
        </section>

        <section className="proof-security">
          <h2>How We Prevent Fake Reports</h2>
          <ul>
            <li>📸 Live camera photo-only uploads</li>
            <li>⏰ EXIF timestamp checks</li>
            <li>📍 GPS cross-verification</li>
            <li>📌 Animal zone proximity check</li>
            <li>🚫 Anti-spam rate limiting</li>
          </ul>
        </section>

        <section className="ourwork-section">
          <h2 className="ourwork-title">Our Work</h2>
          <p className="ourwork-desc">Making cities safer for all with each report.</p>
          <div className="ourwork-row">
            <div className="ourwork-card">
              <div className="ourwork-icon">🐾 <span>{animalsReported}+</span></div>
              <div className="ourwork-label animals">Animals Reported</div>
              <div className="ourwork-subtext">Reported cases by citizens.</div>
            </div>
            <div className="ourwork-card">
              <div className="ourwork-icon">❤️🐾 <span>{rescued}+</span></div>
              <div className="ourwork-label rescued">Rescued</div>
              <div className="ourwork-subtext">Animals saved by NGOs.</div>
            </div>
            <div className="ourwork-card">
              <div className="ourwork-icon">👥 <span>{volunteers}+</span></div>
              <div className="ourwork-label volunteers">Volunteers</div>
              <div className="ourwork-subtext">Active supporters across India.</div>
            </div>
            <div className="ourwork-card">
              <div className="ourwork-icon">🤝 <span>{ngos}+</span></div>
              <div className="ourwork-label ngos">NGOs</div>
              <div className="ourwork-subtext">Trusted rescue partners.</div>
            </div>
          </div>
        </section>

        <section className="partners">
          <h2>Partner NGOs</h2>
          <div className="partner-logos">
            <img src="ngo1.jpg" alt="NGO1" />
            <img src="ngo2.jpg" alt="NGO2" />
            <img src="ngo3.jpg" alt="NGO3" />
            <img src="ngo4.jpg" alt="NGO4" />
            <img src="ngo5.jpg" alt="NGO5" />
            <img src="ngo6.jpg" alt="NGO6" />
          </div>
          <p>Our trusted partners ensure every animal gets the help it needs.</p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-cols">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Report</li>
              <li>Track Rescue</li>
              <li>Join NGO/Volunteer</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
              <li>Transparency</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Email: support@straysafe.org</li>
              <li>Phone: +91-8368296406</li>
              <li>Delhi, India</li>
              <li>www.straysafe.org</li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <ul>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <h3>About Us</h3>
          <p>StraySafe enables citizens to report stray animals causing traffic or requiring help. We connect reports to NGOs, ensure rescue proof, and track status.</p>
          <div className="footer-mission">
            <strong>Mission</strong>
            <p>Empower citizens to act, protect animals, and build smarter, safer cities.</p>
          </div>
          <div className="footer-copyright">
            © 2025 StraySafe. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
