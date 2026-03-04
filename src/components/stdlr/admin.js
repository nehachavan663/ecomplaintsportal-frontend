import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "./assets/bglogin.jpeg";
import "./stdlr.css";

function AdminLogin({ goBack }) {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
  };

 
 const handleAdminLogin = () => {
  axios.post("http://localhost:8080/api/login", {
    email: email,
    password: password
  })
  .then(res => {
      navigate("/admin/dashboard");
  })
  .catch(() => alert("Invalid admin credentials"));
};
  return (
    <div className="login-page" style={bgStyle}>
      <div className="login-card">

        <form autoComplete="off">

          <div className="title-pill">Admin Panel Login</div>

          <label className="label">Admin Username / Email</label>
         <input
  type="text"
  name="admin_email_random"
  autoComplete="off"
  className="input"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <label className="label">Enter Password</label>

          <div className="password-wrapper">
           <input
  type={showPassword ? "text" : "password"}
  name="admin_password_random"
  autoComplete="new-password"
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

          <button
            type="button"
            className="login-btn"
            onClick={handleAdminLogin}
          >
            Admin Login
          </button>

        </form>

        <button className="admin-btn" onClick={goBack}>
          Back to User Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;