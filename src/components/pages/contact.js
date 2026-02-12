import React from "react";
import { FaEnvelope,FaPhone,FaMapMarkerAlt } from "react-icons/fa";
import "./contact.css";

function Contact() {
  return (
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

        {/* LEFT SIDE INFO */}
        <div className="contact-info">

          <div className="card">
            <h3>📍 Office Information</h3>
            <p><strong>Company:</strong> Ecomplaintsportal</p>
            <p><strong>Email:</strong> support@ecomplaintsportal.com</p>
            <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>

            <p>
              <strong>Business Hours:</strong><br/>
              Monday - Friday : 9AM - 6PM<br/>
              Saturday : 10AM - 2PM
            </p>
          </div>

          <div className="card">
            <h3>⚡ Quick Support</h3>
            <p>• Complaint Submission Issues</p>
            <p>• Login / Account Problems</p>
            <p>• Complaint Status Tracking</p>
            <p>• Technical Errors & Bugs</p>
            <p>• Feedback & Suggestions</p>
          </div>

          <div className="card">
            <h3>⏱ Response Time</h3>
            <p>
              Our support team usually responds within 
              <strong> 24 working hours</strong>.
            </p>
            <p>
              Critical technical issues are prioritized and handled faster.
            </p>
          </div>

          <div className="card">
            <h3>🌐 Connect With Us</h3>
            <p>Stay updated with announcements and service updates.</p>
            <p>LinkedIn : /Ecomplaintsportal</p>
            <p>Twitter : @Ecomplaintsportal</p>
            <p>Instagram : @Ecomplaintsportal</p>
          </div>

          <div className="card">
            <h3>🚨 Urgent Support Notice</h3>
            <p>
              For urgent system outages or security concerns,
              please mention <strong>"URGENT"</strong> in the subject line.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <form className="contact-form">
          <h3>Send Us a Message</h3>

          <input placeholder="Full Name" />
          <input placeholder="Email Address" />
          <input placeholder="Subject" />

          <textarea
            placeholder="Write your message with complete details so we can assist you faster..."
          ></textarea>

          <button>Send Message</button>

          <p className="form-note">
            By submitting this form, you agree to our privacy and support policies.
          </p>
        </form>

      </div>
    </section>
  );
}

export default Contact;