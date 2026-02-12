import React, { useState } from "react";
import "./TrackComplaintStatus.css";


const complaintsData = [
  {
    title: "Water Leakage",
    date: "02-02-2026",
    department: "Civil",
    status: "resolved",
    response: "Issue fixed by maintenance team",
  },
  {
    title: "Power Failure",
    date: "01-02-2026",
    department: "Electrical",
    status: "pending",
    response: "Complaint received. Under review",
  },
  {
    title: "Broken Classroom",
    date: "31-01-2026",
    department: "Infrastructure",
    status: "inprogress",
    response: "Maintenance team assigned.",
  },
];

const TrackComplaintStatus = () => {
  const [search, setSearch] = useState("");

  const filteredComplaints = complaintsData.filter((c) =>
    `${c.title} ${c.department} ${c.status}`
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
                {/* The CSS now handles the single-line layout */}
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
                  {filteredComplaints.map((c, index) => (
                    <tr key={index}>
                      <td>{c.title}</td>
                      <td>{c.date}</td>
                      <td>{c.department}</td>
                      <td>
                        <span className={`status ${c.status}`}>
                          {c.status === "resolved" && "Resolved ✅"}
                          {c.status === "pending" && "Pending ⏳"}
                          {c.status === "inprogress" && "In Progress 🔄"}
                        </span>
                      </td>
                      <td>
                        <div className="admin-response-card">
                          {c.response}
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
