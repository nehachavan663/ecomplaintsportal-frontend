import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import AdminLogin from "./admin";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/lre/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Login Successful");

        localStorage.setItem("studentId", data.id);
        localStorage.setItem("studentEmail", data.email);

        navigate("/dashboard");

      } else {

        alert(data.message || "Invalid email or password");

      }

    } catch (error) {

      console.error("Error:", error);
      alert("Login failed. Server error.");

    }
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
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="link">Use phone number instead</span>

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

              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>

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

              <button
                className="google-btn"
                onClick={() => window.open("https://google.com", "_blank")}
              >
                <span className="google-icon">G</span>
                Continue With Google
              </button>

            </div>
          </div>
        )}
      </>
    </HomeLayout>
  );
}

export default Login;