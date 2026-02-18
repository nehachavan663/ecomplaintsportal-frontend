import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profile = {
    name: "Admin User",
    email: "admin@ocms.com",
    role: "Super Administrator",
    department: "IT Operations",
    phone: "+91 9876543210",
    bio: "Managing system operations and complaint workflow monitoring.",
    employeeId: "ADM-1024",
    location: "Hyderabad, India",
    joined: "12 Jan 2022",
    status: "Active",
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

          <div
            className={`theme-switch ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="switch-knob"></div>
          </div>

          <div className="menu-wrapper" ref={menuRef}>
            <button
              className="menu-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              ⋮
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div>Edit Profile</div>
                  <div>Share Profile</div>
                  <div>Notifications</div>
                  <div>Emails</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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

          <button
            className="edit-profile-btn"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
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
          <motion.div className="panel overview-panel">
            <div className="info-row">
              <label>Department</label>
              <span>{profile.department}</span>
            </div>
            <div className="info-row">
              <label>Phone</label>
              <span>{profile.phone}</span>
            </div>
            <div className="info-row">
              <label>Employee ID</label>
              <span>{profile.employeeId}</span>
            </div>
            <div className="info-row">
              <label>Location</label>
              <span>{profile.location}</span>
            </div>
            <div className="info-row">
              <label>Joined</label>
              <span>{profile.joined}</span>
            </div>
            <div className="info-row">
              <label>Status</label>
              <span className="status-text">{profile.status}</span>
            </div>

            <div className="bio-section">
              <h4>About</h4>
              <p>{profile.bio}</p>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div className="panel">
            <div className="security-box green">
              <h4>Password</h4>
              <p>Last changed 30 days ago</p>
              <button
                className="outline-btn"
                onClick={() => setShowPasswordModal(true)}
              >
                Update Password
              </button>
            </div>

            <div className="security-box blue">
              <h4>Two-Factor Authentication</h4>
              <p>Currently Disabled</p>
              <button
                className="outline-btn"
                onClick={() => setShow2FAModal(true)}
              >
                Enable 2FA
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div className="panel">
            <div className="activity-card success">
              <div>
                <strong>Complaint #1021 Resolved</strong>
                <p>Issue marked as completed successfully.</p>
              </div>
              <span className="activity-time">2 hours ago</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div className="modal-overlay">
            <motion.div className="modal-box">
              <button
                className="close-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                ✕
              </button>
              <h3>Update Password</h3>
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm Password" />
              <button
                className="save-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2FA MODAL */}
      <AnimatePresence>
        {show2FAModal && (
          <motion.div className="modal-overlay">
            <motion.div className="modal-box">
              <button
                className="close-btn"
                onClick={() => setShow2FAModal(false)}
              >
                ✕
              </button>
              <h3>Enable Two-Factor Authentication</h3>
              <input type="text" placeholder="Enter OTP Code" />
              <button
                className="save-btn"
                onClick={() => setShow2FAModal(false)}
              >
                Verify & Enable
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div className="modal-overlay">
            <motion.div className="modal-box">
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>

              <h3>Edit Profile</h3>

              <input type="text" defaultValue={profile.name} />
              <input type="email" defaultValue={profile.email} />
              <input type="text" defaultValue={profile.phone} />
              <input type="text" defaultValue={profile.department} />
              <input type="text" defaultValue={profile.location} />

              <button
                className="save-btn"
                onClick={() => setShowEditModal(false)}
              >
                Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
