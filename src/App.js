import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Complaint Pages
import ComplaintForm from "../../complaint/src/components/Complaint/ComplaintForm";
import TrackComplaintStatus from "../../complaint/src/components/Complaint/TrackComplaintStatus";

// Dashboard
import Dashboard from "../../complaint/src/components/Dashboard/Dashboard";

// Home
import Home from "../../complaint/src/components/Home/Home";

// Profile
import Profile from "../../complaint/src/components/Profile/Profile";

// STDLR (Login / Register)
import Login from "../../complaint/src/components/stdlr/login";
import Register from "../../complaint/src/components/stdlr/register";

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

        </Routes>

      </div>
    </Router>
  );
}

export default App;
