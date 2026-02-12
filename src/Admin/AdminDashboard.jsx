import React from "react";
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

const data = {
  labels: ["Pending", "In Progress", "Resolved"],
  datasets: [
    {
      label: "Complaints",
      data: [120, 65, 295],
      backgroundColor: ["#ff9f43", "#9b59b6", "#38b764"],
    },
  ],
};

const AdminDashboard = () => {
  return (
    <div className="dashboard">

  {/* Cards */}
  <div className="cards">

    <div className="card">
      <FaClipboardList />
      <h2>480</h2>
      <p>Total</p>
    </div>

    <div className="card">
      <FaClock />
      <h2>120</h2>
      <p>Pending</p>
    </div>

    <div className="card">
      <FaSpinner className="spin" />
      <h2>65</h2>
      <p>In Progress</p>
    </div>

    <div className="card">
      <FaCheckCircle />
      <h2>295</h2>
      <p>Resolved</p>
    </div>

  </div>

  {/* Dashboard Panels Grid */}
  <div className="dashboard-grid">

    {/* Chart Panel */}
    <div className="panel chart">
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>

    {/* Table Panel */}
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