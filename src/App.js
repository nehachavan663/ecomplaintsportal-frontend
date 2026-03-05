import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

/* ---------- PUBLIC PAGES ---------- */
import Home from "./components/Home/Home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Help from "./components/pages/help";
import Privacy from "./components/pages/privacy";

/* ---------- AUTH ---------- */
import Login from "./components/stdlr/login";
import Register from "./components/stdlr/register";
import ForgotPassword from "./components/stdlr/ForgotPassword";

/* ---------- STUDENT LAYOUT ---------- */
import Layout from "./components/Dashboard/Layout";
  

// Complaint Pages
import ComplaintForm from "./components/Dashboard/ComplaintForm";
import TrackComplaintStatus from "./components/Dashboard/TrackComplaintStatus";

// Profile
import Profile from "./components/Dashboard/Profile";



/* ---------- ADMIN LAYOUT ---------- */
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageComplaint from "./Admin/ManageComplaint";
import Reports from "./Admin/Reports";
import AdminProfile from "./Admin/AdminProfile";
import ManageDepartments from "./Admin/ManageDepartments";
import DepartmentDashboard from "./Department/DepartmentDashboard";

function App() {
  return (
    <Router>
      <div className="app-bg">

        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
           <Route path="department-dashboard" element={<DepartmentDashboard/>}/>

              {/* Complaint */}
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/track" element={<TrackComplaintStatus />} />


          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* ================= AUTH ROUTES ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= STUDENT DASHBOARD ================= */}
          <Route path="/dashboard/*" element={<Layout/>} />
            
      
          {/* ================= ADMIN DASHBOARD ================= */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-complaints" element={<ManageComplaint />} />
             <Route path="manage-department" element={<ManageDepartments/>} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<AdminProfile/>}/>
           
            
          </Route>

          {/* ================= 404 ================= */}
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