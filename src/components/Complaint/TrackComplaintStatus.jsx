import React from "react";
import "./TrackComplaintStatus.css";

const complaints = [
  {
    id: "CMP-1023",
    title: "Water Leakage",
    status: "resolved",
    response: "Issue fixed by maintenance team",
  },
  {
    id: "CMP-1024",
    title: "Power Failure",
    status: "pending",
    response: "Complaint received. Under review",
  },
  {
    id: "CMP-1025",
    title: "Broken Classroom",
    status: "inprogress",
    response: "Maintenance team assigned.",
  },
];

const TrackComplaintStatus = () => {
  return (
    <div className="page-bg">
      <div className="track-container">
        <div className="track-card">

          {/* CENTERED HEADER */}
          <div className="track-header">
            🔍 Track Complaint Status
          </div>

          {/* RESPONSIVE TABLE WRAPPER */}
          <div className="table-wrapper">
            <table className="complaint-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Complaint Title</th>
                  <th>Status</th>
                  <th>💬 Admin Response</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.title}</td>
                    <td> 
                      <span className={`status ${c.status}`}>
                        {c.status === "resolved" && " Resolved ✅ "}
                        {c.status === "pending" && "  Pending ⏳"}
                        {c.status === "inprogress" && "In Progress 🔄 "}
                      </span>
                    </td>
                    <td>{c.response}</td>
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
