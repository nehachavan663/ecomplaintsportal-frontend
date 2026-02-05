import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Complaint Pages
import ComplaintForm from "./components/Complaint/ComplaintForm";
import TrackComplaintStatus from "./components/Complaint/TrackComplaintStatus";

// Dashboard
import Dashboard from "./components/Dashboard/Dashboard";

// Home
import Home from "./components/Home/Home";

// Profile
import Profile from "./components/Profile/Profile";

import Login from "./components/stdlr/login";
import Register from "./components/stdlr/register";
import ManageComplaint from "./Admin/ManageComplaint";
// CSS
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-bg">

        <Routes>

          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Complaint Pages */}
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/track" element={<TrackComplaintStatus />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 Page (Optional) */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                404 - Page Not Found
              </h2>
            }
          />
         <Route path="/admin/manage-complaints" element={<ManageComplaint />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
