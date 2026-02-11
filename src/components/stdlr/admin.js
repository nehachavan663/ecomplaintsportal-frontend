import React, { useState } from "react";

function AdminLogin({ goBack }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="title-pill">Admin Panel Login</div>

        <label className="label">Admin Username / Email</label>
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

        <button className="login-btn">Admin Login</button>

        <button className="admin-btn" onClick={goBack}>
          Back to User Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;