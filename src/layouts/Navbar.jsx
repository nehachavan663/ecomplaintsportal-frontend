import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../components/Home/Images/elogo1.png"; 
function Navbar() {
  const [open, setOpen] = useState(false);
  
  

  return (
  <>
  <header className="navbar">

    <Link to="/" className="logo-container">
      <img src={logo} alt="logo" className="logo-img" />
    </Link>

    {/* Desktop menu */}
    <div className="desktop-menu">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="/register" className="register">Register</Link>
    </div>

    {/* Mobile button */}
    <button className="menu-btn" onClick={() => setOpen(!open)}>
      {open ? <FaTimes /> : <FaBars />}
    </button>

  </header>

  {/* Mobile sidebar */}
  <nav className={`nav-links ${open ? "show" : ""}`}>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/login">Login</Link>
    <Link to="/register" className="register">Register</Link>
  </nav>

  {open && <div className="overlay" onClick={() => setOpen(false)} />}
</>
  );
}

export default Navbar;
