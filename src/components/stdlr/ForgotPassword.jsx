import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
  };

  const handleReset = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Later connect backend API here
    alert("Password successfully reset!");
    navigate("/login");
  };

  return (
    <HomeLayout>
      <div className="login-page" style={bgStyle}>
        <div className="login-card">

          <div className="title-pill">Reset Password</div>

          <label className="label">New Password</label>
          <input
            type="password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleReset}>
            Update Password
          </button>

          <p className="footer-text">
            <span onClick={() => navigate("/login")}>
              Back to Login
            </span>
          </p>

        </div>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;