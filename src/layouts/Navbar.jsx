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

    <button className="menu-btn" onClick={() => setOpen(!open)}>
      {open ? <FaTimes /> : <FaBars />}
    </button>

  </header>

  {/* ✅ MOVE SIDEBAR OUTSIDE */}
  <nav className={`nav-links ${open ? "show" : ""}`}>
    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
    <Link to="/about" onClick={() => setOpen(false)}>About</Link>
    <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
    <Link to="/register" className="register" onClick={() => setOpen(false)}>
      Register
    </Link>
  </nav>

  {open && <div className="overlay" onClick={() => setOpen(false)} />}
</>
  );
}

export default Navbar;
