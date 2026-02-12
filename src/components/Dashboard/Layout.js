import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Layout.css";

import { FaBars, FaMoon, FaSun } from "react-icons/fa";

import Dashboard from "./Dashboard";    
import TrackComplaintStatus from "./TrackComplaintStatus";
import ComplaintForm from "./ComplaintForm";
import Profile from "./Profile";
import Setting from "./Setting";
import Faqs from "./Faqs";



function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  

  const menuItems = [
    {name: "Dashboard ", path:"/dashboard" },
    { name: "Complaint Status", path: "/dashboard/status" },
    { name: "Registration Form", path: "/dashboard/register" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Faqs", path: "/dashboard/faqs" },
    { name: "Setting", path: "/dashboard/setting" }
  ];

  return (
    <div className="layout-container">


      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

    
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FaBars onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer" }} />
          {!collapsed && (
            <div onClick={() => setDarkMode(!darkMode)} style={{ cursor: "pointer" }}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </div>
          )}
        </div>

        {!collapsed && (
          <h3 style={{ marginTop: "30px", fontSize: "15px" }}>
            Online Complaint Management
          </h3>
        )}

        <div style={{ marginTop: "30px" }}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                textDecoration: "none",
                color: "white"
              }}
            >
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
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
  );
}

export default Layout;
