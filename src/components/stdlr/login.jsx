import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./stdlr.css";
import AdminLogin from "./admin";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";

function Login() {

const [showPassword, setShowPassword] = useState(false);
const [isAdmin, setIsAdmin] = useState(false);

const [loginInput, setLoginInput] = useState("");
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

if (!loginInput || !password) {
  alert("Please enter Username / Email / Phone and Password");
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
        login: loginInput,
        password: password
      })
    }
  );

  if (response.ok) {

    const data = await response.json();

    alert("Login Successful");

    localStorage.setItem("studentId", data.id);
    localStorage.setItem("studentEmail", data.email);

    navigate("/dashboard");
    return;
  }

  const deptRes = await fetch(
    "http://localhost:8080/api/departments/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginInput,
        password: password
      })
    }
  );

  const deptData = await deptRes.json();

  if (deptData && deptData.department) {

    const deptName = deptData.department.trim();

    localStorage.setItem("department", deptName);
    localStorage.setItem("staffName", deptData.staffName);

    alert("Department Staff Login Successful");

    navigate("/department-dashboard");
    return;
  }

  alert("Invalid Username / Email / Phone or Password");

} catch (error) {

  console.error("Error:", error);
  alert("Server not connected");

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

          <label className="label">
            Username / Email / Phone
          </label>

          <input
            type="text"
            className="input"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            placeholder="Enter username, email or phone"
          />

          <span className="link">
             login using phone number
          </span>

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

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              alert("Google Login Successful");
              navigate("/dashboard");
            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />

        </div>
      </div>
    )}
  </>
</HomeLayout>

);
}

export default Login;