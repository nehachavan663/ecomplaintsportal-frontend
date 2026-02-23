import React, { useState, useEffect } from "react";
import "./TrackComplaintStatus.css";


const TrackComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch complaints from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/complaints")
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setLoading(false);
      });
  }, []);

  // 🔍 Search filter
  const filteredComplaints = complaints.filter((c) =>
    `${c.title} ${c.area} ${c.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  
      <div className="page-bg">
        <div className="track-container">

          {/* TOP TITLE */}
          <div className="top-track-title animate-down">
            <span className="track-icon">🧭</span>
            <span>Track Complaint Status</span>
          </div>

          {/* HEADER */}
          <div className="complaints-header animate-down">
            <div className="header-left">
              <h1>My Complaints</h1>
              <p>Monitor the real-time status of your requests</p>
            </div>

            <div className="header-right">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by title or dept..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="track-card animate-up">
            <div className="table-wrapper">
              <table className="complaint-table">
                <thead>
                  <tr>
                    <th>📌 Complaint</th>
                    <th>📅 Date</th>
                    <th>🏢 Assign Department</th>
                    <th>📊 Status</th>
                    <th>💬 Admin Response</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Loading */}
                  {loading && (
                    <tr>
                      <td colSpan="5">Loading complaints...</td>
                    </tr>
                  )}

                  {/* No Data */}
                  {!loading && filteredComplaints.length === 0 && (
                    <tr>
                      <td colSpan="5">No complaints found</td>
                    </tr>
                  )}

                  {/* Data */}
                  {!loading &&
                    filteredComplaints.map((c) => (
                      <tr key={c.id}>
                        <td>{c.title}</td>
                        <td>{c.date}</td>
                        <td>{c.department || "Not Assigned"}</td>

                        <td>
                          <span
                            className={`status ${
                              c.status === "Resolved"
                                ? "resolved"
                                : c.status === "Pending"
                                ? "pending"
                                : c.status === "In Progress"
                                ? "inprogress"
                                : ""
                            }`}
                          >
                            {c.status === "Resolved" && "Resolved ✅"}
                            {c.status === "Pending" && "Pending ⏳"}
                            {c.status === "In Progress" && "In Progress 🔄"}
                          </span>
                        </td>

                        <td>
                          <div className="admin-response-card">
                            {c.response || "Waiting for admin response"}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
  
  );
};

export default TrackComplaintStatus;