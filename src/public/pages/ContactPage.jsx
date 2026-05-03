
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ultraCard = {
  maxWidth: 480,
  margin: "40px auto",
  background: "#fff",
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(16,30,54,0.12)",
  padding: 36,
  display: "flex",
  flexDirection: "column",
  gap: 24,
};
const label = {
  fontWeight: 600,
  color: "#0f172a",
  marginBottom: 6,
};
const input = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  fontSize: 16,
  outline: "none",
  marginBottom: 12,
};
const textarea = {
  ...input,
  minHeight: 100,
  resize: "vertical",
};
const button = {
  background: "linear-gradient(90deg,#0f766e,#2563eb)",
  color: "#fff",
  border: 0,
  borderRadius: 10,
  padding: "14px 0",
  fontWeight: 700,
  fontSize: 18,
  cursor: "pointer",
  marginTop: 8,
  boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
  transition: "background 0.2s",
};
const success = {
  background: "#dcfce7",
  color: "#166534",
  borderRadius: 10,
  padding: "12px 16px",
  fontWeight: 600,
  border: "1px solid #bbf7d0",
};
const error = {
  background: "#fee2e2",
  color: "#991b1b",
  borderRadius: 10,
  padding: "12px 16px",
  fontWeight: 600,
  border: "1px solid #fecaca",
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: "error", text: "Tanpri ranpli tout chan yo." });
      return;
    }
    setSending(true);
    try {
      await axios.post("http://localhost:3000/contact", {
        name,
        email,
        message,
      });
      setFeedback({ type: "success", text: "Mesaj ou voye! Nou pral reponn ou byento." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setFeedback({ type: "error", text: "Echèk: Mesaj la pa pase. Eseye ankò." });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <form style={ultraCard} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", margin: 0, color: "#0f766e" }}>📞 Kontakte Nou</h1>
        <div>
          <label style={label}>Non ou</label>
          <input style={input} value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Jean Pierre" disabled={sending} />
        </div>
        <div>
          <label style={label}>Imel ou</label>
          <input style={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Ex: client@email.com" type="email" disabled={sending} />
        </div>
        <div>
          <label style={label}>Mesaj ou</label>
          <textarea style={textarea} value={message} onChange={e => setMessage(e.target.value)} placeholder="Ekri mesaj ou la..." disabled={sending} />
        </div>
        {feedback && (
          <div style={feedback.type === "success" ? success : error}>{feedback.text}</div>
        )}
        <button type="submit" style={button} disabled={sending}>
          {sending ? "Ap voye..." : "Voye mesaj la"}
        </button>
        <div style={{ textAlign: "center", color: "#64748b", fontSize: 15, marginTop: 10 }}>
          <div>Email: contact@jtdactech.com</div>
          <div>Telefòn: +509 1234-5678</div>
          <div>Adrès: Port-au-Prince, Haïti</div>
        </div>
      </form>
    </>
  );
}
