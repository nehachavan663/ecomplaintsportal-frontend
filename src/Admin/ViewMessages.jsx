import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Viewmessages.css";

function ViewMessages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://ecomplaintsportal-backend.onrender.com/api/contact"
      );

      setMessages(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load messages", "error");
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async (id) => {
    const { value: text } = await Swal.fire({
      title: "Send Reply",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Send",
      confirmButtonColor: "#22c55e",
      inputValidator: (value) => {
        if (!value) return "Please enter a reply!";
      }
    });

    if (!text) return;

    try {
      await axios.put(
        `https://ecomplaintsportal-backend.onrender.com/api/contact/${id}`,
        { adminResponse: text }
      );

      Swal.fire({
        icon: "success",
        title: "Reply Sent!",
        timer: 1500,
        showConfirmButton: false
      });

      fetchMessages();
    } catch {
      Swal.fire("Error", "Failed to send reply", "error");
    }
  };

  // ✅ highlight function
  const highlightText = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === search.toLowerCase()
        ? <mark key={i}>{part}</mark>
        : part
    );
  };

const filteredMessages = messages.filter((msg) => {
  const text = debouncedSearch.toLowerCase().trim();

  const name = (msg.name || "").toLowerCase();
  const email = (msg.email || "").toLowerCase();
  const subject = (msg.subject || "").toLowerCase();
  const message = (msg.message || "").toLowerCase();
  const reply = (msg.adminResponse || "").toLowerCase();

  // ✅ ONLY filter when text exists
  const matchesSearch = text
    ? (
        name.includes(text) ||
        email.includes(text) ||
        subject.includes(text) ||
        message.includes(text) ||
        reply.includes(text)
      )
    : true;

  const matchesStatus =
    statusFilter === "all" ||
    (statusFilter === "replied" && msg.adminResponse) ||
    (statusFilter === "pending" && !msg.adminResponse);

  return matchesSearch && matchesStatus;
});
const handleDelete = async (id) => {
  if (!id) {
    Swal.fire("Error", "Invalid ID", "error");
    return;
  }

  const confirm = await Swal.fire({
    title: "Delete message?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete"
  });

  if (!confirm.isConfirmed) return;

  try {
    await axios.delete(
      `https://ecomplaintsportal-backend.onrender.com/api/contact/${id}`
    );

    // 🔥 instant UI update
    setMessages(prev => prev.filter(m => (m.id || m._id) !== id));

    Swal.fire("Deleted!", "Message removed", "success");

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Delete failed", "error");
  }
};
  return (
    <div className="messages-container">

      <h2>📩 Messages</h2>

      {/* FILTER */}
     <div className="filter-bar">

<div className="search-box">
    <i className="bi bi-search" style={{
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#16a34a"
    }}></i>

    <input
      type="text"
      placeholder="Search messages..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ paddingLeft: "35px" }}
    />
  </div>

 <div className="filter-select">
  <i className="bi bi-funnel"></i>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All</option>
    <option value="replied">Replied</option>
    <option value="pending">Pending</option>
  </select>
</div>

  <button
    className="reset-btn"
    onClick={() => {
      setSearch("");
      setStatusFilter("all");
    }}
  >
    <i className="bi bi-arrow-clockwise"></i> Reset
  </button>

</div>

      <p>Showing {filteredMessages.length} results</p>

      {loading ? (
        <div className="vm-loading-wrapper">
          <div className="vm-loader"></div>
          <p>Loading messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <p>No matching results found</p>
      ) : (

        <div className="table-wrapper">
          <table className="messages-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Reply</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
  {filteredMessages.map((msg) => {
    const id = msg.id || msg._id;   // 🔥 universal fix

    return (
      <tr key={id}>
        
        <td>{msg.name}</td>
        <td>{msg.email}</td>
        <td>{msg.subject}</td>
        <td>{msg.message}</td>

        <td className="reply-cell">
          {msg.adminResponse ? (
            <>
              <div
                className="old-reply"
                onClick={() =>
                  Swal.fire("Full Reply", msg.adminResponse)
                }
              >
                {highlightText(msg.adminResponse, debouncedSearch)}
              </div>

              <span className="status replied">✔ Replied</span>
            </>
          ) : (
            <>
              <span className="status pending">No Reply</span>

              <button
                className="send-btn"
                onClick={() => sendReply(id)}
              >
                ↩ Reply
              </button>
            </>
          )}
        </td>

        <td className="action-cell">
          <div>
            <button
              className="edit-btn"
              onClick={() => sendReply(id)}
            >
              <i className="bi bi-pencil"></i>
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </td>

      </tr>
    );
  })}
</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewMessages;