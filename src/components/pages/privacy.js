import React from "react";
import "./privacy.css";

function Privacy() {
  return (
    <section className="section">
      <h1>Privacy & Data Protection</h1>

      <div className="card">
        <h3>Data Collection</h3>
        <p>
          We collect only necessary information required to manage complaints
          and improve user experience.
        </p>

        <h3>Usage of Information</h3>
        <ul>
          <li>Complaint processing</li>
          <li>User communication</li>
          <li>System improvement</li>
        </ul>

        <h3>Security Practices</h3>
        <p>
          Our platform uses authentication, secure storage, and encryption
          methods to safeguard data.
        </p>

        <h3>User Rights</h3>
        <p>
          Users may request data access, correction, or deletion at any time.
        </p>
      </div>
    </section>
  );
}

export default Privacy;