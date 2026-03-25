import { useState } from "react";
import "./Faqs.css";

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How long does complaint resolution take?",
      answer:
        "Most complaints are resolved within 2–5 working days depending on the department and issue severity.",
    },
    {
      question: "How can I track my complaint status?",
      answer:
        "You can track the progress of your complaint from the 'Complaint Status' page using your complaint ID.",
    },
    {
      question: "Can I submit multiple complaints?",
      answer:
        "Yes, there is no limit to the number of complaints you can register.",
    },
    {
      question: "Can I edit my complaint after submission?",
      answer:
        "You can edit your complaint only before it has been assigned to a department.",
    },
    {
      question: "Who handles hostel-related complaints?",
      answer:
        "Hostel-related complaints are handled by the Hostel Administration Department.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about the complaint system.</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}