import { useState } from "react";
import "./Setting.css";
import Swal from "sweetalert2";

export default function Settings() {

  const studentId = localStorage.getItem("studentId");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://ecomplaintsportal-backend.onrender.com/api/lre/change-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: studentId,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          })
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password Updated",
        });
        setShowPasswordForm(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
        });
      }

    } catch {
      Swal.fire({
        icon: "error",
        title: "Server Error",
      });
    }
  };

  return (
    <div className="settings-wrapper">

      <div className="settings-header">
        <h1>Account Security</h1>
        <p>Manage your password securely.</p>
      </div>

      <div className="settings-card">
        <div className="security-item">
          <div>
            <h4>Password</h4>
            <p>Keep your account safe by updating your password.</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowPasswordForm(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {showPasswordForm && (
        <div className="modal-overlay">
          <div className="modal-box">

            <button
              className="modal-close"
              onClick={() => setShowPasswordForm(false)}
            >
              ×
            </button>

            <h2>Change Password</h2>

            <form onSubmit={handlePasswordSubmit}>

              {/* Current */}
              <div className="floating-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  onChange={handlePasswordChange}
                  required
                />
                <label>Current Password</label>
              </div>

              {/* New */}
              <div className="floating-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  onChange={handlePasswordChange}
                  required
                />
                <label>New Password</label>

                <div className="password-strength">
                  {formData.newPassword.length > 0 && formData.newPassword.length < 6 && (
                    <span className="weak">⚠ Weak password</span>
                  )}

                  {formData.newPassword.length >= 6 && formData.newPassword.length < 10 && (
                    <span className="medium">Medium strength</span>
                  )}

                  {formData.newPassword.length >= 10 && (
                    <span className="strong">Strong password</span>
                  )}
                </div>
              </div>

              {/* Confirm */}
              <div className="floating-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                  required
                />
                <label>Confirm Password</label>
              </div>

              {/* Toggle */}
              <div
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈 Hide Passwords" : "👁 Show Passwords"}
              </div>

              <div className="form-actions">
                <button className="primary-btn">Update</button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}