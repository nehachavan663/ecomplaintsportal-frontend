import React from "react";
import "./help.css";

function Help() {
  return (
    <section className="section">
      <h1>Help Center</h1>

      <input className="search" placeholder="Search help topics..." />

      <div className="card">
        <h3>📌 Getting Started</h3>
        <p>Create an account and submit your complaint through dashboard.</p>

        <h3>📊 Tracking Complaints</h3>
        <p>Monitor complaint progress from "My Complaints" section.</p>

        <h3>⚙️ Technical Issues</h3>
        <p>If login or submission fails, contact our support team.</p>

        <h3>💬 Need More Help?</h3>
        <p>Visit Contact page to connect with support staff.</p>
      </div>
    </section>
  );
}

export default Help;