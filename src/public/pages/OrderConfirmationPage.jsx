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
      .then((res) => setOrder(res.data?.data))
      .catch(() => setMessage("Nou pa rive jwenn detay commande a."));
  }, [id]);

  const paymentMethod = searchParams.get("payment") || "payment";

  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="public-section confirm-card">
          <div className="surface-card">
            <p className="eyebrow" style={{ background: "#dcfce7", color: "#166534" }}>CONFIRMATION</p>
            <h1 style={{ marginBottom: 8 }}>Commande enregistree</h1>
            <p className="surface-muted">
              Methode de paiement: <strong>{paymentMethod}</strong>
            </p>
          </div>

          {message ? <div className="message-banner" style={{ marginTop: 16 }}>{message}</div> : null}

          {order ? (
            <div className="surface-card" style={{ marginTop: 18 }}>
              <h3 style={{ marginTop: 0 }}>Details commande #{order.id}</h3>
              <div className="summary-grid" style={{ marginTop: 18 }}>
                <div className="summary-card">
                  <p className="muted">Client</p>
                  <h3>{order.client_name || order.client?.name || "Client"}</h3>
                </div>
                <div className="summary-card">
                  <p className="muted">Telephone</p>
                  <h3>{order.client_phone || order.client?.phone || "Non precise"}</h3>
                </div>
                <div className="summary-card">
                  <p className="muted">Total</p>
                  <h3>${Number(order.total || 0).toFixed(2)}</h3>
                </div>
              </div>

              <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                {(order.items || []).map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>Article #{item.product_id || item.service_id}</strong>
                      <div className="surface-muted">Quantite: {item.quantity}</div>
                    </div>
                    <div>${Number(item.price || 0).toFixed(2)}</div>
                    <div>${Number(item.subtotal || 0).toFixed(2)}</div>
                    <span className="status-pill success">Valide</span>
                  </div>
                ))}
              </div>

              <div className="button-row" style={{ marginTop: 18 }}>
                <Link to="/products" className="btn-primary">Retour produits</Link>
                <Link to="/services" className="btn-ghost">Voir services</Link>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
