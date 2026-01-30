import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroImage from "./Images/hero.png";
import HomeLayout from "../../layouts/HomeLayouts";
import {
  FaFileAlt,
  FaSearch,
  FaUserShield,
  FaBell,
} from "react-icons/fa";

function Home() {
  return (
    <HomeLayout>
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-container">

          <div className="hero-left">
            <h1>
              Online Complaint <br /> Management System
            </h1>

            <p className="hero-sub">
              A centralized platform to submit complaints, track status,
              and get faster resolution in a transparent way.
            </p>

            <ul className="hero-points">
              <li>✔ Easy online complaint registration</li>
              <li>✔ Real-time complaint tracking</li>
              <li>✔ Faster admin resolution</li>
              <li>✔ Paperless & transparent system</li>
            </ul>

            <div className="hero-buttons">
              <Link to="/complaint" className="primary-btn">
                Register Complaint
              </Link>

              <Link to="/track" className="secondary-btn">
                Track Status
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <img
              src={heroImage}
              alt="Complaint Management"
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

    </div>
    </HomeLayout>
  );
}

export default Home;
