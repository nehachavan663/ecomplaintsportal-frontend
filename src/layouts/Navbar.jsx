import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../components/Home/Images/elogo1.png"; 
function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <header className="navbar">

      {/* LEFT LOGO */}
   <Link to="/" className="logo-container">
  <img src={logo} alt="logo" className="logo-img" />
</Link>


      {/* RIGHT MENU */}
      <nav className={`nav-links ${open ? "show" : ""}`}>

        <Link to="/" className={isActive("/")} onClick={() => setOpen(false)}>Home</Link>
        <Link to="/about" className={isActive("/about")} onClick={() => setOpen(false)}>About</Link>
        <Link to="/login" className={isActive("/login")} onClick={() => setOpen(false)}>Login</Link>

        {/* Register never gets active background */}
        <Link to="/register" className="register" onClick={() => setOpen(false)}>
          Register
        </Link>

      </nav>

      {/* Mobile icon */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </header>
  );
}

export default Navbar;
