import "./Dashboard.css";


const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back! Here's a detailed overview of your complaints.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <p>Total Complaints</p>
          <h2>128</h2>
          <span>+12% this month</span>
        </div>

        <div className="stat-card resolved">
          <p>Resolved</p>
          <h2>96</h2>
          <span>75% resolution rate</span>
        </div>

        <div className="stat-card pending">
          <p>Pending</p>
          <h2>32</h2>
          <span>Needs attention</span>
        </div>

        <div className="stat-card progress">
          <p>In Progress</p>
          <h2>18</h2>
          <span>Currently processing</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">
        {/* Analytics */}
        <div className="analytics-card">
          <h3>Complaint Status</h3>

          <div className="progress-wrapper">
            <div className="progress-header">
              <span>Resolved</span>
              <span>75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill green" style={{ width: "75%" }} />
            </div>
          </div>

          <div className="progress-wrapper">
            <div className="progress-header">
              <span>In Progress</span>
              <span>15%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill orange" style={{ width: "15%" }} />
            </div>
          </div>

          <div className="progress-wrapper">
            <div className="progress-header">
              <span>Pending</span>
              <span>10%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill red" style={{ width: "10%" }} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h3>Recent Activity</h3>

          <div className="activity-card">
            <div>
              <strong>Hostel Water Issue</strong>
              <p>Resolved successfully</p>
            </div>
            <span className="badge resolved">Resolved</span>
          </div>

          <div className="activity-card">
            <div>
              <strong>Library Internet</strong>
              <p>Work in progress</p>
            </div>
            <span className="badge progress">In Progress</span>
          </div>

          <div className="activity-card">
            <div>
              <strong>Classroom Fan Repair</strong>
              <p>Assigned to maintenance</p>
            </div>
            <span className="badge progress">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;