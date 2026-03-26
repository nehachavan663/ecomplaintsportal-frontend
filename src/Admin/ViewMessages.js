import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewMessages() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/contact");
      setMessages(res.data);
    } catch (err) {
      alert("Error fetching messages");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📩 Contact Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg, index) => (
              <tr key={index}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewMessages;