import React from "react";
import { Link } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <FaRegFileAlt className="logo-icon" />
        <span>ecomplaintsportal.com</span>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-btn">Register</Link>
      </nav>
    </header>
  );
}

export default Navbar;
