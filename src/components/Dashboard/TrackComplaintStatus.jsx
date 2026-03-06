import React, { useState, useEffect } from "react";
import "./TrackComplaintStatus.css";


const TrackComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [preview,setPreview]=useState(null);

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
    <th>
      <i className="bi bi-file-text me-2"></i>
      Complaint
    </th>
    <th>
      <i className="bi bi-calendar-event me-2"></i>
      Date
    </th>
    <th>
      <i className="bi bi-building me-2"></i>
      Assign Department
    </th>
    <th>
      <i className="bi bi-bar-chart-line me-2"></i>
      Status
    </th>
    <th>
      <i className="bi bi-chat-left-text me-2"></i>
      Admin Response
    </th>
    <th>Proof</th>
  </tr>
</thead>

                <tbody>
                  {/* Loading */}
             {loading && (
  <tr>
    <td colSpan="6">
      <div className="table-loader">
        <div className="spinner"></div>
        <p>Fetching complaints...</p>
      </div>
    </td>
  </tr>
)}

                  {/* No Data */}
                  {!loading && filteredComplaints.length === 0 && (
                    <tr>
                      <td colSpan="6">No complaints found</td>
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
          : "inprogress"
      }`}
    >
      {c.status}
    </span>
  </td>

  <td>
    <div className="admin-response-card">
      {c.response || "Waiting for admin response"}
    </div>
  </td>

  {/* ✅ FIXED PROOF COLUMN */}
  <td>
    {c.resolvedImage ? (
      <button
        className="proof-eye"
        onClick={() => setPreview(c.resolvedImage)}
      >
        <i className="bi bi-eye"></i> View
      </button>
    ) : (
      "Waiting"
    )}
  </td>
</tr>
                   
                    ))}
                </tbody>

              </table>
              
            </div>
          </div>

{/* ✅ GLOBAL MODAL POSITION */}
{preview && (
  <div
    className="proof-modal"
    onClick={() => setPreview(null)}
  >
    <img
      src={`data:image/jpeg;base64,${preview}`}
      alt="Proof"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}
        </div>
        
      </div>
      

  );
};

export default TrackComplaintStatus;