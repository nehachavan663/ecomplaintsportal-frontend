import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./stdlr.css";

import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";
import Swal from "sweetalert2";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
  setLoginInput("");
  setPassword("");
}, []);

  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
  };

  const handleLogin = async () => {

  if (!loginInput || !password) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please enter Username / Email / Phone and Password"
    });
    return;
  }

  try {

    // 🔥 1. ADMIN LOGIN
    const adminRes = await fetch(
      "https://ecomplaintsportal-backend.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginInput,
          password: password
        })
      }
    );

    if (adminRes.ok) {
      localStorage.setItem("role", "admin");

      Swal.fire({
        icon: "success",
        title: "Admin Login Successful"
      });

      navigate("/admin/dashboard");
      return;
    }

    // 🔥 2. STUDENT LOGIN
    const response = await fetch(
      "https://ecomplaintsportal-backend.onrender.com/api/lre/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: loginInput,
          password: password
        })
      }
    );

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("studentId", data.id);
      localStorage.setItem("studentEmail", data.email);
      localStorage.setItem("role", "student");

      Swal.fire({
        icon: "success",
        title: "Login Successful"
      });

      navigate("/dashboard");
      return;
    }

    // 🔥 3. DEPARTMENT LOGIN
    const deptRes = await fetch(
      "https://ecomplaintsportal-backend.onrender.com/api/departments/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginInput,
          password: password
        })
      }
    );

    const deptData = await deptRes.json();

    if (deptData && deptData.department) {
      localStorage.setItem("department", deptData.department);
      localStorage.setItem("role", "department");

      Swal.fire({
        icon: "success",
        title: "Department Login Successful"
      });

      navigate("/department-dashboard");
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid credentials"
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server Error"
    });
  }
};

  return (
    <HomeLayout>
      <>
        
          <div className="login-page" style={bgStyle}>
            <div className="login-card">

              <div className="title-pill">Ecomplaintsportal</div>

              <label className="label">
                Username / Email / Phone
              </label>
<input
  type="text"
  name="random_login_field"        // ✅ ADD
  autoComplete="off"               // ✅ ADD
  className="input"
  value={loginInput}
  onChange={(e) => setLoginInput(e.target.value)}
  placeholder="Enter username, email or phone"
/>

              <label className="label">Enter Password</label>

              <div className="password-wrapper">
               <input
  type={showPassword ? "text" : "password"}
  name="random_password_field"     // ✅ ADD
  autoComplete="new-password"      // ✅ ADD
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

              <GoogleLogin
                onSuccess={(credentialResponse) => {

                  const user = jwtDecode(credentialResponse.credential);

                  console.log(user);

                  localStorage.setItem("studentName", user.name);
                  localStorage.setItem("studentEmail", user.email);
                 localStorage.setItem("role", "student");
               Swal.fire({
  icon: "success",
  title: "Google Login Successful",
  text: "Welcome " + user.name
});

                  navigate("/dashboard");
                }}
                onError={() => {
                 Swal.fire({
  icon: "error",
  title: "Google Login Failed",
  text: "Please try again"
});
                }}
              />

            </div>
          </div>
        
      </>
    </HomeLayout>
  );
}

export default Login;