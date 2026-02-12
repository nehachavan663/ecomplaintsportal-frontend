import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./AdminDashboard.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

useEffect(() => {
  setOpen(false);
}, [location]);

  return (
    <div className="admin">

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <h2 className="logo">ecomplaintsportal</h2>
<nav>
  <NavLink
    to="/admin/dashboard"
    className={({ isActive }) => (isActive ? "active" : "")}
    onClick={() => setOpen(false)}
  >
    <FaTachometerAlt /> Dashboard
  </NavLink>

  <NavLink
    to="/admin/manage-complaints"
    className={({ isActive }) => (isActive ? "active" : "")}
    onClick={() => setOpen(false)}
  >
    <FaClipboardList /> Manage Complaints
  </NavLink>

  <NavLink
    to="/admin/reports"
    className={({ isActive }) => (isActive ? "active" : "")}
    onClick={() => setOpen(false)}
  >
    <FaChartBar /> Reports
  </NavLink>

  <NavLink
    to="/admin/profile"
    className={({ isActive }) => (isActive ? "active" : "")}
    onClick={() => setOpen(false)}
  >
    <FaUser /> Profile
  </NavLink>

    
  <NavLink
    to="/"
    className={({ isActive }) => (isActive ? "active" : "")}
    onClick={() => setOpen(false)}
  >
    <FaSignOutAlt /> Logout
    </NavLink>
  
</nav>
      </aside>

      {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* Main */}
      <main className="main">

        {/* Header */}
        <header className="header">
          <button className="menu" onClick={() => setOpen(true)}>☰</button>

          <h1>Admin Dashboard</h1>

          <span className="badge">Administrator</span>
        </header>

        <div className="content">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;