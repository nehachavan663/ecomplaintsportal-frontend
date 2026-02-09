import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">

        <span className="logo">ecomplaintsportal.com</span>

        {/* Desktop */}
        <ul className="nav-links">
          <li><FaHome /><Link to="/">Home</Link></li>
          <li><FaInfoCircle /><Link to="/about">About</Link></li>
          <li><FaSignInAlt /><Link to="/login">Login</Link></li>
          <li className="register-btn">
            <FaUserPlus /><Link to="/register">Register</Link>
          </li>
        </ul>

        {/* Hamburger */}
        <div
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </nav>

      {/* Mobile menu */}
      <div className={`mobile-nav ${open ? "show" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}><FaHome /> Home</Link>
        <Link to="/about" onClick={() => setOpen(false)}><FaInfoCircle /> About</Link>
        <Link to="/login" onClick={() => setOpen(false)}><FaSignInAlt /> Login</Link>
        <Link to="/register" onClick={() => setOpen(false)}><FaUserPlus /> Register</Link>
      </div>

      {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default Navbar;
