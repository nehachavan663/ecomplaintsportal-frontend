import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./contact.css";
import HomeLayout from "../../layouts/HomeLayouts";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // ✅ START LOADING

    try {
      const res = await axios.post(
        "https://ecomplaintsportal-backend.onrender.com/api/contact",
        formData
      );

      // ✅ SUCCESS POPUP
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: res.data,
        confirmButtonColor: "#3085d6"
      });

      // ✅ RESET FORM
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      console.error(error);

      // ❌ ERROR POPUP
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#d33"
      });
    }

    setLoading(false); // ✅ STOP LOADING
  };

  return (
    <HomeLayout>
      <section className="contact-page">

        <h1>Contact & Support</h1>

        <p className="subtitle">
          Need help with your complaint, account, or technical issues?
          Our Ecomplaintsportal support team is ready to assist you quickly
          and efficiently.
        </p>

        <p><FaEnvelope className="icon" /> support@ecomplaintsportal.com</p>
        <p><FaPhone className="icon" /> +91 XXXXX XXXXX</p>
        <p><FaMapMarkerAlt className="icon" /> Office Address</p>

        <div className="contact-container">

          {/* LEFT SIDE */}
          <div className="contact-info">

            <div className="card">
              <h3>Office Information</h3>
              <p><strong>Company:</strong> Ecomplaintsportal</p>
              <p><strong>Email:</strong> support@ecomplaintsportal.com</p>
              <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>
            </div>

            <div className="card">
              <h3>Quick Support</h3>
              <p>• Complaint Submission Issues</p>
              <p>• Login / Account Problems</p>
              <p>• Technical Errors & Bugs</p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="right-section">

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <input
                type="email"   // ✅ EMAIL VALIDATION
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

            <div className="card">
              <h3>Connect With Us</h3>
              <p>LinkedIn : /Ecomplaintsportal</p>
              <p>Twitter : @Ecomplaintsportal</p>
              <p>Instagram : @Ecomplaintsportal</p>
            </div>

          </div>

        </div>

      </section>
    </HomeLayout>
  );
}

export default Contact;