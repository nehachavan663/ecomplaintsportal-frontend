import React from "react";
import "./TrackComplaintStatus.css";
import HomeLayout from "../../layouts/HomeLayouts";

const complaints = [
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
  return (
    <HomeLayout>
      <div className="page-bg">
        <div className="track-container">
          <div className="track-card">

            {/* HEADER */}
            <div className="track-header">
              🔍 Track Complaint Status
            </div>

            {/* TABLE */}
            <div className="table-wrapper">
              <table className="complaint-table">

                <thead>
                  <tr>
                    <th>Complaint Title</th>
                    <th>Date</th>
                    <th>Assigned Department</th>
                    <th>Status</th>
                    <th>💬 Admin Response</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c, index) => (
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

                      <td>{c.response}</td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default TrackComplaintStatus;
