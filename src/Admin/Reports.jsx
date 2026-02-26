import { useState, useEffect } from "react";
import "./Reports.css";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

import {
  FaFilter,
  FaBuilding,
  FaTags,
  FaClock,
  FaSyncAlt,
  FaFileExcel,
  FaFileWord,
  FaPrint
} from "react-icons/fa";

const Reports = () => {

  const [filters, setFilters] = useState({
    status: "",
    department: "",
    category: "",
    reportType: ""
  });

  const [allComplaints, setAllComplaints] = useState([]);
  const [isReset, setIsReset] = useState(false); // only control flag

  // Fetch complaints
  useEffect(() => {
    fetch("http://localhost:8080/api/complaints")
      .then(res => res.json())
      .then(data => {
        setAllComplaints(data);
      })
      .catch(err => {
        console.error("Error fetching complaints:", err);
      });
  }, []);

  const handleChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);

    // Any selection should show table again
    setIsReset(false);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      department: "",
      category: "",
      reportType: ""
    });

    setIsReset(true); // hide table
  };

  const today = new Date();

  const filteredComplaints = allComplaints.filter(c => {

    if (filters.department && c.department !== filters.department) return false;
    if (filters.status && c.status !== filters.status) return false;
    if (filters.category && c.category !== filters.category) return false;

    if (filters.reportType && c.createdAt) {
      const created = new Date(c.createdAt);

      if (
        filters.reportType === "daily" &&
        created.toDateString() !== today.toDateString()
      ) return false;

      if (
        filters.reportType === "monthly" &&
        (created.getMonth() !== today.getMonth() ||
         created.getFullYear() !== today.getFullYear())
      ) return false;

      if (
        filters.reportType === "yearly" &&
        created.getFullYear() !== today.getFullYear()
      ) return false;
    }

    return true;
  });

  const totalComplaints = filteredComplaints.length;

  const getStartDate = (c) =>
    c.startedAt ? new Date(c.startedAt).toLocaleString() : "Not Started";

  const getEndDate = (c) =>
    c.resolvedAt ? new Date(c.resolvedAt).toLocaleString() : "-";

  const downloadExcel = () => {
  if (!filteredComplaints.length) return;

  const data = filteredComplaints.map(c => ({
    Department: c.department,
    Category: c.category,
    Status: c.status,
    "Start Date": getStartDate(c),
    "End Date": getEndDate(c)
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  XLSX.writeFile(wb, "eComplaints_Report.xlsx");

  Swal.fire({
    icon: "success",
    title: "Export Complete",
    text: "Export complete — check your downloads.",
    timer: 2000,
    showConfirmButton: false,
  });
};

const downloadWord = () => {
  if (!filteredComplaints.length) return;

  let html = `
    <h2>eComplaints Report</h2>
    <p><strong>Total Complaints:</strong> ${totalComplaints}</p>
    <table border="1" cellpadding="8" cellspacing="0" width="100%">
      <tr>
        <th>Department</th>
        <th>Category</th>
        <th>Status</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
  `;

  filteredComplaints.forEach(c => {
    html += `
      <tr>
        <td>${c.department}</td>
        <td>${c.category}</td>
        <td>${c.status}</td>
        <td>${getStartDate(c)}</td>
        <td>${getEndDate(c)}</td>
      </tr>
    `;
  });

  html += "</table>";

  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "eComplaints_Report.doc";
  link.click();

  URL.revokeObjectURL(url);

  Swal.fire({
    icon: "success",
    title: "Export Complete",
    text: "Export complete — check your downloads.",
    timer: 2000,
    showConfirmButton: false,
  });
};
  const printReport = () => {
    if (!filteredComplaints.length) return;
    window.print();
  };

  return (
    <div className="reports-container">
      <h2>eComplaints Report</h2>

      <div className="filters">
        <div className="filter-item">
          <FaFilter className="filter-icon" />
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="filter-item">
          <FaBuilding className="filter-icon" />
          <select
  name="department"
  value={filters.department}
  onChange={handleChange}
>
  <option value="">All Departments</option>

  {/* Infrastructure & Maintenance */}
  <option value="Maintenance Department">Maintenance Department</option>
  <option value="Civil Works / Infrastructure Department">
    Civil Works / Infrastructure Department
  </option>
  <option value="Electrical Department">Electrical Department</option>
  <option value="Campus Maintenance">Campus Maintenance</option>
  <option value="Hostel Maintenance">Hostel Maintenance</option>

  {/* Cleanliness */}
  <option value="Housekeeping Department">Housekeeping Department</option>
  <option value="Sanitation Department">Sanitation Department</option>

  {/* Safety */}
  <option value="Campus Security">Campus Security</option>
  <option value="Fire & Safety Department">Fire & Safety Department</option>

  {/* General */}
  <option value="General Complaints Desk">General Complaints Desk</option>

</select>

        </div>

        <div className="filter-item">
          <FaTags className="filter-icon" />
          <select
  name="category"
  value={filters.category}
  onChange={handleChange}
>
  <option value="">All Categories</option>
  <option value="Infrastructure & Facilities Issues">
    Infrastructure & Facilities Issues
  </option>
  <option value="Electrical & Power Issues">
    Electrical & Power Issues
  </option>
  <option value="Water Supply & Sanitation Issues">
    Water Supply & Sanitation Issues
  </option>
  <option value="Cleanliness & Hygiene Issues">
    Cleanliness & Hygiene Issues
  </option>
  <option value="Hostel & Accommodation Issues">
    Hostel & Accommodation Issues
  </option>
  <option value="Classroom & Academic Space Issues">
    Classroom & Academic Space Issues
  </option>
  <option value="Laboratory Issues">
    Laboratory Issues
  </option>
  <option value="Library Issues">
    Library Issues
  </option>
  <option value="IT, Network & Digital Services Issues">
    IT, Network & Digital Services Issues
  </option>
  <option value="Campus Safety & Security Issues">
    Campus Safety & Security Issues
  </option>
  <option value="Garden, Roads & Outdoor Facilities Issues">
    Garden, Roads & Outdoor Facilities Issues
  </option>
  <option value="Administrative Issues">
    Administrative Issues
  </option>
  <option value="Miscellaneous / Other Complaints">
    Miscellaneous / Other Complaints
  </option>
</select>


        </div>

        <div className="filter-item">
          <FaClock className="filter-icon" />
          <select name="reportType" value={filters.reportType} onChange={handleChange}>
            <option value="">All Time</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <button onClick={resetFilters} className="reset-btn">
          <FaSyncAlt /> Reset
        </button>
      </div>

      {!isReset && filteredComplaints.length > 0 && (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c, index) => (
                  <tr key={index}>
                    <td>{c.department}</td>
                    <td>{c.category}</td>
                    <td>{c.status}</td>
                    <td>{getStartDate(c)}</td>
                    <td>{getEndDate(c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "15px", fontWeight: "bold" }}>
            Total Complaints: {totalComplaints}
          </div>

          <div className="actions">
            <button onClick={downloadExcel}>
              <FaFileExcel /> Export Excel
            </button>

            <button onClick={downloadWord}>
              <FaFileWord /> Export Word
            </button>

            <button onClick={printReport}>
              <FaPrint /> Print
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;