import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Pie, Bar } from "react-chartjs-2";
import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";
import {  FaBuilding, FaChartBar } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
const navigate = useNavigate();
const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  categoryStats: {}
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://ecomplaintsportal-backend.onrender.com/api/admin/dashboard")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard:", err);
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [
          stats.pending || 0,
          stats.inProgress || 0,
          stats.resolved || 0
        ],
        backgroundColor: ["#ff9f43", "#9b59b6", "#38b764"],
      },
    ],
  };

 const labels = Object.keys(stats.departmentStats || {});
const data = Object.values(stats.departmentStats || {});

const categoryData = {
  labels: labels,
  datasets: [
    {
      data: data,
      backgroundColor: [
        "#4CAF50",
        "#FF9800",
        "#2196F3",
        "#9C27B0",
        "#00BCD4",
        "#E91E63",
        "#FFC107",
        "#795548",
        "#607D8B"
      ]
    }
  ]
};

  if (loading) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

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
          <FaSpinner className={stats.inProgress > 0 ? "spin" : ""} />
          <h2>{stats.inProgress}</h2>
          <p>In Progress</p>
        </div>

        <div className="card">
          <FaCheckCircle />
          <h2>{stats.resolved}</h2>
          <p>Resolved</p>
        </div>
      </div>
      <div className="mini-stats">
 
</div>

      {/* Charts + Quick Section */}
      <div className="dashboard-grid">

        <div className="panel chart">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        <div className="panel chart">
          <h3>Complaints by Category</h3>
        {categoryData.datasets[0].data.some(v => v > 0) ? (
  <Pie
    data={categoryData}
    options={{
      plugins: {
        legend: {
          display: true
        }
      },
      maintainAspectRatio: false
    }}
  />
) : (
  <div style={{textAlign:"center", padding:"40px", color:"#777"}}>
    No category data available
  </div>
)}
        </div>

    <div className="panel quick-actions">
  <h3>Quick Actions</h3>

  <div className="quick-card-container">

    <div
      className="quick-card"
      onClick={() => navigate("/admin/manage-complaints")}
    >
      <FaClipboardList className="quick-icon" />
      <span>Manage Complaints</span>
    </div>

    <div
      className="quick-card"
      onClick={() => navigate("/admin/manage-department")}
    >
      <FaBuilding className="quick-icon" />
      <span>Add Departments</span>
    </div>

    <div
      className="quick-card"
      onClick={() => navigate("/admin/reports")}
    >
      <FaChartBar className="quick-icon" />
      <span>Reports</span>
    </div>

  </div>

</div>
      </div>
    </div>
  );
};

export default AdminDashboard;