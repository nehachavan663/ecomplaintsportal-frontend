import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profilePic, setProfilePic] = useState("https://cdn-icons-png.flaticon.com/512/616/616408.png");
  const fileInputRef = useRef(null);
  const menuRef = useRef();

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="admin-profile-wrapper">
      {/* HEADER */}
      <div className="profile-top">
        <div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#111827' }}>Account Settings</h1>
          <p style={{ margin: '8px 0 0 0', color: '#374151', fontSize: '16px' }}>Manage profile, security and activity</p>
        </div>

        <div className="top-actions">
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
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
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
        <div className="avatar-container">
          <div 
            className="avatar-wrapper" 
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={profilePic} alt="avatar" />
            <span className="online-dot"></span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePicUpload}
              accept="image/*"
            />
          </div>
          <div className="pfp-change-tooltip">
            Click to change photo
          </div>
          <div className="upload-icon">📷</div>
        </div>

        <div className="hero-info">
          <h2 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: '700', color: '#111827' }}>{profile.name}</h2>
          <p style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#374151' }}>{profile.email}</p>
          <span className="role-badge">{profile.role}</span>

          <button
            className="edit-profile-btn"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Rest of the component remains exactly the same... */}
      {/* TABS */}
      <div className="profile-tabs">
        {["overview", "security", "activity"].map((tab) => (
          <motion.button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="profile-content">
        {activeTab === "overview" && (
          <motion.div 
            className="panel overview-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
              <span style={{ color: '#22c55e', fontWeight: '600' }}>{profile.status}</span>
            </div>

            <div className="bio-section">
              <h4 style={{ margin: '0 0 12px 0', color: '#111827', fontSize: '18px' }}>About</h4>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#374151' }}>{profile.bio}</p>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div 
            className="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="security-box green">
              <h4 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '18px', fontWeight: '600' }}>Password</h4>
              <p style={{ margin: '0 0 16px 0', color: '#374151' }}>Last changed 30 days ago</p>
              <button
                className="outline-btn"
                onClick={() => setShowPasswordModal(true)}
              >
                Update Password
              </button>
            </div>

            <div className="security-box blue">
              <h4 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '18px', fontWeight: '600' }}>Two-Factor Authentication</h4>
              <p style={{ margin: '0 0 16px 0', color: '#374151' }}>Currently Disabled</p>
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
          <motion.div 
            className="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="activity-card success">
              <div>
                <strong>Complaint #1021 Resolved</strong>
                <p>Issue marked as completed successfully.</p>
              </div>
              <span className="activity-time">2 hours ago</span>
            </div>
            <div className="activity-card warning">
              <div>
                <strong>Complaint #1019 Assigned</strong>
                <p>New complaint assigned to your team for review.</p>
              </div>
              <span className="activity-time">5 hours ago</span>
            </div>
            <div className="activity-card neutral">
              <div>
                <strong>System Login</strong>
                <p>Successfully logged into the admin dashboard.</p>
              </div>
              <span className="activity-time">1 day ago</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-box"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
            >
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
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-box"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="close-btn"
                onClick={() => setShow2FAModal(false)}
              >
                ✕
              </button>
              <h3>Enable Two-Factor Authentication</h3>
              <p style={{ margin: '0 0 20px 0', color: '#6b7280', fontSize: '14px' }}>
                Enter the 6-digit code from your authenticator app
              </p>
              <input type="text" placeholder="Enter OTP Code" maxLength={6} />
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
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-box"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>

              <h3>Edit Profile</h3>

              <input type="text" defaultValue={profile.name} placeholder="Full Name" />
              <input type="email" defaultValue={profile.email} placeholder="Email Address" />
              <input type="tel" defaultValue={profile.phone} placeholder="Phone Number" />
              <input type="text" defaultValue={profile.department} placeholder="Department" />
              <input type="text" defaultValue={profile.location} placeholder="Location" />

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
