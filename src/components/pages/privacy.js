import React from "react";
import HomeLayout from "../../layouts/HomeLayouts";
import "./privacy.css";   // make sure this file exists

function Privacy() {
  return (
    <HomeLayout>
      <section className="privacy-page">
        <h1>Privacy & Data Protection</h1>

        <div className="card">
          <h3>Our Commitment to Privacy</h3>
          <p>
            At Ecomplaintsportal, we value your trust. Protecting your
            personal information is a top priority, and we ensure that
            all data is handled responsibly and securely.
          </p>
        </div>

        <div className="card">
          <h3>Information We Collect</h3>
          <p>
            We collect only essential information required for complaint
            registration, tracking, and communication. This may include
            your name, contact details, and complaint-related information.
          </p>
        </div>

        <div className="card">
          <h3>How We Use Your Information</h3>
          <ul>
            <li>To register and process complaints efficiently</li>
            <li>To provide status updates and notifications</li>
            <li>To improve platform performance and user experience</li>
            <li>To ensure system monitoring and security</li>
          </ul>
        </div>

        <div className="card">
          <h3>Data Security Measures</h3>
          <p>
            We implement authentication controls, secure servers,
            and encrypted technologies to safeguard your data
            against unauthorized access or misuse.
          </p>
        </div>

        <div className="card">
          <h3>Your Rights</h3>
          <p>
            You have the right to request access, correction,
            or deletion of your personal data at any time.
          </p>
        </div>

        <div className="card">
          <h3>Company Responsibility</h3>
          <p>
            This platform is developed and maintained by
            <strong> Fourise Software Solutions Pvt. Ltd.</strong>,
            committed to maintaining high standards of privacy,
            transparency, and digital security.
          </p>
        </div>

      </section>
    </HomeLayout>
  );
}

export default Privacy;