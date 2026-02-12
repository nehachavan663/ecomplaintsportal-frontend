import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminDashboard.css";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin">

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <h2 className="logo">ecomplaintsportal</h2>

        <nav>
          <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link to="/admin/manage-complaints" onClick={() => setOpen(false)}>
            <FaClipboardList /> Manage Complaints
          </Link>

          <Link to="/admin/reports" onClick={() => setOpen(false)}>
            <FaChartBar /> Reports
          </Link>

          <Link to="/admin/profile" onClick={() => setOpen(false)}>
            <FaUser /> Profile
          </Link>

          <button className="logout">
            <FaSignOutAlt /> Logout
          </button>
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