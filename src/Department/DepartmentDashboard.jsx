import React, { useEffect, useState, useCallback } from "react";
import "./DepartmentDashboard.css";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

import {
Chart as ChartJS,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";



ChartJS.register(
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
);

const DepartmentDashboard = () => {

const navigate = useNavigate();
const department = localStorage.getItem("department")?.trim();

/* LOGIN PROTECTION */

useEffect(() => {
if (!department) navigate("/login");
}, [department, navigate]);

const handleLogout = () => {
localStorage.removeItem("department");
navigate("/");
};

/* STATES */

const [complaints,setComplaints]=useState([]);
const [loading,setLoading]=useState(true);
const [preview,setPreview]=useState(null);
const [viewData,setViewData]=useState(null);

/* FETCH COMPLAINTS */

const fetchComplaints = useCallback(() => {

fetch(`https://ecomplaintsportal-backend.onrender.com/api/complaints/department/${department}`)
.then(res => res.json())
.then(data=>{
setComplaints(data || []);
setLoading(false);
})
.catch(()=>{
setLoading(false);
});

},[department]);

useEffect(()=>{
fetchComplaints();
},[fetchComplaints]);

/* UPDATE */
const updateComplaint = (id, updatedFields) => {

  const existing = complaints.find(c => c.id === id);
  if (!existing) return;

  const updatedComplaint = { ...existing, ...updatedFields };

  // instant UI update
  setComplaints(prev =>
    prev.map(c => (c.id === id ? updatedComplaint : c))
  );

  // backend update
  fetch(`https://ecomplaintsportal-backend.onrender.com/api/complaints/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedComplaint)
  }).catch(err => console.error("Update error:", err));
};

/* RESPONSE */

const handleResponse=id=>{
Swal.fire({
title:"Add Remarks",
input:"textarea",
confirmButtonColor:"#22c55e"
}).then(res=>{
if(!res.value) return;
updateComplaint(id,{response:res.value});
});
};

/* IMAGE UPLOAD */

const handleUpload=(e,id)=>{

const file=e.target.files[0];
if(!file) return;

const reader=new FileReader();

reader.onloadend=()=>{

const base64=reader.result.split(",")[1];

updateComplaint(id,{
resolvedImage:base64,
status:"Resolved"
});

Swal.fire({
icon:"success",
title:"Proof Uploaded"
});

};

reader.readAsDataURL(file);

};

/* ===== COMPLAINT STATS ===== */

const pending = complaints.filter(c=>c.status==="Pending").length;
const progress = complaints.filter(c=>c.status==="In Progress").length;
const resolved = complaints.filter(c=>c.status==="Resolved").length;

/* ===== CHART DATA ===== */

const chartData = {
  labels: ["Pending", "In Progress", "Resolved"],
  datasets: [
    {
      label: "Complaints",
      data: [pending, progress, resolved],

      backgroundColor: [
        "rgba(250,204,21,0.85)",
        "rgba(59,130,246,0.85)",
        "rgba(34,197,94,0.85)"
      ],

      borderColor: [
        "#facc15",
        "#3b82f6",
        "#22c55e"
      ],

      borderWidth: 2,
      borderRadius: 12,
      barThickness: 70,
      hoverBackgroundColor: [
        "#fde047",
        "#60a5fa",
        "#4ade80"
      ]
    }
  ]
};
/* ===== CHART OPTIONS ===== */

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    },

    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#065f46",
      bodyColor: "#065f46",
      borderColor: "#22c55e",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8
    }
  },

  scales: {

    x: {
      grid: {
        display: false
      },
      ticks: {
        color: "#065f46",
        font: {
          size: 14,
          weight: "600"
        }
      }
    },

    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        color: "#065f46",
        font: {
          size: 13
        }
      },
      grid: {
        color: "rgba(34,197,94,0.15)",
        borderDash: [4,4]
      }
    }

  }
};

return(

<div className="dept-page">

{/* ===== VIEW DETAILS MODAL ===== */}

{viewData && (

<div className="dept-modal-overlay" onClick={()=>setViewData(null)}>

  <div className="dept-modal-box" onClick={(e)=>e.stopPropagation()}>

    <div className="dept-modal-header">
      <h3>Complaint Details</h3>
      <span onClick={()=>setViewData(null)}>×</span>
    </div>

    <div className="dept-modal-body">

      {[
        ["User", viewData.userName],
        ["Title", viewData.title],
        ["Area", viewData.area],
        ["Category", viewData.category],
        ["Description", viewData.description],
        ["Department", viewData.department],
        ["Status", viewData.status],
        ["Remarks", viewData.response]
      ].map(([label,value]) => (

        <div key={label} className="dept-field">
          <label>{label}</label>
          <input value={value || ""} disabled />
        </div>

      ))}

      {/* USER IMAGE */}

      {viewData.image && viewData.image.length > 50 && (
        <div className="dept-proof-box">
          <label>User Uploaded Proof</label>
          <img
            src={`data:image/jpeg;base64,${viewData.image}`}
            alt="User Proof"
          />
        </div>
      )}

      {/* DEPARTMENT RESOLUTION IMAGE */}

      {viewData.resolvedImage && (
        <div className="dept-proof-box">
          <label>Resolution Proof</label>
          <img
            src={`data:image/jpeg;base64,${viewData.resolvedImage}`}
            alt="Resolution Proof"
          />
        </div>
      )}

    </div>

  </div>

</div>

)}

{/* HEADER */}

<div className="dept-header">

<div className="dept-header-left">

<div className="dept-icon">
<i className="bi bi-building"></i>
</div>

<div>
<h2>{department} Department Dashboard</h2>
<p>Handle assigned complaints efficiently</p>
</div>

</div>

<div className="dept-header-actions">

<div className="dept-badge">STAFF PANEL</div>

<button className="dept-logout-btn" onClick={handleLogout}>
<i className="bi bi-box-arrow-right"></i> Logout
</button>

</div>

</div>

{/* TABLE */}

<div className="dept-table-card">

<table className="dept-table">

<thead>
<tr>
<th>User</th>
<th>Complaint</th>
<th>Area</th>
<th>Status</th>
<th>Response</th>
<th>Proof</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{loading && (
<tr>
<td colSpan="7">
<div className="dept-loader"></div>
</td>
</tr>
)}

{!loading && complaints.map(c=>(

<tr key={c.id}>

<td>{c.userName}</td>
<td>{c.title}</td>
<td>{c.area}</td>

<td>
<select
className={`dept-status ${c.status?.replace(" ","-").toLowerCase()}`}
value={c.status}
onChange={e=>updateComplaint(c.id,{status:e.target.value})}
>
<option>Pending</option>
<option>In Progress</option>
<option>Resolved</option>
</select>
</td>

<td>{c.response || "-"}</td>

<td>

{c.resolvedImage && (
<button
className="view-proof-btn"
onClick={()=>setPreview(c.resolvedImage)}
>
<i className="bi bi-eye"></i> View
</button>
)}

<label className="upload-btn">
{c.resolvedImage ? "Re-Upload" : "Upload"}
<input
type="file"
hidden
onChange={(e)=>handleUpload(e,c.id)}
/>
</label>

</td>

<td>

<button
className="dept-view-btn"
onClick={()=>setViewData(c)}
>
<i className="bi bi-eye"></i> View
</button>

<button
className="dept-response-btn"
onClick={()=>handleResponse(c.id)}
>
Response
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* CHART */}

<div className="dept-chart-card">

<h3 className="chart-title">
<i className="bi bi-graph-up"></i>
Department Complaint Statistics
</h3>

<div className="chart-wrapper">
<Bar data={chartData} options={chartOptions}/>
</div>

</div>

{/* IMAGE PREVIEW */}

{preview &&(
<div className="proof-modal" onClick={()=>setPreview(null)}>
<img src={`data:image/jpeg;base64,${preview}`} alt=""/>
</div>
)}

</div>

);

};

export default DepartmentDashboard;