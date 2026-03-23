import React, { useState, useEffect } from "react";
import "./ManageDepartment.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ManageDepartment = () => {

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true);

  const [formData, setFormData] = useState({
    department: "",
    staffName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    status: "Active"
  });

  const [staffList, setStaffList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      department: "",
      staffName: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      status: "Active"
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {

      fetch(`https://ecomplaintsportal-backend.onrender.com/api/departments/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(updated => {

        setStaffList(
          staffList.map(s =>
            s.id === editId ? updated : s
          )
        );

        resetForm();
      });

    } else {

      fetch("https://ecomplaintsportal-backend.onrender.com/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(newStaff => {

        setStaffList([...staffList, newStaff]);

        resetForm();
      });

    }
  };

  const handleEdit = (staff) => {
    setFormData(staff);
    setEditId(staff.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {

    fetch(`https://ecomplaintsportal-backend.onrender.com/api/departments/${id}`, {
      method: "DELETE"
    }).then(() => {

      setStaffList(
        staffList.filter(s => s.id !== id)
      );

    });

  };

  useEffect(() => {

    setLoading(true);

    fetch("https://ecomplaintsportal-backend.onrender.com/api/departments")
      .then(res => res.json())
      .then(data => {
        setStaffList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  const filteredStaff = staffList.filter(staff =>
    staff.department?.toLowerCase().includes(search.toLowerCase()) ||
    staff.staffName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="md-page">

      <div className="md-page-title">
        <h2>Manage Department Staff</h2>
      </div>

      {/* TOP BAR */}

      <div className="md-top-bar">

        {/* SEARCH */}

        <div className="md-filter-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search Departments"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        {/* ADD BUTTON */}

        <button
          className="md-create-btn"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-plus-circle"></i>
          Add Department Staff
        </button>

      </div>

      {/* MODAL */}

      {showForm && (
        <div className="md-modal-overlay">

          <div className="md-modal-box">

            <div className="md-modal-header">
              <h3>{editId ? "Edit Staff" : "Create Department Staff"}</h3>
              <span onClick={resetForm}>×</span>
            </div>

            <form className="md-form" onSubmit={handleSubmit}>

              <input
                name="department"
                placeholder="Department Name"
                value={formData.department}
                onChange={handleChange}
                required
              />

              <input
                name="staffName"
                placeholder="Staff Name"
                value={formData.staffName}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Staff Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                name="role"
                placeholder="Role (Manager / Technician)"
                value={formData.role}
                onChange={handleChange}
              />

              {!editId && (
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              )}

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <button className="md-submit-btn">
                {editId ? "Update Staff" : "Create Staff"}
              </button>

            </form>

          </div>

        </div>
      )}

      {/* TABLE */}

      <div className="md-table-card">

        <div className="md-table-scroll">

          <table className="md-table">

            <thead>
              <tr>
                <th>Department</th>
                <th>Staff Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

            {loading ? (
              <tr>
                <td colSpan="7">
                  <div className="md-loading-wrapper">
                    <div className="md-loader"></div>
                    <p>Loading departments...</p>
                  </div>
                </td>
              </tr>
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="7">No staff added</td>
              </tr>
            ) : (

              filteredStaff.map((staff) => (

                <tr key={staff.id}>

                  <td>{staff.department}</td>
                  <td>{staff.staffName}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.role}</td>
                  <td>{staff.status}</td>

                  <td className="md-actions">

                    <button
                      className="md-edit-btn"
                      onClick={() => handleEdit(staff)}
                    >
                      <i className="bi bi-pencil"></i>
                      Edit
                    </button>

                    <button
                      className="md-delete-btn"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <i className="bi bi-trash"></i>
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageDepartment;