import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h4>Online Complaint System</h4>
          <p>Simple & transparent complaint handling platform.</p>
        </div>

        {/* QUICK ACCESS */}
        <div className="footer-section">
          <h4>Quick Access</h4>
          <ul className="footer-links">

            <li>
              <a href="/about">About Us</a>
            </li>

            <li>
              <a href="/contact">Contact Us</a>
            </li>

            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>

            <li>
              <a href="/help">Help</a>
            </li>

          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div className="footer-section">
          <h4>Follow Us</h4>

          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Online Complaint Management System
      </div>

    </footer>
  );
}

export default Footer;
