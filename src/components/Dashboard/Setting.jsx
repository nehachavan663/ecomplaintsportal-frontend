import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Setting.css";
import Swal from "sweetalert2";
export default function Settings() {

  const studentId = localStorage.getItem("studentId");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FAForm, setShow2FAForm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [otp, setOtp] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [qrUrl, setQrUrl] = useState("");



  // ================= GENERATE 2FA =================

  const generate2FA = async () => {

    try {

      const response = await fetch(
        `https://ecomplaintsportal-backend.onrender.com/api/lre/generate-2fa/${studentId}`
      );

      const data = await response.json();

      setSecretKey(data.secret);
      setQrUrl(data.qrUrl);

    } catch (error) {

      console.error(error);
     Swal.fire({
  icon: "error",
  title: "2FA Error",
  text: "Unable to generate 2FA",
});

    }

  };



  // ================= PASSWORD CHANGE =================
  // ================= HANDLE PASSWORD INPUT =================

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
        headers: {
          "Content-Type": "application/json"
        },
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
        text: "Your password has been updated successfully",
      });

      setShowPasswordForm(false);

    } else {

      Swal.fire({
        icon: "error",
        title: "Incorrect Password",
        text: "Current password is incorrect",
      });

    }

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Something went wrong. Try again later",
    });

  }

};

  // ================= VERIFY OTP =================

  const handleVerifyOTP = async (e) => {

    e.preventDefault();

    if (otp.length !== 6) {
     Swal.fire({
  icon: "warning",
  title: "Invalid OTP",
  text: "Enter a valid 6 digit OTP",
});
      return;
    }

    try {

      const response = await fetch(
        "https://ecomplaintsportal-backend.onrender.com/api/lre/verify-2fa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: studentId,
            code: otp
          })
        }
      );

      const valid = await response.json();

      if (valid) {

     Swal.fire({
  icon: "success",
  title: "2FA Enabled",
  text: "Two-Factor Authentication enabled successfully",
});
        setShow2FAForm(false);

      } else {

      Swal.fire({
  icon: "error",
  title: "Invalid OTP",
  text: "The OTP you entered is incorrect",
});

      }

    } catch (error) {

      console.error(error);
    Swal.fire({
  icon: "error",
  title: "Verification Failed",
  text: "OTP verification failed",
});

    }

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

                generate2FA();   // 🔴 IMPORTANT FIX

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

                {qrUrl && (
                  <QRCodeCanvas value={qrUrl} size={180} />
                )}

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