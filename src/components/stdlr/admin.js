import React, { useState } from "react";
import bgImage from "./assets/bglogin.jpeg";
function AdminLogin({ goBack }) {
  const [showPassword, setShowPassword] = useState(false);
   const bgStyle = {
   backgroundImage: `url(${bgImage})`,
   backgroundSize: "cover",
   backgroundPosition: "center",
   backgroundRepeat: "no-repeat",
   backgroundAttachment: "scroll"
  };

  return (
    <div className="login-page" style={bgStyle}>
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
