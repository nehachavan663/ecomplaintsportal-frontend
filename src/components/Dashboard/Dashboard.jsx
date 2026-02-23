import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <p>Total Complaints</p>
          <h2>128</h2>
          <span>+12% this month</span>
        </div>

        <div className="stat-card green">
          <p>Resolved</p>
          <h2>96</h2>
          <span>75% resolution rate</span>
        </div>

        <div className="stat-card orange">
          <p>Pending</p>
          <h2>32</h2>
          <span>Needs attention</span>
        </div>

        <div className="stat-card yellow">
          <p>In Progress</p>
          <h2>18</h2>
          <span>Currently processing</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">

        {/* Complaint Status - Enhanced */}
        <div className="box">
          <h2>Complaint Status</h2>

          <div className="progress-item resolved-item">
            <div className="progress-header">
              <span>Resolved</span>
              <span>75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress green-bar" style={{ width: "75%" }}></div>
            </div>
          </div>

          <div className="progress-item progress-item">
            <div className="progress-header">
              <span>In Progress</span>
              <span>15%</span>
            </div>
            <div className="progress-bar">
              <div className="progress orange-bar" style={{ width: "15%" }}></div>
            </div>
          </div>

          <div className="progress-item pending-item">
            <div className="progress-header">
              <span>Pending</span>
              <span>10%</span>
            </div>
            <div className="progress-bar">
              <div className="progress red-bar" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="box">
          <h2>Recent Activity</h2>

          <div className="activity resolved-activity">
            <div>
              <h4>Hostel Water Issue</h4>
              <p>Resolved successfully</p>
            </div>
            <span className="badge resolved">Resolved</span>
          </div>

          <div className="activity progress-activity">
            <div>
              <h4>Library Internet</h4>
              <p>Work in progress</p>
            </div>
            <span className="badge progress-badge">In Progress</span>
          </div>

          <div className="activity pending-activity">
            <div>
              <h4>Classroom Fan Repair</h4>
              <p>Assigned to maintenance</p>
            </div>
            <span className="badge pending">Pending</span>
          </div>
        </div>

      </div>
    </div>
  );
}
