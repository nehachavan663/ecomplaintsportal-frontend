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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

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
    <>

      {/* Cards */}
      <div className="cards">

        <div className="card">
          <FaClipboardList className="card-icon blue" />
          <h2>480</h2>
          <span>Total</span>
        </div>

        <div className="card orange">
          <FaClock className="card-icon orange-icon" />
          <h2>120</h2>
          <span>Pending</span>
        </div>

        <div className="card purple">
          <FaSpinner className="card-icon purple-icon spin" />
          <h2>65</h2>
          <span>In Progress</span>
        </div>

        <div className="card green">
          <FaCheckCircle className="card-icon green-icon" />
          <h2>295</h2>
          <span>Resolved</span>
        </div>

      </div>

      {/* Chart */}
      <div className="chart">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>

      {/* Table */}
      <div className="table-box">

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
              <td className="badge pending">Pending</td>
            </tr>

            <tr>
              <td>378</td>
              <td>Jane</td>
              <td>Hostel</td>
              <td className="badge resolved">Resolved</td>
            </tr>

          </tbody>

        </table>

      </div>

    </>
  );
};

export default AdminDashboard;
