import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stdlr.css";
import HomeLayout from "../../layouts/HomeLayouts";
import bgImage from "./assets/bglogin.jpeg";
import Swal from "sweetalert2";

function Registration() {

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Student Information
const [fullName, setFullName] = useState("");
const [fatherName, setFatherName] = useState("");
const [rollNumber, setRollNumber] = useState("");
const [className, setClassName] = useState("");
const [department, setDepartment] = useState("");

// Contact
const [phone, setPhone] = useState("");

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

  const handleRegister = async () => {

    if (
  !fullName || !fatherName || !rollNumber || !className || !department ||
  !email || !phone || !password || !confirmPassword ||
  !securityQuestion || !securityAnswer
) {
 Swal.fire({
  icon: "warning",
  title: "Missing Fields",
  text: "Please fill all fields"
});
  return;
}

    if (password !== confirmPassword) {
      Swal.fire({
  icon: "error",
  title: "Password Error",
  text: "Passwords do not match"
});
      return;
    }

    try {
      const response = await fetch("https://ecomplaintsportal-backend.onrender.com/api/lre/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
       body: JSON.stringify({
  fullName: fullName,
  fatherName: fatherName,
  rollNumber: rollNumber,
  className: className,
  department: department,
  email: email,
  phone: phone,
  password: password,
  securityQuestion: securityQuestion,
  securityAnswer: securityAnswer
})
      });

      if (response.ok) {
       Swal.fire({
  icon: "success",
  title: "Registration Successful",
  text: "Your account has been created"
}).then(() => {
  navigate("/login");
});
        navigate("/login");
      } else {
        Swal.fire({
  icon: "error",
  title: "Registration Failed",
  text: "Please try again"
});
      }

    } catch (error) {
    Swal.fire({
  icon: "error",
  title: "Server Error",
  text: "Backend server not connected"
});
    }
  };

  return (
    <HomeLayout>
      <div className="login-page" style={bgStyle}>
        <div className="login-card register-animate">

          <div className="title-pill">Registration</div>
          <h3>Student Information</h3>

<label className="label">Full Name</label>
<input className="input" value={fullName} onChange={(e)=>setFullName(e.target.value)} />

<label className="label">Father Name</label>
<input className="input" value={fatherName} onChange={(e)=>setFatherName(e.target.value)} />

<label className="label">Roll Number</label>
<input className="input" value={rollNumber} onChange={(e)=>setRollNumber(e.target.value)} />

<label className="label">Class Name</label>
<input className="input" value={className} onChange={(e)=>setClassName(e.target.value)} />

<label className="label">Department</label>
<input className="input" value={department} onChange={(e)=>setDepartment(e.target.value)} />

<h3>Contact Information</h3>

<label className="label">Phone Number</label>
<input className="input" value={phone} onChange={(e)=>setPhone(e.target.value)} />

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
          <h3>Security Question</h3>

<select
  className="input"
  value={securityQuestion}
  onChange={(e)=>setSecurityQuestion(e.target.value)}
>
  <option value="">Select a question</option>
  <option value="What is your childhood nickname?">
    What is your childhood nickname?
  </option>
  <option value="What is your favorite book name?">
    What is your favorite book name?
  </option>
  <option value="What is your birth city?">
    What is your birth city?
  </option>
</select>

<label className="label">Your Answer</label>
<input
  className="input"
  value={securityAnswer}
  onChange={(e)=>setSecurityAnswer(e.target.value)}
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
