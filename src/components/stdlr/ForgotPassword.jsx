import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function ForgotPassword() {

  const [email, setEmail] = useState("");
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

  const handleReset = async () => {

    if (!email || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/forgot-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: newPassword
        })
      });

      const result = await response.text();
      alert(result);

      if (result === "Password Updated Successfully") {
        navigate("/login");
      }

    } catch (error) {
      alert("Server not connected");
    }
  };

  return (
    <HomeLayout>
      <div className="login-page" style={bgStyle}>
        <div className="login-card">

          <div className="title-pill">Reset Password</div>

          <label className="label">Enter Email</label>
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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