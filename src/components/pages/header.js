import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <h2 className="logo">Ecomplaintsportal</h2>
      <nav className="nav">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/help">Help</Link>
      </nav>
    </header>
  );
}

export default Header;