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

  return (
    <div className="page-bg">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="complaint-card">

          <div className="form-header">
            Complaint Registration Form
          </div>

          <p className="subtitle">
            Please fill in the details below to register your complaint.
          </p>

          <div className="mb-3">
            <label className="form-label">
              Complaint Title <span className="required">*</span>
            </label>
            <input
              className="form-control custom-input"
              placeholder="Enter Complaint Title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Complaint Area / Location <span className="required">*</span>
            </label>
            <select
              className="form-select custom-input"
              value={area}
              onChange={(e) => {
                setArea(e.target.value);
                setCategory("");
              }}
            >
              <option value="">Select your complaint Area / Location</option>
              <option>Hostel</option>
              <option>Classroom</option>
              <option>College Campus</option>
              <option>Library</option>
              <option>Laboratory</option>
              <option>Washroom</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Complaint Category <span className="required">*</span>
            </label>
            <select
              className="form-select custom-input"
              disabled={!area}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>
                {area ? "Select complaint category" : "Select area first"}
              </option>
              {area &&
                complaintCategoryMap[area].map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Complaint Description <span className="required">*</span>
            </label>
            <textarea
              className="form-control custom-input"
              rows="4"
              placeholder="Enter Complaint Description"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Upload Image </label>
            <p className="upload-subtext">
              Please upload the image you want to share with us.
            </p>

            <div className="upload-box">
              <input type="file" className="file-input" />
              Choose Image or drop here
            </div>
          </div>

          <div className="submit-wrapper">
            <button className="submit-btn">Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
