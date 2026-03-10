import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Setting.css";

export default function Settings() {

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FAForm, setShow2FAForm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [otp, setOtp] = useState("");

  const secretKey = "OCMS-USER-SECURE-KEY";

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully");
    setShowPasswordForm(false);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter a valid 6 digit OTP");
      return;
    }

    alert("Two-Factor Authentication Enabled Successfully");
    setShow2FAForm(false);
  };

  return (
    <div className="settings-wrapper">

      <div className="settings-header">
        <h1>Account Security</h1>
        <p>Manage password and authentication settings to keep your account secure.</p>
      </div>

      <div className="settings-card">

        {/* Action Cards */}
        <div className="security-grid">

          <div className="security-item">
            <div>
              <h4>Password</h4>
              <p>Update your account password regularly for better protection.</p>
            </div>

            <button
              className="secondary-btn"
              onClick={() => {
                setShowPasswordForm(true);
                setShow2FAForm(false);
              }}
            >
              Change Password
            </button>
          </div>

          <div className="security-item">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra security layer using Google Authenticator.</p>
            </div>

            <button
              className="secondary-btn"
              onClick={() => {
                setShow2FAForm(true);
                setShowPasswordForm(false);
              }}
            >
              Enable 2FA
            </button>
          </div>

        </div>

        {/* Change Password */}
        {showPasswordForm && (
          <div className="form-box">

            <h2>Change Password</h2>

            <form onSubmit={handlePasswordSubmit}>

              <div className="input-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button className="primary-btn">
                  Update Password
                </button>

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
        )}

        {/* Enable 2FA */}
        {show2FAForm && (
          <div className="form-box">

            <h2>Enable Two-Factor Authentication</h2>

            <div className="twofa-container">

              <div className="qr-side">
                <QRCodeCanvas value={secretKey} size={140} />
                <p className="secret-key">{secretKey}</p>
              </div>

              <form onSubmit={handleVerifyOTP} className="otp-form">

                <label>Enter Verification Code</label>

                <input
                  type="text"
                  placeholder="6 digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <div className="form-actions">
                  <button className="primary-btn">
                    Verify
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShow2FAForm(false)}
                  >
                    Cancel
                  </button>
                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
