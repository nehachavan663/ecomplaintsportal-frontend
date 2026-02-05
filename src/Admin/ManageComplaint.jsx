import React, { useState } from "react";
import "./ManageComplaint.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      description: "Pipe leaking in Block A",
      area: "Hostel A",
      category: "Plumbing",
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
      description: "No electricity at night",
      area: "Main Block",
      category: "Electrical",
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
      description: "Wall cracked",
      area: "Room B2",
      category: "Infrastructure",
      proof: ""
    }
  ]);

  const [viewData, setViewData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* FILTER */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");


  /* STATUS */
  const handleStatus = (id, status) => {
    setComplaints(
      complaints.map(c =>
        c.id === id ? { ...c, status } : c
      )
    );
  };


  /* DEPARTMENT */
  const handleDepartment = (id, dept) => {
    setComplaints(
      complaints.map(c =>
        c.id === id ? { ...c, department: dept } : c
      )
    );
  };


  /* RESPONSE */
  const handleResponse = (id) => {
    const msg = prompt("Enter Remarks:");
    if (!msg) return;

    setComplaints(
      complaints.map(c =>
        c.id === id ? { ...c, remarks: msg } : c
      )
    );
  };


  /* REMOVE */
  const handleRemove = (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    setComplaints(
      complaints.filter(c => c.id !== id)
    );
  };


  /* STATUS COLOR */
  const getStatusClass = (status) => {
    if (status === "Resolved") return "status-resolved";
    if (status === "In Progress") return "status-progress";
    if (status === "Pending") return "status-pending";
  };


  /* FILTER DATA */
  const filteredData = complaints.filter(item => {
    return (
      (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase())
      ) &&
      (statusFilter === "" || item.status === statusFilter) &&
      (deptFilter === "" || item.department === deptFilter)
    );
  });



  return (
    <div className="mc-page">

      <div className="container py-4">


        {/* FILTER BAR */}
        <div className="filter-bar card shadow-sm mb-3 p-3">

          <div className="filter-grid">

            <input
              type="text"
              className="form-control"
              placeholder="Search by User / Title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <select
              className="form-select"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              <option>Computer Science</option>
              <option>Electrical</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Electronics</option>
              <option>IT</option>
            </select>

            <button
              className="btn btn-secondary"
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
        <div className="card main-card shadow">

          <div className="card-body table-responsive">

            <table className="table table-bordered text-center align-middle">

              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Complaint</th>
                  <th>Status</th>
                  <th>AssignDepartment</th>
                  <th>Remarks</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>


              <tbody>

                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-muted py-3">
                      No Records Found
                    </td>
                  </tr>
                )}

                {filteredData.map(item => (

                  <tr key={item.id}>

                    <td>{item.user}</td>
                    <td>{item.title}</td>

                    <td>
                      <select
                        className={`form-select form-select-sm status-select ${getStatusClass(item.status)}`}
                        value={item.status}
                        onChange={(e) =>
                          handleStatus(item.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>

                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={item.department}
                        onChange={(e) =>
                          handleDepartment(item.id, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option>Computer Science</option>
                        <option>Electrical</option>
                        <option>Mechanical</option>
                        <option>Civil</option>
                        <option>Electronics</option>
                        <option>IT</option>
                      </select>
                    </td>

                    <td><i>{item.remarks}</i></td>

                    <td>{item.date}</td>

                    <td>

                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          setViewData(item);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleResponse(item.id)}
                      >
                        Response
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>



        {/* MODAL */}
        {showModal && viewData && (

          <div
            className="custom-modal-overlay"
            onClick={() => setShowModal(false)}
          >

            <div
              className="custom-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="modal-header">
                <h5>Complaint Details</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>


              <div className="modal-body">

                <div className="register-card">

                  <label>User</label>
                  <input className="form-control" value={viewData.user} disabled />

                  <label>Title</label>
                  <input className="form-control" value={viewData.title} disabled />

                  <label>Date</label>
                  <input className="form-control" value={viewData.date} disabled />

                  <label>Area</label>
                  <input className="form-control" value={viewData.area} disabled />

                  <label>Category</label>
                  <input className="form-control" value={viewData.category} disabled />

                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={viewData.description}
                    disabled
                  />

                  <label>Department</label>
                  <input className="form-control" value={viewData.department} disabled />

                  <label>Status</label>
                  <input className="form-control" value={viewData.status} disabled />

                  <label>Remarks</label>
                  <input className="form-control" value={viewData.remarks} disabled />


                  {/* PROOF IMAGE */}
                  {viewData.proof && (

                    <>
                      <label>Proof</label>

                      <div className="proof-box">

                        <img
                          src={viewData.proof}
                          alt="Proof"
                          className="proof-img"
                        />

                      </div>
                    </>
                  )}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default ManageComplaint;
