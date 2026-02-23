import React, { useState, useEffect } from "react";
import "./ManageComplaint.css";

/* ===============================
   AUTO DEPARTMENT MAP
================================ */
const categoryDepartmentMap = {
  "electricity issue": "Electrical",
  "power supply issue": "Electrical",
  "fan / light not working": "Electrical",
  "lighting issue": "Electrical",
  "ac not working": "Electrical",
  "projector / smart board issue": "Electrical",
  "street light not working": "Electrical",

  "water supply issue": "Civil",
  "plumbing issue": "Civil",
  "drainage / blockage": "Civil",
  "road / pathway damage": "Civil",
  "water leakage": "Civil",
  "flush not working": "Civil",
  "broken door lock": "Civil",
  "infrastructure issue": "Civil",

  "equipment not working": "Mechanical",
  "gym equipment not working": "Mechanical",
  "broken instruments": "Mechanical",
  "lift not working": "Mechanical",

  "computer / internet issue": "Information Technology (IT)",
  "wi-fi / internet issue": "Information Technology (IT)",
  "campus wi-fi issue": "Information Technology (IT)",
  "printer not working": "Information Technology (IT)",

  "cleanliness issue": "Housekeeping",
  "cleanliness & garbage issue": "Housekeeping",
  "bad odour": "Housekeeping",
  "no tissue paper": "Housekeeping",

  "security issue": "Security",
  "security concern": "Security",

  "food quality issue": "Canteen",
  "canteen hygiene issue": "Canteen",
  "mess food quality issue": "Canteen",

  "bus delay": "Transport",
  "driver behavior issue": "Transport",
  "overcrowding": "Transport",

  default: "Administration"
};

const ManageComplaint = () => {

  const [complaints, setComplaints] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  /* FETCH */
  useEffect(() => {
    fetch("http://localhost:8080/api/complaints")
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  /* FAST UPDATE (OPTIMISTIC) */
  const updateComplaint = (id, updatedFields) => {

    // instant UI update
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );

    if (viewData && viewData.id === id) {
      setViewData(prev => ({ ...prev, ...updatedFields }));
    }

    // backend update
    const existing = complaints.find(c => c.id === id);
    if (!existing) return;

    fetch(`http://localhost:8080/api/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...existing, ...updatedFields })
    }).catch(err => console.error("Update error:", err));
  };

  /* AUTO ASSIGN */
  const autoAssignDepartment = (complaint) => {
    if (!complaint?.category) return;

    const cleanedCategory = complaint.category.trim().toLowerCase();

    const dept =
      categoryDepartmentMap[cleanedCategory] ||
      categoryDepartmentMap.default;

    updateComplaint(complaint.id, { department: dept });
  };

  /* FILTER */
  const filteredComplaints = complaints.filter(c =>
    (c.userName?.toLowerCase().includes(search.toLowerCase()) ||
      c.title?.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "" || c.status === statusFilter) &&
    (deptFilter === "" || c.department === deptFilter)
  );

  /* DELETE */
  const handleRemove = id => {
    if (!window.confirm("Remove this complaint?")) return;

    fetch(`http://localhost:8080/api/complaints/${id}`, {
      method: "DELETE"
    }).then(() => {
      setComplaints(prev => prev.filter(c => c.id !== id));
      setViewData(null);
    });
  };

  /* RESPONSE */
  const handleResponse = id => {
    const msg = prompt("Enter remarks:");
    if (!msg) return;
    updateComplaint(id, { response: msg });
  };

  return (
    <div className="mc-page">

      <div className="mc-page-title">
        <h2>Manage Complaints</h2>
      </div>

      {/* FILTER */}
      <div className="mc-filter-bar">
        <div className="mc-filter-grid">
          <input
            placeholder="Search..."
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
            <option>Electrical</option>
            <option>Civil</option>
            <option>Mechanical</option>
            <option>Information Technology (IT)</option>
            <option>Housekeeping</option>
            <option>Security</option>
            <option>Canteen</option>
            <option>Transport</option>
            <option>Administration</option>
          </select>

          <button
            className="mc-reset-btn"
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
      <div className="mc-table-card">
        <div className="mc-table-scroll">
          <table className="mc-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Complaint</th>
                <th>Status</th>
                <th>Assing Department</th>
                <th>Remarks</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map(c => (
                <tr key={c.id}>
                  <td>{c.userName}</td>
                  <td>{c.title}</td>

          <td>
  <select
    className={`mc-status-select ${c.status?.replace(" ", "-").toLowerCase()}`}
    value={c.status}
    onChange={e =>
      updateComplaint(c.id, { status: e.target.value })
    }
  >
    <option>Pending</option>
    <option>In Progress</option>
    <option>Resolved</option>
  </select>
</td>

                  <td>
                    <select
                      className="mc-dept-select"
                      value={c.department || ""}
                      onChange={e => updateComplaint(c.id, { department: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option>Electrical</option>
                      <option>Civil</option>
                      <option>Mechanical</option>
                      <option>Information Technology (IT)</option>
                      <option>Housekeeping</option>
                      <option>Security</option>
                      <option>Canteen</option>
                      <option>Transport</option>
                      <option>Administration</option>
                    </select>
                  </td>

                  <td><i>{c.response || "No response yet"}</i></td>
                  <td>{c.date}</td>

                  <td>
                    <div className="mc-action-buttons">
                      <button className="mc-view-btn" onClick={() => setViewData(c)}>View</button>
                      <button className="mc-response-btn" onClick={() => handleResponse(c.id)}>Response</button>
                      <button className="mc-remove-btn" onClick={() => handleRemove(c.id)}>Remove</button>
                      <button className="mc-assign-btn" onClick={() => autoAssignDepartment(c)}>Auto Assign</button>
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

      {/* MODAL */}
      {viewData && (
        <div className="mc-modal-overlay" onClick={() => setViewData(null)}>
          <div className="mc-modal-box" onClick={e => e.stopPropagation()}>
            <div className="mc-modal-header">
              <h3>Complaint Details</h3>
              <span className="mc-close-btn" onClick={() => setViewData(null)}>×</span>
            </div>

            <div className="mc-modal-body">
              {[
                ["User", viewData.userName],
                ["Title", viewData.title],
                ["Date", viewData.date],
                ["Area", viewData.area],
                ["Category", viewData.category],
                ["Description", viewData.description],
                ["Department", viewData.department],
                ["Status", viewData.status],
                ["Remarks", viewData.response]
              ].map(([label, value]) => (
                <div key={label} className="mc-field">
                  <label>{label}</label>
                  <input value={value || ""} disabled />
                </div>
              ))}

              {viewData.image && viewData.image.length > 50 && (
                <div className="mc-field">
                  <label>Proof</label>
                  <div className="mc-proof-box">
                    <img
                      src={`data:image/jpeg;base64,${viewData.image}`}
                      alt="Proof"
                    />
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
