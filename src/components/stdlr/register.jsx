import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const bgStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "scroll"
  };

  return (
    <HomeLayout>
    <div className="login-page" style={bgStyle}>
      <div className="login-card register-animate">

        <div className="title-pill">Registration</div>

        <label className="label">Username / Email id</label>
        <input type="text" className="input" />

        <label className="label">Enter Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        <label className="label">Confirm Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        <button className="login-btn">
          Create Account
        </button>

        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>
    </div>
    </HomeLayout>
  );
}

export default Registration;
