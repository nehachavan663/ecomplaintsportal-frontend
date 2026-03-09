import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";   // ✅ SweetAlert2 import
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Security
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
  };

  const handleReset = async () => {

    if (!email || !securityQuestion || !securityAnswer || !newPassword || !confirmPassword) {

      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields"
      });

      return;
    }

    if (newPassword !== confirmPassword) {

      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Passwords do not match"
      });

      return;
    }

    try {

      const response = await fetch("http://localhost:8080/api/lre/forgot-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          question: securityQuestion,
          answer: securityAnswer,
          newPassword: newPassword
        })
      });

      const result = await response.text();

      if (result === "Password Updated Successfully") {

        Swal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Your password has been reset successfully"
        }).then(() => {
          navigate("/login");
        });

      } else {

        Swal.fire({
          icon: "error",
          title: "Reset Failed",
          text: result
        });

      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Server not connected"
      });

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

          <h3>Security Question</h3>

          <select
            className="input"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
          >
            <option value="">Select a question</option>

            <option value="What is your childhood nickname?">
              What is your childhood nickname?
            </option>

            <option value="What is your favourite book?">
              What is your favourite book?
            </option>

            <option value="What is your birth city?">
              What is your birth city?
            </option>

          </select>

          <label className="label">Your Answer</label>

          <input
            className="input"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
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