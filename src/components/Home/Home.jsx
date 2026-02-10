import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import HomeLayout from "../../layouts/HomeLayouts";
import { FaFileAlt, FaSearch, FaUserShield, FaBell } from "react-icons/fa";

// images
import img1 from "./Images/hero.png";
import img2 from "./Images/hero2.webp";
import img3 from "./Images/image.png";

function Home() {

  const slides = [
    "Easy Complaint Registration",
    "Track Status in Real Time",
    "Fast Admin Resolution",
    "Transparent Student System"
  ];

  const images = [img1, img2, img3];

  const [textIndex, setTextIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(prev => (prev + 1) % slides.length);
      setImgIndex(prev => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [slides.length, images.length]);

  return (
    <HomeLayout>
      <div className="home-page">

        <section className="hero">
          <div className="hero-container">

            <div className="hero-left">

              <h1>
                Online Complaint <br /> Management System
              </h1>

              <p className="hero-slider">{slides[textIndex]}</p>

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
                src={images[imgIndex]}
                alt="hero"
                className="hero-image"
              />
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section className="about">
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
