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

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/dashboard")
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

  const categoryData = {
    labels: ["Cleanliness", "Water", "Electrical", "Hostel", "Other"],
    datasets: [
      {
        data: [4, 2, 3, 1, 1],
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#2196F3",
          "#9C27B0",
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
      <div className="mini-stats">
 
</div>

      {/* Charts + Quick Section */}
      <div className="dashboard-grid">

        <div className="panel chart">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        <div className="panel chart">
          <h3>Complaints by Category</h3>
         <Pie
  data={categoryData}
  options={{
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false
  }}
/>
        </div>

        <div className="panel quick-actions">
          <h3>Quick Actions</h3>

          <div className="action-card">
            📋 Manage Complaints
          </div>

          <div className="action-card">
            📊 Generate Reports
          </div>

          <div className="action-card">
            📈 View Analytics
          </div>

          <div className="action-card">
            ⚙ System Settings
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;