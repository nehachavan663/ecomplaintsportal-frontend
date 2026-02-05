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
    <div className="admin-container">

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <h2>ecomplaintsportal</h2>

        <ul>
          <li>
            <Link to="/admin/dashboard" className="nav-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/manage-complaints" className="nav-link">
              <FaClipboardList />
              <span>Manage Complaints</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/reports" className="nav-link">
              <FaChartBar />
              <span>Reports</span>
            </Link>
          </li>

          <li className="nav-link">
            <FaUser />
            <span>Profile</span>
          </li>

          <li className="nav-link">
            <FaSignOutAlt />
            <span>Logout</span>
          </li>
        </ul>
      </aside>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* Main */}
      <main className="main">

        {/* Header */}
       <header className="header">

  <div className="header-left">
    <div className="menu-btn" onClick={() => setOpen(true)}>☰</div>

    <span className="header-icon">
      <FaTachometerAlt />
    </span>

    <h3>Admin Dashboard</h3>
  </div>

  <span className="admin-badge">Administrator</span>

</header>


        <div className="admin-content">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;
