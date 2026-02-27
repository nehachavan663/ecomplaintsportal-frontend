import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function Registration() {

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
  };

  const handleRegister = async () => {

    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }

    } catch (error) {
      alert("Server not connected");
    }
  };

  return (
    <HomeLayout>
      <div className="login-page" style={bgStyle}>
        <div className="login-card register-animate">

          <div className="title-pill">Registration</div>

          <label className="label">Email</label>
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Enter Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>

          <label className="label">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleRegister}>
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