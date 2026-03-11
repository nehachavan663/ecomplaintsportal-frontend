import React, { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0
  });

  const [recentComplaints, setRecentComplaints] = useState([]);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {

    // FETCH SUMMARY DATA
    fetch(`http://localhost:8080/api/complaints/student/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setStats({
          total: data.total || 0,
          resolved: data.resolved || 0,
          pending: data.pending || 0,
          inProgress: data.inProgress || 0
        });
      });

    // FETCH RECENT COMPLAINTS
    fetch(`http://localhost:8080/api/complaints/student/${studentId}/complaints`)
      .then(res => res.json())
      .then(data => {
        setRecentComplaints(data.slice(0, 3));
      });

  }, [studentId]);

  const resolvedPercent = stats.total ? (stats.resolved / stats.total) * 100 : 0;
  const progressPercent = stats.total ? (stats.inProgress / stats.total) * 100 : 0;
  const pendingPercent = stats.total ? (stats.pending / stats.total) * 100 : 0;

  return (
    <div className="dashboard-wrapper">

      {/* Stats Cards */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <p>Total Complaints</p>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card green">
          <p>Resolved</p>
          <h2>{stats.resolved}</h2>
        </div>

        <div className="stat-card orange">
          <p>Pending</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className="stat-card yellow">
          <p>In Progress</p>
          <h2>{stats.inProgress}</h2>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">

        {/* Complaint Status */}
        <div className="box">
          <h2>Complaint Status</h2>

          <div className="progress-item">
            <div className="progress-header">
              <span>Resolved</span>
              <span>{resolvedPercent.toFixed(0)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress green-bar"
                style={{ width: `${resolvedPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <span>In Progress</span>
              <span>{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress orange-bar"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <span>Pending</span>
              <span>{pendingPercent.toFixed(0)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress red-bar"
                style={{ width: `${pendingPercent}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="box">
          <h2>Recent Activity</h2>

          {recentComplaints.map((complaint, index) => (
            <div key={index} className="activity">

              <div>
                <h4>{complaint.title}</h4>
                <p>{complaint.description}</p>
              </div>

              <span className={`badge ${complaint.status.toLowerCase()}`}>
                {complaint.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}