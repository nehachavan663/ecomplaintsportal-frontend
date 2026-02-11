import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

// Complaint Pages
import ComplaintForm from "./components/Complaint/ComplaintForm";
import TrackComplaintStatus from "./components/Complaint/TrackComplaintStatus";

// Dashboard
import Dashboard from "./components/Dashboard/Dashboard";

// Home
import Home from "./components/Home/Home";

// Info Pages
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Help from "./components/pages/help";
import Privacy from "./components/pages/privacy";

// Profile
import Profile from "./components/Profile/Profile";

// Auth
import Login from "./components/stdlr/login";
import Register from "./components/stdlr/register";

// CSS
import "./App.css";

// Admin
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageComplaint from "./Admin/ManageComplaint";
import Reports from "./Admin/Reports";

function App() {
  return (
    <Router>
      <div className="app-bg">

        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Information Pages */}
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/help" element={<Help />} />
<Route path="/privacy" element={<Privacy />} />

          {/* Complaint */}
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/track" element={<TrackComplaintStatus />} />

          {/* Student Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= ADMIN ROUTES ================= */}

          <Route path="/admin" element={<AdminLayout />}>

            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="manage-complaints" element={<ManageComplaint />} />

            <Route path="reports" element={<Reports />} />

          </Route>

          {/* =============================================== */}

          {/* 404 */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                404 - Page Not Found
              </h2>
            }
          />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
