import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
useEffect(() => {
  axios.get("http://localhost:8080/api/admin/dashboard")
    .then(res => {
      console.log(res.data);   // ADD THIS
      setStats(res.data);
    })
    .catch(err => {
      console.error(err);
    });
}, []);

  const chartData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [stats.pending, stats.inProgress, stats.resolved],
        backgroundColor: ["#ff9f43", "#9b59b6", "#38b764"],
      },
    ],
  };

  return (
    <div className="dashboard">

      {/* Cards */}
      <div className="cards">

        <div className="card">
          <FaClipboardList />
          <h2>{stats.total}</h2>
          <p>Total</p>
        </div>

        <div className="card">
          <FaClock />
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>

        <div className="card">
          <FaSpinner className="spin" />
          <h2>{stats.inProgress}</h2>
          <p>In Progress</p>
        </div>

        <div className="card">
          <FaCheckCircle />
          <h2>{stats.resolved}</h2>
          <p>Resolved</p>
        </div>

      </div>

      {/* Dashboard Panels */}
      <div className="dashboard-grid">

        {/* Chart */}
        <div className="panel chart">
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Table (static for now) */}
        <div className="panel table">
          <h3>Recent Complaints</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>379</td>
                <td>John</td>
                <td>WiFi</td>
                <td><span className="pending">Pending</span></td>
              </tr>

              <tr>
                <td>378</td>
                <td>Jane</td>
                <td>Hostel</td>
                <td><span className="resolved">Resolved</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;