import React from "react";
import "./Footer.css";

import {
  FaInfoCircle,
  FaPhoneAlt,
  FaShieldAlt,
  FaQuestionCircle,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* SECTION 1 */}
        <div className="footer-section">
          <h4>Online Complaint System</h4>
          <p>
            Simple & transparent complaint handling platform for students.
          </p>
        </div>

        {/* QUICK ACCESS */}
        <div className="footer-section">
          <h4>Quick Access</h4>

          <ul className="footer-links">

            <li>
              <FaInfoCircle />
              <a href="/about">About Us</a>
            </li>

            <li>
              <FaPhoneAlt />
              <a href="/contact">Contact Us</a>
            </li>

            <li>
              <FaShieldAlt />
              <a href="/privacy-policy">Privacy Policy</a>
            </li>

            <li>
              <FaQuestionCircle />
              <a href="/help">Help</a>
            </li>

          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <h4>Follow Us</h4>

          <div className="social-icons">

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
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
