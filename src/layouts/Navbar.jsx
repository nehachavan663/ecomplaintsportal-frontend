import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">ecomplaintsportal.com</span>
      </div>

      {/* Desktop menu */}
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register" className="register-btn">Register</a></li>
      </ul>

      {/* Hamburger icon (mobile only) */}
      <div
        className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>


      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <ul className="mobile-nav">
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <a href="/">Home</a>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <a href="/about">About</a>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <a href="/login">Login</a>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <a href="/register">Register</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
