import { useState, useEffect } from "react";
import "./Reports.css";
import * as XLSX from "xlsx";

// Complaint Type → Category mapping
const complaintCategoryMap = {
  "Electrical Issue": "Electrical & Power Issues",
  "Water Supply Issue": "Water Supply & Sanitation Issues",
  "Cleanliness Issue": "Cleanliness & Hygiene Issues",
  "Room Maintenance": "Hostel & Accommodation Issues",
  "WiFi / Internet Issue": "IT, Network & Digital Services Issues",
  "Noise Issue": "Noise & Disturbance Issues",
  "Security Issue": "Campus Safety & Security Issues",
  "Projector Not Working": "Classroom & Academic Space Issues",
  "Fan / Light Not Working": "Electrical & Power Issues",
  "Smart Board Issue": "Classroom & Academic Space Issues",
  "Road / Pathway Issue": "Garden, Roads & Outdoor Facilities Issues",
  "Street Light Issue": "Electrical & Power Issues",
  "Parking Issue": "Garden, Roads & Outdoor Facilities Issues",
  "Computer / Lab Equipment Issue": "Laboratory Issues",
  "Book Availability Issue": "Library Issues",
  "Washroom Issue": "Water Supply & Sanitation Issues",
  "Administrative Delay": "Administrative Issues",
  "Other": "Miscellaneous / Other Complaints"
};

const Reports = () => {
  const [filters, setFilters] = useState({
    status: "",
    department: "",
    category: "",
    reportType: ""
  });

  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isResetClicked, setIsResetClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          department: "Maintenance Department",
          complaintType: "Electrical Issue",
          status: "Resolved",
          startDate: "2026-01-30",
          completedDate: "2026-02-01",
          complaints: 6
        },
        {
          id: 2,
          department: "IT Support",
          complaintType: "WiFi / Internet Issue",
          status: "In Progress",
          startDate: "2026-02-02",
          completedDate: null,
          complaints: 10
        },
        {
          id: 3,
          department: "Housekeeping Department",
          complaintType: "Cleanliness Issue",
          status: "Pending",
          startDate: null,
          completedDate: null,
          complaints: 4
        },
        {
          id: 4,
          department: "Library",
          complaintType: "Book Availability Issue",
          status: "Resolved",
          startDate: "2026-01-28",
          completedDate: "2026-01-30",
          complaints: 3
        }
      ].map(item => ({
        ...item,
        category: complaintCategoryMap[item.complaintType]
      }));

      setAllReports(data);
      setLoading(false);
    }, 800);
  }, []);

  const clearReset = () => {
    if (isResetClicked) setIsResetClicked(false);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      department: "",
      category: "",
      reportType: ""
    });
    setIsResetClicked(true);
  };

  const today = new Date();

  const filteredReports = isResetClicked
    ? []
    : allReports.filter(r => {
        if (filters.department && r.department !== filters.department) return false;
        if (filters.status && r.status !== filters.status) return false;
        if (filters.category && r.category !== filters.category) return false;

        if (filters.reportType && r.startDate) {
          const start = new Date(r.startDate);

          if (
            filters.reportType === "daily" &&
            start.toDateString() !== today.toDateString()
          ) return false;

          if (
            filters.reportType === "monthly" &&
            (start.getMonth() !== today.getMonth() ||
              start.getFullYear() !== today.getFullYear())
          ) return false;

          if (
            filters.reportType === "yearly" &&
            start.getFullYear() !== today.getFullYear()
          ) return false;
        }

        return true;
      });

  const getStartDate = (r) =>
    r.status === "Pending" ? "Not Started" : r.startDate || "-";

  const getEndDate = (r) =>
    r.status === "Resolved" ? r.completedDate || "-" : "-";

  /* -------- EXPORT FUNCTIONS -------- */

  const downloadExcel = () => {
    if (!filteredReports.length) return;

    const data = filteredReports.map(r => ({
      Department: r.department,
      Category: r.category,
      Status: r.status,
      "Start Date": getStartDate(r),
      "End Date": getEndDate(r),
      "Total Complaints": r.complaints
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "eComplaints_Report.xlsx");
  };

  const downloadWord = () => {
    if (!filteredReports.length) return;

    let html = `
      <h2>eComplaints Report</h2>
      <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <tr>
          <th>Department</th>
          <th>Category</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Complaints</th>
        </tr>
    `;

    filteredReports.forEach(r => {
      html += `
        <tr>
          <td>${r.department}</td>
          <td>${r.category}</td>
          <td>${r.status}</td>
          <td>${getStartDate(r)}</td>
          <td>${getEndDate(r)}</td>
          <td>${r.complaints}</td>
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
  };

  const printReport = () => {
    if (!filteredReports.length) return;
    window.print();
  };

  return (
    <div className="reports-container">
      <h2>eComplaints Report</h2>

      <div className="filters">
        <select name="status" value={filters.status} onFocus={clearReset} onChange={handleChange}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

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


        <select name="reportType" value={filters.reportType} onFocus={clearReset} onChange={handleChange}>
          <option value="">All Time</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <button onClick={resetFilters}>Reset</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Category</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Complaints</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading report...</td>
              </tr>
            ) : filteredReports.length ? (
              filteredReports.map(r => (
                <tr key={r.id}>
                  <td>{r.department}</td>
                  <td>{r.category}</td>
                  <td>{r.status}</td>
                  <td>{getStartDate(r)}</td>
                  <td>{getEndDate(r)}</td>
                  <td>{r.complaints}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No matching complaints found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button disabled={!filteredReports.length} onClick={downloadExcel}>
          Download Excel
        </button>
        <button disabled={!filteredReports.length} onClick={downloadWord}>
          Download Word
        </button>
        <button disabled={!filteredReports.length} onClick={printReport}>
          Print
        </button>
      </div>
    </div>
  );
};

export default Reports;