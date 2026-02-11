import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import AdminLogin from "./admin";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const bgStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "scroll"
};


  return (
    <HomeLayout>
    <>
      {isAdmin ? (
        <AdminLogin goBack={() => setIsAdmin(false)} />
      ) : (
        <div className="login-page" style={bgStyle}>
          <div className="login-card">

            <div className="title-pill">Ecomplaintsportal</div>

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

            <button
              className="admin-btn"
              onClick={() => setIsAdmin(true)}
            >
              Login as Admin
            </button>

            <p className="footer-text">
              <span onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </span>
              <br />
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>
                Create New Account
              </span>
            </p>

            <div className="or">
              <span></span>
              OR
              <span></span>
            </div>

            <button className="google-btn">
              <span className="google-icon">G</span>
              Continue With Google
            </button>

          </div>
        </div>
      )}
    </>
    </HomeLayout>  );
}

export default Login;
