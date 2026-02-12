import "./Setting.css";

export default function Settings() {
  return (
    <div className="settings-wrapper">

      {/* Header */}
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your preferences, security, and notifications.</p>
      </div>

      {/* Settings Card */}
      <div className="settings-card">

        {/* Notifications */}
        <div className="settings-section">
          <h3>Notifications</h3>

          <div className="setting-row">
            <div>
              <h4>Email Notifications</h4>
              <p>Receive complaint updates via email</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-row">
            <div>
              <h4>SMS Notifications</h4>
              <p>Receive important alerts via SMS</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="settings-section">
          <h3>Appearance</h3>

          <div className="setting-row">
            <div>
              <h4>Dark Mode</h4>
              <p>Switch between light and dark theme</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="settings-section">
          <h3>Security</h3>

          <div className="security-actions">
            <button className="secondary-btn">Change Password</button>
            <button className="secondary-btn">Enable 2FA</button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <h3>Danger Zone</h3>
          <button className="logout-btn">Logout</button>
        </div>

      </div>
    </div>
  );
}
