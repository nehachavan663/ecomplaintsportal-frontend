import { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";

import { FaBars, FaMoon, FaSun, FaSignOutAlt, FaTimes } from "react-icons/fa";

import Dashboard from "./Dashboard";
import TrackComplaintStatus from "./TrackComplaintStatus";
import ComplaintForm from "./ComplaintForm";
import Profile from "./Profile";
import Setting from "./Setting";
import Faqs from "./Faqs";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Complaint Status", path: "/dashboard/status" },
    { name: "Registration Form", path: "/dashboard/register" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Faqs", path: "/dashboard/faqs" },
    { name: "Setting", path: "/dashboard/setting" }
  ];

  const handleLogout = () => navigate("/");

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="layout-container">

        {/* MOBILE HEADER */}
        <div className="mobile-header">
          <FaBars
            className="mobile-icon"
            onClick={() => setSidebarOpen(true)}
          />
          <h4>Student Panel</h4>

          <div className="mobile-right">
            <div onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </div>
            <FaSignOutAlt onClick={handleLogout} />
          </div>
        </div>

        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
          <div className="sidebar-top">
            <FaTimes
              className="icon-btn"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <h3 className="sidebar-title">
            Online Complaint Management
          </h3>

          <div className="menu-container">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="menu-link"
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="logout-section">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="status" element={<TrackComplaintStatus />} />
            <Route path="register" element={<ComplaintForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="setting" element={<Setting />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default Layout;
