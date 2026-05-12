import { useState } from "react";

import Navbar from "../../components/Navbar";
import API from "../../services/api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback("Tanpri ranpli tout chan obligatwa yo.");
      return;
    }

    setSending(true);
    try {
      await API.post("/contact", { name, email, message, subject });
      setFeedback("Mesaj ou voye. Ekip nou an ap tounen sou ou byento.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setFeedback("Nou pa t rive voye mesaj la kounye a. Eseye ankore.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="public-section">
          <div className="section-heading">
            <div>
              <h1>Contactez-nous</h1>
              <p>Layout la reprann fich kontak + fòm elegant ki nan mockup la.</p>
            </div>
          </div>

          <div className="contact-grid">
            <aside className="contact-card contact-detail">
              <div>
                <h3>Contactez-nous</h3>
                <p className="surface-muted">Nou toujou la pou ba ou devis, support oswa plan pwoje.</p>
              </div>

              <div className="contact-line">
                <strong>Adresse</strong>
                <span className="surface-muted">Delmas 75, Port-au-Prince, Haiti</span>
              </div>

              <div className="contact-line">
                <strong>Telephone</strong>
                <span className="surface-muted">+509 1234 5678</span>
              </div>

              <div className="contact-line">
                <strong>Email</strong>
                <span className="surface-muted">info@jtdactech.com</span>
              </div>

              <div className="contact-line">
                <strong>WhatsApp</strong>
                <span className="surface-muted">+509 1234 5678</span>
              </div>
            </aside>

            <form className="contact-card" onSubmit={handleSubmit}>
              <h3 style={{ marginTop: 0 }}>Envoyez-nous un message</h3>
              <div className="two-column-grid" style={{ marginTop: 18 }}>
                <div>
                  <label htmlFor="contact-name">Nom complet</label>
                  <input
                    id="contact-name"
                    className="text-input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className="text-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label htmlFor="contact-subject">Sujet</label>
                <input
                  id="contact-subject"
                  className="text-input"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <label htmlFor="contact-message">Votre message</label>
                <textarea
                  id="contact-message"
                  className="text-area"
                  rows="6"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>

              {feedback ? <div className="message-banner" style={{ marginTop: 16 }}>{feedback}</div> : null}

              <button type="submit" className="btn-primary" style={{ marginTop: 18 }} disabled={sending}>
                {sending ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
