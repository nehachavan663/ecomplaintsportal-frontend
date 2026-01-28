import React, { useState } from "react";
import "./stdlr.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="title-pill">Login</div>

        <label className="label">Username / Email</label>
        <input type="text" className="input" />

        <span className="link">Use phone number instead</span>

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

        <button className="login-btn">Login</button>

        <p className="footer-text">
          Forgot your password? <span>Create New Account</span>
        </p>

        <div className="or">
          <span></span>
          OR
          <span></span>
        </div>

        <button className="google-btn">
          Continue With Google
        </button>

      </div>
    </div>
  );
}

export default Login;
