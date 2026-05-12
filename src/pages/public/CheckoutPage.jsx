import { useEffect, useMemo, useState } from "react";

import API from "../../services/api";
import Navbar from "../../components/Navbar";
import {
  cartTotal,
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../utils/cart";

const paymentBrandMap = {
  moncash: "MonCash",
  stripe: "VISA",
  paypal: "PayPal",
};

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [methods, setMethods] = useState([]);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCart(getCart());

    API
      .get("/payments/methods")
      .then((res) => setMethods(res.data?.data?.methods || res.data?.methods || []))
      .catch(() => {
        setMethods([
          { code: "moncash", label: "MonCash", status: "active" },
          { code: "stripe", label: "Carte Bancaire", status: "active" },
          { code: "paypal", label: "PayPal", status: "active" },
        ]);
      });
  }, []);

  const amount = useMemo(() => cartTotal(cart).toFixed(2), [cart]);

  const handleSubmit = async () => {
    if (!clientName.trim() || !phone.trim() || !address.trim()) {
      setMessage("Tanpri ranpli non, telephone ak adres kliyan an.");
      return;
    }

    if (!cart.length) {
      setMessage("Panier la vid. Ajoute omwen yon atik avan ou kontinye.");
      return;
    }

    if ((selectedMethod === "stripe" || selectedMethod === "moncash") && !email.trim()) {
      setMessage("Imel kliyan an obligatwa pou metode peman sa a.");
      return;
    }

    try {
      setBusy(true);
      setMessage("");

      const orderRes = await API.post("/orders/public", {
        client_name: clientName,
        client_email: email || undefined,
        client_phone: phone,
        client_address: address,
        tenantId: 1,
        items: cart.map((item) => ({
          product_id: item.kind === "product" ? item.id : undefined,
          service_id: item.kind === "service" ? item.id : undefined,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
      });

      const order = orderRes.data.data;

      const paymentRes = await API.post("/payments/checkout", {
        orderId: order.id,
        method: selectedMethod,
        email: email || undefined,
        phone,
        customerName: clientName,
      });

      clearCart();
      setCart([]);

      const redirectUrl = paymentRes.data?.data?.redirectUrl;

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      window.location.href = `/order-confirmation/${order.id}?payment=${selectedMethod}`;
    } catch (error) {
      console.error(error);
      setMessage("Nou pa rive finalize checkout la kounye a.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="public-section">
          <div className="section-heading">
            <div>
              <h1>Paiement Securise</h1>
              <p>Panel peman an repanse pou li pi pre mockup la ak seleksyon vizyel metod yo.</p>
            </div>
          </div>

          <div className="checkout-grid">
            <section className="surface-card">
              <h3 style={{ marginTop: 0 }}>Panier client</h3>
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                {cart.length ? cart.map((item) => (
                  <div key={`${item.kind}-${item.id}`} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <div className="surface-muted">{item.kind}</div>
                    </div>
                    <div>${Number(item.price).toFixed(2)}</div>
                    <input
                      className="text-input"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => setCart(updateCartQuantity(item.kind, item.id, event.target.value))}
                    />
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => setCart(removeFromCart(item.kind, item.id))}
                    >
                      Retire
                    </button>
                  </div>
                )) : <p className="surface-muted">Panier la vid pou kounye a.</p>}
              </div>
            </section>

            <section className="payment-card">
              <h3 style={{ marginTop: 0 }}>Finaliser la commande</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                <input
                  className="text-input"
                  placeholder="Nom complet"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                />
                <input
                  className="text-input"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className="text-input"
                  placeholder="Telephone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
                <textarea
                  className="text-area"
                  rows="4"
                  placeholder="Adresse"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>

              <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                {(methods.length ? methods : [
                  { code: "moncash", label: "MonCash" },
                  { code: "stripe", label: "Carte Bancaire" },
                  { code: "paypal", label: "PayPal" },
                ]).map((method) => (
                  <label
                    key={method.code}
                    className={`payment-option${selectedMethod === method.code ? " active" : ""}`}
                  >
                    <span>
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.code}
                        checked={selectedMethod === method.code}
                        onChange={(event) => setSelectedMethod(event.target.value)}
                        style={{ marginRight: 10 }}
                      />
                      {method.label}
                    </span>
                    <strong>{paymentBrandMap[method.code] || method.label}</strong>
                  </label>
                ))}
              </div>

              <div style={{ marginTop: 18, textAlign: "center" }}>
                <p className="surface-muted">Montant a payer</p>
                <h2 style={{ margin: 0 }}>${amount} USD</h2>
              </div>

              {message ? <div className="message-banner" style={{ marginTop: 16 }}>{message}</div> : null}

              <button type="button" className="btn-primary" style={{ marginTop: 18, width: "100%" }} disabled={busy} onClick={handleSubmit}>
                {busy ? "Traitement en cours..." : "Proceder au paiement"}
              </button>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
