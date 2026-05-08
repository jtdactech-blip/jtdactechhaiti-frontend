import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import API from "../../services/api";
import Navbar from "../components/Navbar";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API
      .get(`/orders/public/${id}`)
      .then((res) => setOrder(res.data.data))
      .catch((err) => {
        console.error(err);
        setMessage("Nou pa rive jwenn detay commande a.");
      });
  }, [id]);

  const paymentMethod = searchParams.get("payment") || "payment";

  return (
    <>
      <Navbar />

      <div style={{ padding: 40, display: "grid", gap: 24 }}>
        <section style={cardStyle}>
          <p style={{ margin: 0, color: "#0f766e", fontWeight: 700 }}>
            CONFIRMATION
          </p>
          <h1 style={{ margin: "6px 0" }}>Commande ou an anrejistre</h1>
          <p style={{ margin: 0, color: "#475569" }}>
            Metòd peman an: <strong>{paymentMethod}</strong>
          </p>
        </section>

        {message ? <section style={messageStyle}>{message}</section> : null}

        {order ? (
          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Detay commande #{order.id}</h2>
            <p><strong>Kliyan:</strong> {order.client_name}</p>
            <p><strong>Imel:</strong> {order.client_email || "Pa presize"}</p>
            <p><strong>Telefòn:</strong> {order.client_phone || "Pa presize"}</p>
            <p><strong>Adrès:</strong> {order.client_address || "Pa presize"}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ${Number(order.total).toFixed(2)}</p>

            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {(order.items || []).map((item) => (
                <div key={item.id} style={itemStyle}>
                  <span>
                    Atik #{item.product_id || item.service_id} x {item.quantity}
                  </span>
                  <strong>${Number(item.subtotal).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              <Link to="/products" style={linkStyle}>Tounen sou pwodwi yo</Link>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

const cardStyle = {
  padding: 24,
  borderRadius: 18,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const messageStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  background: "#ecfeff",
  color: "#155e75",
  border: "1px solid #a5f3fc",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
};

const linkStyle = {
  display: "inline-flex",
  padding: "10px 14px",
  borderRadius: 10,
  background: "#111827",
  color: "#fff",
  textDecoration: "none",
};
