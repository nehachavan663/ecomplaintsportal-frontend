import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./Home.css";
import HomeLayout from "../../layouts/HomeLayouts";
import { FaFileAlt, FaSearch, FaUserShield, FaBell } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
  // ✅ ADD THIS

import img1 from "./Images/hero.png";
import img2 from "./Images/hero2.webp";
import img3 from "./Images/image.png";


const images = [img1, img2, img3];

function Home() {
  const isLoggedIn = localStorage.getItem("user");
const navigate = useNavigate();

const url = "https://ecomplaintsportal-backend.onrender.com/api/admin/dashboard";

// ✅ FIRST define stats
const [stats, setStats] = useState(() => {
  const saved = sessionStorage.getItem("stats");
  return saved
    ? JSON.parse(saved)
    : {
        total: 0,
        resolved: 0,
        studentCount: 0,
        resolvedPercentage: 0
      };
});

// ✅ THEN use it here
const prevStatsRef = useRef({
  total: 0,
  resolvedPercentage: 0,
  studentCount: 0
});

// ✅ then this
const [displayStats, setDisplayStats] = useState({
  total: 0,
  resolvedPercentage: 0,
  studentCount: 0
});
useEffect(() => {
  const start = prevStatsRef.current; // ✅ stable previous value
  const end = stats;

  // skip if same
  if (
    start.total === end.total &&
    start.studentCount === end.studentCount &&
    start.resolvedPercentage === end.resolvedPercentage
  ) {
    return;
  }

const duration = 1400;
const steps = 40;
  const intervalTime = duration / steps;

  let step = 0;

  const interval = setInterval(() => {
    step++;

const progress = step / steps;

// 🔥 smooth ease-out animation
const easeOut = 1 - Math.pow(1 - progress, 3);

setDisplayStats({
  total: Math.floor(start.total + (end.total - start.total) * easeOut),
  resolvedPercentage: Math.floor(
    start.resolvedPercentage +
      (end.resolvedPercentage - start.resolvedPercentage) * easeOut
  ),
  studentCount: Math.floor(
    start.studentCount +
      (end.studentCount - start.studentCount) * easeOut
  )
});

    if (step >= steps) {
      clearInterval(interval);
      setDisplayStats(end);
      prevStatsRef.current = end; // ✅ update ref
    }
  }, intervalTime);

  return () => clearInterval(interval);
}, [stats]);
// later use it
const fetchStats = async () => {
  try {
    const res = await axios.get(url, {
      params: { t: new Date().getTime() },
      headers: {
        "Cache-Control": "no-cache"
      }
    });

    const total = res.data.total || 0;
    const resolved = res.data.resolved || 0;

    const newStats = {
      total,
      resolved,
      studentCount: res.data.studentCount || 0,
      resolvedPercentage: total
        ? Math.round((resolved / total) * 100)
        : 0
    };

    // 🔥 prevent old overwrite
    setStats((prev) => {
      if (total < prev.total) return prev;
      return newStats;
    });

    // 🔥 save for fast reload
    sessionStorage.setItem("stats", JSON.stringify(newStats));

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchStats(); // first call

  // 🔥 ADD THIS (VERY IMPORTANT)
  const timer = setTimeout(() => {
    fetchStats(); // second call (gets latest data)
  }, 2000);

  return () => clearTimeout(timer);
}, []);
const handleProtectedNav = (path) => {
  if (!isLoggedIn) {
    Swal.fire({
      title: "🔐 Login Required",
      text: "You need to login before accessing this feature",
      icon: "info",
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#38b764"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  } else {
    navigate(path);
  }
}; const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);
useEffect(() => {
  const handleUpdate = () => {
    fetchStats(); // 🔥 instant refresh
  };

  window.addEventListener("statsUpdated", handleUpdate);

  return () => window.removeEventListener("statsUpdated", handleUpdate);
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
  <button
    className="primary-btn"
    onClick={() => handleProtectedNav("/complaint")}
  >
    Register Complaint
  </button>

  <button
    className="track-btn"
    onClick={() => handleProtectedNav("/track")}
  >
    Track Status
  </button>
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
<section>
  <h2>Why Use Our System?</h2>
  <div className="features-grid">

    <div className="feature-box">
      ⚡ Fast Processing
      <div className="scroll-box">
        <p>
          Complaints are routed instantly to the correct authority.
          Automated system reduces waiting time.
          Quick handling improves student satisfaction.
          Smart workflow ensures smooth operation.
        </p>
      </div>
    </div>

    <div className="feature-box">
      🔒 Secure Platform
      <div className="scroll-box">
        <p>
          Strong data protection and secure login system.
          Encrypted communication prevents misuse.
          Privacy of students is maintained.
          Reliable and safe complaint handling.
        </p>
      </div>
    </div>

    <div className="feature-box">
      📊 Smart Dashboard
      <div className="scroll-box">
        <p>
          Real-time analytics for administrators.
          Clear monitoring of pending complaints.
          Organized dashboard improves efficiency.
          Better decisions through smart tracking.
        </p>
      </div>
    </div>

    <div className="feature-box">
      🌍 Accessible Anywhere
      <div className="scroll-box">
        <p>
          Works across mobile and desktop devices.
          Students can submit complaints anytime.
          No location restrictions.
          Easy access improves usability.
        </p>
      </div>
    </div>

  </div>
</section>


  <section className="steps">
  <h2>How It Works</h2>
  <div className="steps-grid">

    <div className="step">
      <span>1</span>
      <div className="scroll-box">
        <p>
          Student submits complaint through portal.
          System records details automatically.
          Ticket is generated instantly.
          Tracking begins immediately.
        </p>
      </div>
    </div>

    <div className="step">
      <span>2</span>
      <div className="scroll-box">
        <p>
          Complaint assigned to responsible admin.
          Authority receives notification.
          Work starts without delay.
          Progress is logged in system.
        </p>
      </div>
    </div>

    <div className="step">
      <span>3</span>
      <div className="scroll-box">
        <p>
          Admin reviews and resolves issue.
          Dashboard tracks resolution status.
          Student monitors progress live.
          Efficient workflow ensures completion.
        </p>
      </div>
    </div>

    <div className="step">
      <span>4</span>
      <div className="scroll-box">
        <p>
          Final update sent to student.
          Notification confirms closure.
          Feedback option available.
          Process ends transparently.
        </p>
      </div>
    </div>

  </div>
</section>
{/* STATS */}
<section className="stats">
 

<div className="stats-container">

  <div className="stat-box">
   <h2>{displayStats.total}</h2>
    <p>Complaints</p>
  </div>

  <div className="stat-box">
    <h2>{displayStats.resolvedPercentage|| 0}%</h2>
    <p>Resolved</p>
  </div>

  <div className="stat-box">
    <h2>24h</h2>
    <p>Response</p>
  </div>

  <div className="stat-box">
    <h2>{displayStats.studentCount|| 0}+</h2>
    <p>Students</p>
  </div>

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
