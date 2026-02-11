import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
  };

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    // Later connect backend API here
    alert("Password reset link sent to " + email);
    navigate("/");
  };

  return (
    <HomeLayout>
      <div className="login-page" style={bgStyle}>
        <div className="login-card">

          <div className="title-pill">Reset Password</div>

          <label className="label">Enter Registered Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login-btn" onClick={handleReset}>
            Send Reset Link
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
