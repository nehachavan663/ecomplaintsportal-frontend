import "./Home.css";
import heroImage from "./Images/hero.png";

import {
  FaFileAlt,
  FaSearch,
  FaUserShield,
  FaBell,
  FaRegFileAlt,
} from "react-icons/fa";

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="logo">
          <FaRegFileAlt className="logo-icon" />
          <span>ecomplaintsportal.com</span>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="#about">About</a>

          <button className="nav-link">Contact</button>
          <button className="nav-link">Login</button>

          <button className="nav-btn">Register</button>
        </nav>

      </header>


      {/* HERO */}
      <section className="hero">

        <div className="hero-container">

          {/* LEFT */}
          <div className="hero-left">

            <h1>
              Online Complaint <br /> Management System
            </h1>

            <p className="hero-sub">
              A centralized platform that helps students submit complaints,
              track status, and get faster resolution in a transparent way.
            </p>

            <ul className="hero-points">
              <li>✔ Easy online complaint registration</li>
              <li>✔ Real-time complaint tracking</li>
              <li>✔ Faster admin resolution</li>
              <li>✔ Paperless and transparent system</li>
            </ul>

            <div className="hero-buttons">
              <button className="primary-btn">Register Complaint</button>
              <button className="secondary-btn">Track Status</button>
            </div>

          </div>


          {/* RIGHT */}
          <div className="hero-right">
            <img
              src={heroImage}
              alt="Complaint Management Illustration"
              className="hero-image"
            />
          </div>

        </div>

      </section>


      {/* ABOUT */}
      <section className="about" id="about">

        <h2>About the System</h2>

        <div className="card-grid">

          <div className="card">
            <FaFileAlt className="card-icon" />
            <h3>Register Complaints</h3>
            <p>Students can submit complaints easily.</p>
          </div>

          <div className="card">
            <FaSearch className="card-icon" />
            <h3>Track Complaints</h3>
            <p>Track complaint status in real time.</p>
          </div>

          <div className="card">
            <FaUserShield className="card-icon" />
            <h3>Admin Dashboard</h3>
            <p>Admins manage complaints efficiently.</p>
          </div>

          <div className="card">
            <FaBell className="card-icon" />
            <h3>Notifications</h3>
            <p>Instant status updates.</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-section">
            <h4>Online Complaint System</h4>
            <p>Simple & transparent complaint handling.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Info</h4>
            <p>Academic Project</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>

            <div className="social-icons">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

            </div>

          </div>

        </div>


        <div className="footer-bottom">
          © 2026 Online Complaint Management System
        </div>

      </footer>

    </div>
  );
}

export default Home;
