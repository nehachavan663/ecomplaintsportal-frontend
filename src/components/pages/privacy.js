import React from "react";
import HomeLayout from "../../layouts/HomeLayouts";
import "./privacy.css";

function Privacy() {
  const cards = [
    {
      title: "Info Collection",
      desc: "We collect essential data for complaint registration and service improvement.",
     icon: (
  <path
    d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
    fill="#2e7d32"
  />
)
    },
    {
      title: "Data Protection",
      desc: "Your information is securely stored and never shared without consent.",
      icon: (
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="#2e7d32" />
    <path d="M8 11V7a4 4 0 118 0v4" stroke="#fff" strokeWidth="2" />
  </>
)
    
    },
    {
      title: "Secure Processing",
      desc: "We ensure safe complaint handling with modern security systems.",
icon: (
  <>
    <path d="M5 3h10l4 4v14H5z" fill="#2e7d32" />
    <path d="M9 12h6M9 16h6M9 8h6" stroke="#fff" strokeWidth="2" />
  </>
)
    },
    {
      title: "Fast Handling",
      desc: "Complaints are processed quickly with real-time tracking support.",
      icon: (
  <>
    <circle cx="12" cy="12" r="9" fill="#2e7d32" />
    <path d="M12 8v4l2 2" stroke="#fff" strokeWidth="2" />
  </>
)
    },
    {
      title: "Transparency",
      desc: "Users can track every step of complaint resolution clearly.",
      icon: (
  <>
    <circle cx="12" cy="12" r="9" fill="#2e7d32" />
    <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" />
  </>
)
    },
    {
      title: "User Rights",
      desc: "You can access, update, or delete your data anytime.",
    icon: (
  <>
    <circle cx="12" cy="12" r="9" fill="#2e7d32" />
    <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" />
  </>
)
    }
    
  ];

  return (
    <HomeLayout>
      <section className="privacy-page">
        <h1>Privacy & Data Protection</h1>

        <div className="card-container">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="#2e7d32"
            
                >
                  {card.icon}
                </svg>
              </div>

              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </HomeLayout>
  );
}

export default Privacy;