import React, { useState } from "react";
import "./ComplaintForm.css";


const complaintCategoryMap = {
Hostel: [
    "Electricity Issue",
    "Water Supply Issue",
    "Cleanliness & Hygiene",
    "Room Maintenance",
    "Wi-Fi / Internet Issue",
    "Plumbing Issue",
    "Noise / Disturbance",
    "Security Issue",
    "Other Hostel Issue",
  ],
  Classroom: [
    "Projector / Smart Board Issue",
    "Fan / Light Not Working",
    "Seating / Furniture Issue",
    "Electricity Issue",
    "Cleanliness Issue",
    "Ventilation Problem",
    "Other Classroom Issue",
  ],
  "College Campus": [
    "Cleanliness & Garbage Issue",
    "Road / Pathway Damage",
    "Street Light Not Working",
    "Water Leakage",
    "Garden / Green Area Issue",
    "Security Concern",
    "Parking Issue",
    "Other Campus Issue",
  ],
  Library: [
    "Seating / Study Space Issue",
    "Noise / Discipline Issue",
    "Lighting / Fan Issue",
    "Computer / Internet Issue",
    "Book Availability Issue",
    "Cleanliness Issue",
    "Other Library Issue",
  ],
  Laboratory: [
    "Equipment Not Working",
    "Power Supply Issue",
    "Water / Gas Supply Issue",
    "Safety Concern",
    "Furniture / Seating Issue",
    "Cleanliness Issue",
    "Other Laboratory Issue",
  ],
  Washroom: [
    "Water Supply Issue",
    "Flush Not Working",
    "Cleanliness Issue",
    "Drainage / Blockage",
    "Bad Odour",
    "Lighting Issue",
    "Other Washroom Issue",
  ],
  Other: [
    "Infrastructure Issue",
    "Cleanliness Issue",
    "Safety Concern",
    "Administrative Issue",
    "Miscellaneous Complaint",
    "Other",
  ],
};


const ComplaintForm = () => {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [fileDetails, setFileDetails] = useState({ name: "", size: "" });
  const [loading, setLoading] = useState(false);

  // Helper to convert bytes to readable size
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileDetails({ name: file.name, size: formatBytes(file.size) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Complaint Submitted Successfully ✅");
    }, 2000);
  };

  return (
 
      <div className="pro-page-wrapper">
        <div className="pro-main-container">
          
          {/* LEFT SIDEBAR: STEPS & ANIMATED ILLUSTRATION */}
          <div className="pro-info-sidebar">
            <h2 className="pro-info-title">How it Works?</h2>
            <p className="pro-info-desc">Our streamlined process ensures your concerns are addressed swiftly by the right team.</p>
            
            <div className="pro-steps">
              <div className="pro-step-card step-1">
                <div className="pro-icon-box"><img src="https://img.icons8.com/fluency/48/edit-property.png" alt="step1" /></div>
                <div className="pro-step-text">
                  <h4>Fill Details</h4>
                  <p>Describe the issue and select location.</p>
                </div>
              </div>
              <div className="pro-step-card step-2">
                <div className="pro-icon-box"><img src="https://img.icons8.com/fluency/48/camera.png" alt="step2" /></div>
                <div className="pro-step-text">
                  <h4>Upload Evidence</h4>
                  <p>Attach a photo for better clarity.</p>
                </div>
              </div>
              <div className="pro-step-card step-3">
                <div className="pro-icon-box"><img src="https://img.icons8.com/fluency/48/rocket.png" alt="step3" /></div>
                <div className="pro-step-text">
                  <h4>Track Progress</h4>
                  <p>Receive real-time updates instantly.</p>
                </div>
              </div>
            </div>

            {/* SYNCED FLOATING UNIT */}
            <div className="pro-illustration-container">
              <div className="pro-floating-chip chip-secured">🛡 Secured</div>
              <div className="pro-floating-chip chip-priority">✨ Priority</div>
              <img src="imgae1.png" alt="Support Illustration" className="pro-hero-img" />
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="pro-form-section">
            <div className="pro-heading-card">
              <div className="pro-heading-icon">
                 <img src="https://img.icons8.com/fluency/48/maintenance.png" alt="tools" />
              </div>
              <div className="pro-heading-text">
                <h3>Complaint Registration</h3>
                <p>Official Grievance Submission Portal</p>
              </div>
            </div>
            
            <form className="pro-form-wrapper" onSubmit={handleSubmit}>
              <div className="pro-form-row">
                <div className="pro-input-group">
                  <label className="pro-label">👤 User Name *</label>
                  <input className="pro-input" placeholder="Enter Full Name" required />
                </div>
                <div className="pro-input-group">
                  <label className="pro-label">📅 Date *</label>
                  <input type="date" className="pro-input" required />
                </div>
              </div>

              <div className="pro-input-group">
                <label className="pro-label">🏷️ Complaint Title *</label>
                <input className="pro-input" placeholder="Short issue title" required />
              </div>

              <div className="pro-form-row">
                <div className="pro-input-group">
                  <label className="pro-label">📍 Area *</label>
                  <select className="pro-select" value={area} onChange={(e) => {setArea(e.target.value); setCategory("");}} required>
                    <option value="">Select location</option>
                    {Object.keys(complaintCategoryMap).map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="pro-input-group">
                  <label className="pro-label">📂 Category *</label>
                  <select className="pro-select" disabled={!area} value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">{area ? "Select category" : "Select area first"}</option>
                    {area && complaintCategoryMap[area].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="pro-input-group">
                <label className="pro-label">📝 Description *</label>
                <textarea className="pro-textarea" rows="3" maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe details clearly..." required />
                <div className="pro-char-limit">{description.length}/300</div>
              </div>

              <div className="pro-input-group">
                <label className="pro-label">📸 Upload Image</label>
                <label className="pro-upload-zone">
                  <input type="file" className="pro-file-hidden" accept="image/*" onChange={handleFileChange} />
                  <div className="pro-upload-content">
                    {fileDetails.name ? (
                      <div className="pro-file-info">
                        <span className="pro-file-name">✅ {fileDetails.name}</span>
                        <span className="pro-file-size">Size: {fileDetails.size}</span>
                      </div>
                    ) : (
                      <span>Click or drag image here</span>
                    )}
                  </div>
                </label>
              </div>

              <button type="submit" className={`pro-submit-btn ${loading ? "btn-loading" : ""}`} disabled={loading}>
                {loading ? <div className="pro-spinner"></div> : "🚀 Submit Official Complaint"}
              </button>
            </form>
          </div>
        </div>
      </div>

  );
};

export default ComplaintForm;