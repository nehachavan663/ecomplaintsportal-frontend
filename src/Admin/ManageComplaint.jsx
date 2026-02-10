import React, { useState } from "react";
import "./ManageComplaint.css";

const ManageComplaint = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      user: "John",
      title: "Water Leakage",
      status: "Pending",
      department: "Civil",
      remarks: "Working",
      date: "02-02-26",
      area: "Hostel A",
      category: "Plumbing",
      description: "Pipe leaking in Block A",
      proof: "/images/img1.jpg"
    },
    {
      id: 2,
      user: "Anita",
      title: "Power Failure",
      status: "In Progress",
      department: "Electrical",
      remarks: "Under Review",
      date: "01-02-26",
      area: "Main Block",
      category: "Electrical",
      description: "No electricity at night",
      proof: "/images/img2.jpg"
    },
    {
      id: 3,
      user: "Alice",
      title: "Broken Room",
      status: "Resolved",
      department: "Civil",
      remarks: "Fixed",
      date: "31-01-26",
      area: "Room B2",
      category: "Infrastructure",
      description: "Wall cracked",
      proof: ""
    }
  ]);

  const [viewData, setViewData] = useState(null);

  /* FILTER STATES */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  /* FILTER LOGIC */
  const filteredComplaints = complaints.filter(c =>
    (c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "" || c.status === statusFilter) &&
    (deptFilter === "" || c.department === deptFilter)
  );

  /* STATUS CHANGE */
  const updateStatus = (id, status) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
  };

  /* DEPARTMENT CHANGE */
  const updateDepartment = (id, department) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, department } : c))
    );
  };

  /* RESPONSE */
  const handleResponse = id => {
    const msg = prompt("Enter remarks:");
    if (!msg) return;
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, remarks: msg } : c))
    );
  };

  /* REMOVE */
  const handleRemove = id => {
    if (!window.confirm("Are you sure you want to remove this complaint?")) return;
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="mc-page">

      <div className="page-title">
        <h2>Manage Complaints</h2>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-grid">
          <input
            placeholder="Search by User / Complaint..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="">All Departments</option>
            <option>Computer Science</option>
            <option>Information Technology (IT)</option>
            <option>Civil</option>
            <option>Electrical</option>
            <option>Mechanical</option>
            <option>Electronics</option>
          </select>

          <button
            className="reset-btn"
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setDeptFilter("");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Complaint</th>
                <th>Status</th>
                <th>Department</th>
                <th>Remarks</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map(c => (
                <tr key={c.id}>
                  <td>{c.user}</td>
                  <td>{c.title}</td>

                  <td>
                    <select
                      className={`status-select ${c.status.replace(" ", "-").toLowerCase()}`}
                      value={c.status}
                      onChange={e => updateStatus(c.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="dept-select"
                      value={c.department}
                      onChange={e => updateDepartment(c.id, e.target.value)}
                    >
                      <option>Computer Science</option>
                      <option>Information Technology (IT)</option>
                      <option>Civil</option>
                      <option>Electrical</option>
                      <option>Mechanical</option>
                      <option>Electronics</option>
                    </select>
                  </td>

                  <td><i>{c.remarks}</i></td>
                  <td>{c.date}</td>

                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" onClick={() => setViewData(c)}>View</button>
                      <button className="response-btn" onClick={() => handleResponse(c.id)}>Response</button>
                      <button className="remove-btn" onClick={() => handleRemove(c.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="7">No complaints found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL (UNCHANGED) */}
      {viewData && (
        <div className="modal-overlay" onClick={() => setViewData(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Complaint Details</h3>
              <span className="close-btn" onClick={() => setViewData(null)}>×</span>
            </div>

            <div className="modal-body">
              {[
                ["User", viewData.user],
                ["Title", viewData.title],
                ["Date", viewData.date],
                ["Area", viewData.area],
                ["Category", viewData.category],
                ["Description", viewData.description],
                ["Department", viewData.department],
                ["Status", viewData.status],
                ["Remarks", viewData.remarks]
              ].map(([label, value]) => (
                <div key={label} className="field">
                  <label>{label}</label>
                  <input value={value} disabled />
                </div>
              ))}
              {viewData.proof && (
  <div className="field">
    <label>Proof</label>
    <div className="proof-box">
      <img src={viewData.proof} alt="Proof" />
    </div>
  </div>
)}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageComplaint;
