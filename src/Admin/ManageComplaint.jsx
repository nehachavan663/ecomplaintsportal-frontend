import React, { useState, useEffect } from "react";
import "./ManageComplaint.css";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";

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

const showSuccess = (title) => {
  Swal.fire({
    icon: "success",
    title,
    timer: 1400,
    showConfirmButton: false,
    background:"#ecfdf5",
    color:"#065f46",
    iconColor:"#22c55e"
  });
};

const ManageComplaint = () => {

  const [complaints, setComplaints] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [departments, setDepartments] = useState([]);

  /* FETCH */
useEffect(() => {
  fetch("http://localhost:8080/api/departments")
    .then(res => res.json())
    .then(data => setDepartments(data))
    .catch(err => console.error(err));
    
  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8080/api/complaints"
      );

      if (!res.ok) {
        throw new Error("Unable to load complaints");
      }

      const data = await res.json();

      setComplaints(Array.isArray(data) ? data : []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchComplaints();

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

  Swal.fire({
    title:"Delete Complaint?",
    text:"This action cannot be undone",
    icon:"warning",
    showCancelButton:true,
    confirmButtonText:"Delete",
    cancelButtonText:"Cancel",
    confirmButtonColor:"#ef4444",
    cancelButtonColor:"#22c55e",
    background:"#f0fdf4",
    color:"#065f46"
  }).then(result=>{

    if(!result.isConfirmed) return;

    fetch(`http://localhost:8080/api/complaints/${id}`,{
      method:"DELETE"
    }).then(()=>{

      setComplaints(prev =>
        prev.filter(c=>c.id!==id)
      );

      showSuccess("Complaint Removed");
    });

  });
};
  /* RESPONSE */
const handleResponse = id => {

  Swal.fire({
    title:"Add Remarks",
    input:"textarea",
    inputPlaceholder:"Write response here...",
    showCancelButton:true,
    confirmButtonText:"Submit",
    confirmButtonColor:"#22c55e",
    background:"#f0fdf4",
    color:"#065f46",
    inputValidator:value=>{
      if(!value){
        return "Response required!";
      }
    }
  }).then(result=>{

    if(!result.value) return;

    updateComplaint(id,{
      response:result.value
    });

    showSuccess("Response Added");
  });
};

  return (
    <div className="mc-page">

      <div className="mc-page-title">
        <h2>Manage Complaints</h2>
      </div>

      {/* FILTER */}{/* FILTER */}
<div className="mc-filter-bar">
  <div className="mc-filter-grid">

    {/* SEARCH */}
    <div className="mc-input-icon">
      <i className="bi bi-search"></i>
      <input
        placeholder="Search complaint..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>

    {/* STATUS */}
    <div className="mc-input-icon">
      <i className="bi bi-activity"></i>
      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>
    </div>

    {/* DEPARTMENT */}
    <div className="mc-input-icon">
      <i className="bi bi-building"></i>
    <select
  value={deptFilter}
  onChange={e => setDeptFilter(e.target.value)}
>
  <option value="">All Departments</option>

  {departments.map((dept) => (
    <option key={dept.id} value={dept.department}>
      {dept.department}
    </option>
  ))}

</select>
    </div>

    {/* RESET */}
    <button
      className="mc-reset-btn"
      onClick={() => {
        setSearch("");
        setStatusFilter("");
        setDeptFilter("");
      }}
    >
      <i className="bi bi-arrow-clockwise"></i>
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
  <th><i className="bi bi-person"></i> User</th>
  <th><i className="bi bi-chat-left-text"></i> Complaint</th>
  <th><i className="bi bi-activity"></i> Status</th>
  <th><i className="bi bi-diagram-3"></i> Department</th>
  <th><i className="bi bi-pencil-square"></i> Remarks</th>
  <th><i className="bi bi-calendar-event"></i> Date</th>
  <th><i className="bi bi-gear"></i> Action</th>
</tr>
</thead>

            <tbody>

{/* ================= LOADING ================= */}
{loading && (
  <tr>
    <td colSpan="7">
      <div className="mc-loading-wrapper">
        <div className="mc-loader"></div>
        <p>Fetching complaints...</p>
      </div>
    </td>
  </tr>
)}

{/* ================= ERROR ================= */}
{error && !loading && (
  <tr>
    <td colSpan="7" className="mc-error">
      ⚠ {error}
    </td>
  </tr>
)}

{/* ================= DATA ================= */}
{!loading && !error && filteredComplaints.map(c => (
  <tr key={c.id}>
    <td>{c.userName}</td>
    <td>{c.title}</td>

    {/* STATUS */}
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

    {/* DEPARTMENT */}
    <td>
      <select
  className="mc-dept-select"
  value={c.department || ""}
  onChange={e =>
    updateComplaint(c.id, {
      department: e.target.value
    })
  }
>

  <option value="">Select</option>

  {departments.map((dept) => (
    <option key={dept.id} value={dept.department}>
      {dept.department}
    </option>
  ))}

</select>
    </td>

    <td><i>{c.response || "No response yet"}</i></td>
    <td>{c.date}</td>

    {/* ACTION */}
    <td>
     <div className="mc-action-buttons">

  <button
    className="mc-view-btn"
    onClick={() => setViewData(c)}
  >
    <i className="bi bi-eye"></i>
    View
  </button>

  <button
    className="mc-response-btn"
    onClick={() => handleResponse(c.id)}
  >
    <i className="bi bi-chat-dots"></i>
    Response
  </button>

  <button
    className="mc-remove-btn"
    onClick={() => handleRemove(c.id)}
  >
    <i className="bi bi-trash"></i>
    Remove
  </button>

  <button
    className="mc-assign-btn"
    onClick={() => autoAssignDepartment(c)}
  >
    <i className="bi bi-lightning"></i>
    Auto Assign
  </button>

</div>
    </td>
  </tr>
))}

{/* ================= EMPTY ================= */}
{!loading && !error && filteredComplaints.length === 0 && (
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

           {/* USER UPLOADED IMAGE */}

{viewData.image && viewData.image.length > 50 && (
  <div className="mc-field">
    <label>User Uploaded Proof</label>
    <div className="mc-proof-box">
      <img
        src={`data:image/jpeg;base64,${viewData.image}`}
        alt="User Proof"
      />
    </div>
  </div>
)}

{/* DEPARTMENT RESOLUTION PROOF */}

{viewData.resolvedImage && (
  <div className="mc-field">
    <label>Department Resolution Proof</label>
    <div className="mc-proof-box">
      <img
        src={`data:image/jpeg;base64,${viewData.resolvedImage}`}
        alt="Department Proof"
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