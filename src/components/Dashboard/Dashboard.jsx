import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CMP</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li>Complaints</li>
          <li>Categories</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main">
        <h1>Online Complaint Management System</h1>

        {/* Stats */}
        <div className="stats">

          <div className="card">
            <h3>Total Complaints</h3>
            <p className="number">123</p>
          </div>

          <div className="card">
            <h3>Resolved</h3>
            <p className="number">106</p>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <p className="number">17</p>
          </div>

          <div className="card">
            <h3>Categories</h3>
            <p className="number">8</p>
          </div>

        </div>

        {/* Charts */}
        <div className="charts">

          <div className="chart">
            <h3>Complaint Working Graph</h3>

            <div className="bars">
              <div style={{ height: "60%" }}></div>
              <div style={{ height: "80%" }}></div>
              <div style={{ height: "40%" }}></div>
              <div style={{ height: "70%" }}></div>
            </div>
          </div>

          <div className="chart">
            <h3>Your Complaints</h3>

            <ul className="complaint-list">
              <li><strong>ID:</strong> 1023 <br /> Internet Issue</li>
              <li><strong>ID:</strong> 1045 <br /> Water Supply</li>
              <li><strong>ID:</strong> 1078 <br /> Electricity</li>
            </ul>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
