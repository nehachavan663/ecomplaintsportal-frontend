import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const profile = {
    name: "Admin User",
    email: "admin@ocms.com",
    role: "Super Administrator",
    department: "IT Operations",
    phone: "+91 9876543210",
    bio: "Managing system operations and complaint workflow monitoring.",
  };

  return (
    <div className={`admin-profile-wrapper ${darkMode ? "dark" : ""}`}>
      {/* HEADER */}
      <div className="profile-top">
        <div>
          <h1>Account Settings</h1>
          <p>Manage profile, security and activity</p>
        </div>

        <div className="top-actions">
          <button
            className="icon-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className="edit-btn"
            onClick={() => setShowEdit(!showEdit)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="profile-hero">
        <div className="avatar-wrapper">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="avatar"
          />
          <span className="online-dot"></span>
        </div>

        <div className="hero-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <span className="role-badge">{profile.role}</span>
        </div>

        <AnimatePresence>
          {showEdit && (
            <motion.div
              className="edit-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h4>Edit Profile</h4>

              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Phone" />
              <textarea placeholder="Bio"></textarea>

              <button
                className="save-btn"
                onClick={() => setShowEdit(false)}
              >
                Save Changes
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card active">
          <h3>12</h3>
          <p>Active Complaints</p>
        </div>

        <div className="stat-card resolved">
          <h3>38</h3>
          <p>Resolved Complaints</p>
        </div>
      </div>

      {/* TABS */}
      <div className="profile-tabs">
        {["overview", "security", "activity"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="profile-content">
        {activeTab === "overview" && (
          <motion.div
            className="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="info-row">
              <label>Department</label>
              <span>{profile.department}</span>
            </div>
            <div className="info-row">
              <label>Phone</label>
              <span>{profile.phone}</span>
            </div>
            <div className="info-row">
              <label>Bio</label>
              <span>{profile.bio}</span>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div
            className="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="security-box green">
              <h4>Password</h4>
              <p>Last changed 30 days ago</p>
              <button className="outline-btn">Update Password</button>
            </div>

            <div className="security-box blue">
              <h4>Two-Factor Authentication</h4>
              <p>Currently Disabled</p>
              <button className="outline-btn">Enable 2FA</button>
            </div>
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div
            className="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            
            <div className="activity-item success">
              Complaint #1021 marked as resolved
            </div>
            <div className="activity-item warning">
              Complaint #1078 pending review
            </div>
            <div className="activity-item neutral">
              Profile updated successfully 
            </div>
          </motion.div> 
        )}
      </div>
    </div>
  );
}
