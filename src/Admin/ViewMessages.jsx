import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Viewmessages.css";

function ViewMessages() {

  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState({});

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("https://ecomplaintsportal-backend.onrender.com/api/contact");
      setMessages(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load messages", "error");
    }
  };

  const handleChange = (id, value) => {
    setReply({ ...reply, [id]: value });
  };

  const sendReply = async (id) => {

  if (!reply[id] || reply[id].trim() === "") {
    Swal.fire("Warning", "Please enter a reply", "warning");
    return;
  }

  try {
    await axios.put(
      `https://ecomplaintsportal-backend.onrender.com/api/contact/${id}`,
      { adminResponse: reply[id] }
    );

    Swal.fire({
      icon: "success",
      title: "Reply Sent!",
      text: "Email sent successfully 📧",
      timer: 2000,
      showConfirmButton: false
    });

    setReply({ ...reply, [id]: "" }); // ✅ clear box
    fetchMessages();

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to send reply"
    });
  }
};
  return (
    <div className="messages-container">

      <h2>📩 Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <table className="messages-table">
         <thead>
 <tr>
  <th>Name</th>
  <th>Email</th>
  <th>Subject</th>
  <th>Message</th>
  <th>Reply</th>
</tr>
</thead>

<tbody>
  {messages.map((msg) => (
    <tr key={msg.id}>
      <td>{msg.name}</td>
      <td>{msg.email}</td>
      <td>{msg.subject}</td>   {/* ✅ show subject */}
      <td>{msg.message}</td>

      <td className="reply-cell">

        {/* ✅ SHOW OLD RESPONSE */}
        {msg.adminResponse && (
          <div className="old-reply">
            <strong>Previous:</strong> {msg.adminResponse}
          </div>
        )}

     <textarea
  className="reply-box"
  placeholder="Type your reply..."
  value={reply[msg.id] || ""}   // ✅ ADD THIS
  onChange={(e) => handleChange(msg.id, e.target.value)}
/>

        <button
          className="send-btn"
          onClick={() => sendReply(msg.id)}
        >
          Send
        </button>

      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
}

export default ViewMessages;