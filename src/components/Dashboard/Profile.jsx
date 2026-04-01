import { useState, useEffect } from "react";
import "./Profile.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    fullName: "",
    rollNumber: "",
    department: "",
    className: "",
    email: "",
    phone: "",
    fatherName: "",
    profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
  });

  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    resolved: 0,
  });

  useEffect(() => {

  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    navigate("/");
    return;
  }

  fetchStudent(studentId);
  fetchSummary(studentId);

  const socket = new SockJS("https://ecomplaintsportal-backend.onrender.com/ws");

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000
  });

  client.onConnect = () => {

    // Complaint summary live update
    client.subscribe(`/topic/complaints/${studentId}`, () => {
      fetchSummary(studentId);
    });

    // Profile live update
    client.subscribe(`/topic/profile/${studentId}`, (message) => {

      const updatedProfile = JSON.parse(message.body);

      setStudent({
        fullName: updatedProfile.fullName || "",
        rollNumber: updatedProfile.rollNumber || "",
        department: updatedProfile.department || "",
        className: updatedProfile.className || "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
        fatherName: updatedProfile.fatherName || "",
        profileImage: updatedProfile.profileImage || ""
      });

    });

  };

  client.activate();

  const interval = setInterval(() => {
    fetchSummary(studentId);
  }, 5000);

  return () => {
    clearInterval(interval);
    client.deactivate();
  };

}, [navigate]);


  const fetchStudent = (studentId) => {

    fetch(`https://ecomplaintsportal-backend.onrender.com/api/studentProfile/${studentId}`)
      .then((res) => res.json())
      .then((data) => {

        setStudent({
          fullName: data.fullName || "",
          rollNumber: data.rollNumber || "",
          department: data.department || "",
          className: data.className || "",
          email: data.email || "",
          phone: data.phone || "",
          fatherName: data.fatherName || "",
          profileImage: data.profileImage || ""
        });

      })
      .catch((err) => console.error(err));

  };


  const fetchSummary = (studentId) => {

    fetch(`https://ecomplaintsportal-backend.onrender.com/api/studentProfile/summary/${studentId}`)
      .then((res) => res.json())
      .then((data) => {

        const pending = data.pending || 0;
        const progress = data.progress || 0;
        const resolved = data.resolved || 0;

        setSummary({
          pending: pending,
          progress: progress,
          resolved: resolved,
          total: pending + progress + resolved,
        });

      })
      .catch((err) => console.error(err));

  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value
    });

  };


  const handleImageChange = async (e) => {

  const file = e.target.files[0];
  const studentId = localStorage.getItem("studentId");

  const formData = new FormData();
  formData.append("file", file);

  await fetch(`https://ecomplaintsportal-backend.onrender.com/api/studentProfile/image/${studentId}`, {
    method: "PUT",
    body: formData
  });

  fetchStudent(studentId);
};


  const handleSave = () => {

  const studentId = localStorage.getItem("studentId");

  fetch(`https://ecomplaintsportal-backend.onrender.com/api/studentProfile/${studentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
  .then((res) => res.json())
  .then((data) => {

    setStudent(data);
    setIsEditing(false);

    fetchStudent(studentId);   // refresh data

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile updated successfully.",
      timer: 2000,
      showConfirmButton: false
    });

  })
  .catch((err) => console.error(err));

};

  const handleLogout = () => {

    localStorage.removeItem("studentId");

    Swal.fire({
      icon: "success",
      title: "Logged Out Successfully",
      text: "You have been logged out.",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/");
    });

  };


  return (

    <div className="profile-page">

      <div className="container">

        <div className="profile-card">

          <div className="avatar">
         <img
  src={
    student.profileImage
      ? student.profileImage.startsWith("http")
        ? student.profileImage
        : `https://ecomplaintsportal-backend.onrender.com/api/studentProfile/image/${student.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
  }
  alt="profile"
/>
          </div>

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "12px" }}
            />
          )}

          <h2>{student.fullName}</h2>

          <div className="profile-actions">
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

        </div>


        <div className="content">

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
                  name="fullName"
                  value={student.fullName}
                  onChange={handleChange}
                />
              ) : (
                student.fullName
              )}
            </p>

            <p>
  <span>Father Name :</span>
  {isEditing ? (
    <input
      type="text"
      name="fatherName"
      value={student.fatherName}
      onChange={handleChange}
    />
  ) : (
    student.fatherName
  )}
</p>

            <p>
              <span>Roll No :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="rollNumber"
                  value={student.rollNumber}
                  onChange={handleChange}
                />
              ) : (
                student.rollNumber
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

          </div>


          <div className="complaint-summary">

            <h3>
              <i className="bi bi-clipboard-data"></i>
              Complaint Summary
            </h3>

            <p className="total-complaints">
              Total Complaints: {summary.total}
            </p>

            <div className="status-row">

              <div className="status-badge status-pending">
                <i className="bi bi-clock"></i>
                Pending : {summary.pending}
              </div>

              <div className="status-badge status-progress">
                <i className="bi bi-arrow-repeat"></i>
                In Progress : {summary.progress}
              </div>

              <div className="status-badge status-resolved">
                <i className="bi bi-check-circle-fill"></i>
                Resolved : {summary.resolved}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;