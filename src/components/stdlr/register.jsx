import React, { useState } from "react";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
function Registration() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <HomeLayout>
    <div className="login-page">
      <div className="login-card">

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
          Already have an account? <span>Login</span>
        </p>

      </div>
    </div>
    </HomeLayout>
  );
}

export default Registration;
