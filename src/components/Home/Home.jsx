import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import HomeLayout from "../../layouts/HomeLayouts";
import { FaFileAlt, FaSearch, FaUserShield, FaBell } from "react-icons/fa";

import img1 from "./Images/hero.png";
import img2 from "./Images/hero2.webp";
import img3 from "./Images/image.png";

const images = [img1, img2, img3];

function Home() {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);


  return (
    <HomeLayout>
      <div className="home-page">

        {/* HERO */}
        <section className="hero">
          <div className="hero-container">

            <div className="hero-left">
              <h1>Online Complaint Management System</h1>

              <ul className="hero-points">
                <li>✔ Easy complaint registration</li>
                <li>✔ Real-time tracking</li>
                <li>✔ Fast admin resolution</li>
                <li>✔ Transparent & paperless</li>
              </ul>

              <div className="hero-buttons">
                <Link to="/complaint" className="primary-btn">
                  Register Complaint
                </Link>
                <Link to="/track" className="track-btn">
  Track Status
</Link>

              </div>
            </div>

           <div className="hero-right">
  <img
    key={imgIndex}
    src={images[imgIndex]}
    alt="hero"
    className="hero-image fade-slide"
  />
</div>


          </div>
        </section>

        {/* ABOUT */}
        <section>
          <h2>About the System</h2>
          <div className="card-grid">

            <div className="card">
              <FaFileAlt className="card-icon"/>
              <h3>Register Complaints</h3>
              <p>Submit issues easily online.</p>
            </div>

            <div className="card">
              <FaSearch className="card-icon"/>
              <h3>Track Complaints</h3>
              <p>Monitor status in real time.</p>
            </div>

            <div className="card">
              <FaUserShield className="card-icon"/>
              <h3>Admin Dashboard</h3>
              <p>Manage complaints fast.</p>

            </div>

            <div className="card">
              <FaBell className="card-icon"/>
              <h3>Notifications</h3>
              <p>Instant updates to users.</p>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section>
          <h2>Why Use Our System?</h2>
          <div className="features-grid">
            <div className="feature-box">⚡ Fast Processing</div>
            <div className="feature-box">🔒 Secure Platform</div>
            <div className="feature-box">📊 Smart Dashboard</div>
            <div className="feature-box">🌍 Accessible Anywhere</div>
          </div>
        </section>

        {/* STEPS */}
        <section className="steps">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step"><span>1</span> Register complaint</div>
            <div className="step"><span>2</span> Assigned to admin</div>
            <div className="step"><span>3</span> Resolution process</div>
            <div className="step"><span>4</span> Notification sent</div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="stats-grid">
            <div className="stat"><h3>10k+</h3><p>Complaints</p></div>
            <div className="stat"><h3>98%</h3><p>Resolved</p></div>
            <div className="stat"><h3>24h</h3><p>Response</p></div>
            <div className="stat"><h3>5k+</h3><p>Students</p></div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="testimonial">
          <blockquote>
            “Fast, transparent, and reliable complaint handling.”
          </blockquote>
          <p>- Student Feedback</p>
        </section>

      </div>
    </HomeLayout>
  );
}

export default Home;
