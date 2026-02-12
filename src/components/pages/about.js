
import React from "react";
import {FaBullseye,FaEye,FaCheckCircle} from "react-icons/fa";
import "./about.css";
import HomeLayout from "../../layouts/HomeLayouts";
function About() {
  return (
    <HomeLayout>
    <section className="about-page">
      <h1>About Ecomplaintsportal</h1>

      <p className="subtitle">
        Ecomplaintsportal is a smart digital complaint management system
        designed to simplify complaint submission, monitoring, and resolution.
      </p>

      <div className="card">
        <h2>Our Platform</h2>
        <h3><FaCheckCircle className="icon" /> Key Features</h3>
<h3><FaBullseye className="icon" /> Our Mission</h3>
<h3><FaEye className="icon" /> Our Vision</h3>
        <p>
          The system allows users to register complaints online, track
          real-time status updates, and communicate with administrators
          efficiently. Organizations benefit from structured complaint
          management and performance tracking tools.
        </p>

        <p>
          Our platform is suitable for colleges, government departments,
          corporate organizations, and customer support teams.
        </p>
      </div>

      <div className="card-container">
        <div className="info-card">
          <h3>🎯 Key Features</h3>
          <ul>
            <li>Online Complaint Registration</li>
            <li>Status Tracking System</li>
            <li>Secure Data Management</li>
            <li>User Dashboard</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🚀 Our Mission</h3>
          <p>
            To build a transparent and efficient digital ecosystem where
            users can voice issues and receive quick responses.
          </p>
        </div>

        <div className="info-card">
          <h3>🌍 Our Vision</h3>
          <p>
            To create a reliable complaint management solution that enhances
            communication and improves service quality.
          </p>
        </div>
      </div>
    </section>
    </HomeLayout>
  );
}

export default About;
