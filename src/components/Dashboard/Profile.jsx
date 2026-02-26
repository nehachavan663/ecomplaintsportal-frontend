import { useState } from "react";
import "./Profile.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "Alexa R",
    rollNo: "109CS23063",
    department: "Computer Science",
    className: "3rd Year A",
    email: "alexa48@gmail.com",
    phone: "6235896324",
    address: "123 Main Street, KLB",
    profileImage:
      "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setStudent({ ...student, profileImage: imageURL });
    }
  };

  const handleSave = () => {
  setIsEditing(false);

  Swal.fire({
    icon: "success",
    title: "Profile Updated",
    text: "Your profile updated successfully.",
    timer: 2000,
    showConfirmButton: false,
  });
};

  const handleLogout = () => {
  Swal.fire({
    icon: "success",
    title: "Logged Out Successfully",
    text: "You have been logged out.",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    navigate("/"); // Redirect to home page
  });
};

  return (

      <div className="profile-page">
        <div className="container">

          {/* Profile Card */}
          <div className="profile-card">
            <div className="avatar">
              <img src={student.profileImage} alt="profile" />
            </div>

            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "12px" }}
              />
            )}

            <h2>{student.name}</h2>

            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil-square"></i> Edit Profile
              </button>
            ) : (
              <button className="edit-btn" onClick={handleSave}>
                <i className="bi bi-save"></i> Save Profile
              </button>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Log Out
            </button>
          </div>

          {/* Right Content */}
          <div className="content">

            {/* Student Information */}
            <div className="card">
              <h3>
                <i className="bi bi-person-lines-fill"></i>
                Student Information
              </h3>

              <p>
                <span>Full Name :</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                  />
                ) : (
                  student.name
                )}
              </p>

              <p>
                <span>Roll No :</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="rollNo"
                    value={student.rollNo}
                    onChange={handleChange}
                  />
                ) : (
                  student.rollNo
                )}
              </p>

              <p>
                <span>Department :</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={student.department}
                    onChange={handleChange}
                  />
                ) : (
                  student.department
                )}
              </p>

              <p>
                <span>Class :</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="className"
                    value={student.className}
                    onChange={handleChange}
                  />
                ) : (
                  student.className
                )}
              </p>
            </div>

            {/* Contact Information */}
            <div className="card light">
              <h3>
                <i className="bi bi-envelope-at"></i>
                Contact Information
              </h3>

              <p>
                <span>Email :</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                  />
                ) : (
                  student.email
                )}
              </p>

              <p>
                <span>Phone No :</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                  />
                ) : (
                  student.phone
                )}
              </p>

              <p>
                <span>Address :</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                  />
                ) : (
                  student.address
                )}
              </p>
            </div>

            {/* Complaint Summary */}
            <div className="complaint-summary">
              <h3>
                <i className="bi bi-clipboard-data"></i>
                Complaint Summary
              </h3>

              <p className="total-complaints">
                Total Complaints: 12
              </p>

              <div className="status-row">
                <div className="status-badge status-pending">
                  <i className="bi bi-clock"></i>
                  Pending : 6
                </div>

                <div className="status-badge status-progress">
                  <i className="bi bi-arrow-repeat"></i>
                  In Progress : 3
                </div>

                <div className="status-badge status-resolved">
                  <i className="bi bi-check-circle-fill"></i>
                  Resolved : 3
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

  );
}

export default Profile;


