import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { addToCart } from "../utils/cart";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/services")
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id,
      kind: "service",
      name: service.name,
      price: Number(service.price),
    });

    setMessage(`${service.name} ajoute nan panier la.`);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 40, display: "grid", gap: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div>
            <h1>Services</h1>
            <p>Ajoute sèvis ki enterese kliyan an dirèkteman nan panier la.</p>
          </div>
          <Link to="/checkout" style={buttonLinkStyle}>
            Ale nan checkout
          </Link>
        </div>

        {message ? <div style={messageStyle}>{message}</div> : null}

        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {services.map((service) => (
            <div key={service.id} style={cardStyle}>
              <h3>{service.name}</h3>
              <p style={{ color: "#475569" }}>
                {service.description || "Pa gen deskripsyon pou sèvis sa a."}
              </p>
              <p>${Number(service.price).toFixed(2)}</p>

              <button onClick={() => handleAddToCart(service)} style={buttonStyle}>
                Ajoute nan panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  padding: 20,
  border: "1px solid #ccc",
  borderRadius: 16,
  background: "#fff",
};

const buttonStyle = {
  marginTop: 12,
  border: 0,
  padding: "10px 14px",
  borderRadius: 10,
  background: "#0f766e",
  color: "#fff",
  cursor: "pointer",
};

const buttonLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 10,
  background: "#111827",
  color: "#fff",
  textDecoration: "none",
};

const messageStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  background: "#ecfeff",
  color: "#155e75",
  border: "1px solid #a5f3fc",
};
