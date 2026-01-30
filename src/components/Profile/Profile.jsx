import { useState } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLayout from "../../layouts/HomeLayouts";
function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [student, setStudent] = useState({
    name: "Alexa R",
    rollNo: "109CS23063",
    department: "Computer Science",
    className: "3rd Year A",   // ✅ added
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
  };

  return (
    <HomeLayout>
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
              Edit Profile
            </button>
          ) : (
            <button className="edit-btn" onClick={handleSave}>
              Save Profile
            </button>
          )}

          <button className="logout-btn">Log Out</button>
        </div>

        {/* Right Content */}
        <div className="content">
          {/* Student Information */}
          <div className="card">
            <h3>Student Information</h3>

            <p>
              <span>Full Name</span> :
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.name}`
              )}
            </p>

            <p>
              <span>Roll No</span> :
              {isEditing ? (
                <input
                  type="text"
                  name="rollNo"
                  value={student.rollNo}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.rollNo}`
              )}
            </p>

            <p>
              <span>Department</span> :
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={student.department}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.department}`
              )}
            </p>

            <p>
              <span>Class</span> :
              {isEditing ? (
                <input
                  type="text"
                  name="className"
                  value={student.className}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.className}`
              )}
            </p>
          </div>

          {/* Contact Information */}
          <div className="card light">
            <h3>Contact Information</h3>

            <p>
              <span>Email</span> :
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.email}`
              )}
            </p>

            <p>
              <span>Phone No</span> :
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={student.phone}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.phone}`
              )}
            </p>

            <p>
              <span>Address</span> :
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                />
              ) : (
                ` ${student.address}`
              )}
            </p>
          </div>

          {/* Complaint Summary */}
          <div className="complaint-summary">
            <h3>Complaint Summary</h3>
            <p className="total-complaints">Total Complaints: 12</p>

            <div className="status-row">
              <div className="status-badge status-pending">Pending : 5</div>
              <div className="status-badge status-progress">
                In progress : 4
              </div>
              <div className="status-badge status-resolved">Resolved : 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
}

export default Profile;