import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminDashboard.css";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaBell,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <h2>ecomplaintsportal</h2><br/>

        <ul>

          <li>
            <Link to="/admin/dashboard" className="nav-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li><br/>

          <li>
            <Link to="/admin/manage-complaints" className="nav-link">
              <FaClipboardList />
              <span>Manage Complaints</span>
            </Link>
          </li><br/>

          <li>
            <FaBell />
            <span>Reports</span>
          </li><br/>

          <li>
            <FaUser />
            <span>Profile</span>
          </li><br/>

          <li>
            <FaSignOutAlt />
            <span>Logout</span>
          </li><br/>

        </ul>
      </aside>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* Main Area */}
      <main className="main">

        {/* Topbar */}
        <header className="header">

          <div className="header-left">
            <div className="menu-btn" onClick={() => setOpen(true)}>☰</div>
            <h3>Admin Panel</h3>
          </div>

          <span className="admin-badge">Administrator</span>

        </header>

        {/* Page Content */}
        <div className="admin-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;
