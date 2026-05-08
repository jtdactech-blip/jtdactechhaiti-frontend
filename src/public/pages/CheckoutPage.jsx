import { useEffect, useState } from "react";
import API from "../../services/api";

import Navbar from "../components/Navbar";
import {
  cartTotal,
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../utils/cart";

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
      .then((res) => setMethods(res.data.data.methods || []))
      .catch((err) => console.error(err));
  }, []);

  const handleQuantityChange = (kind, id, quantity) => {
    setCart(updateCartQuantity(kind, id, quantity));
  };

  const handleRemove = (kind, id) => {
    setCart(removeFromCart(kind, id));
  };

  const handleSubmit = async () => {
    if (!clientName.trim()) {
      setMessage("Tanpri antre non kliyan an.");
      return;
    }

    if (!phone.trim()) {
      setMessage("Tanpri antre telefòn kliyan an.");
      return;
    }

    if (!address.trim()) {
      setMessage("Tanpri antre adrès kliyan an.");
      return;
    }

    if (!cart.length) {
      setMessage("Panier la vid. Ajoute omwen yon atik.");
      return;
    }

    if ((selectedMethod === "stripe" || selectedMethod === "moncash") && !email.trim()) {
      setMessage("Antre imel kliyan an pou kontinye ak peman sa a.");
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

      const redirectUrl = paymentRes.data.data.redirectUrl;

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
    <>
      <Navbar />

      <div style={{ padding: 40, display: "grid", gap: 24 }}>
        <div>
          <h1>Peman ak Checkout</h1>
          <p>Fè commande kliyan an, verifye panier la, epi chwazi metòd peman an.</p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1.2fr 0.8fr",
          }}
        >
          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Panier kliyan an</h2>

            {cart.length ? (
              <div style={{ display: "grid", gap: 14 }}>
                {cart.map((item) => (
                  <div
                    key={`${item.kind}-${item.id}`}
                    style={{
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns: "1.4fr 120px 120px 90px",
                      alignItems: "center",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: 14,
                    }}
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ color: "#64748b", fontSize: 14 }}>{item.kind}</div>
                    </div>
                    <div>${Number(item.price).toFixed(2)}</div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.kind, item.id, e.target.value)
                      }
                      style={inputStyle}
                    />
                    <button onClick={() => handleRemove(item.kind, item.id)} style={dangerStyle}>
                      Retire
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Panier la vid pou kounye a.</p>
            )}
          </section>

          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Finalize commande a</h2>

            <label style={labelStyle}>Non kliyan an</label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={inputStyle}
              placeholder="Ex: Jean Pierre"
            />

            <label style={labelStyle}>Imel kliyan an</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Ex: client@email.com"
            />

            <label style={labelStyle}>Telefòn kliyan an</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              placeholder="Ex: 50937123456"
            />

            <label style={labelStyle}>Adrès kliyan an</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              placeholder="Ex: Delmas 75, Port-au-Prince"
            />

            <label style={labelStyle}>Metòd peman</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              style={inputStyle}
            >
              {methods.map((method) => (
                <option key={method.code} value={method.code}>
                  {method.label} - {method.status}
                </option>
              ))}
            </select>

            <div style={{ marginTop: 18, fontWeight: 700 }}>
              Total: ${cartTotal(cart).toFixed(2)}
            </div>

            {message ? <div style={messageStyle}>{message}</div> : null}

            <button onClick={handleSubmit} disabled={busy} style={primaryStyle}>
              {busy ? "Ap trete commande a..." : "Kreye commande a"}
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  padding: 24,
  borderRadius: 18,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "grid",
  gap: 12,
};

const labelStyle = {
  fontWeight: 600,
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
};

const primaryStyle = {
  marginTop: 8,
  border: 0,
  padding: "12px 14px",
  borderRadius: 10,
  background: "#0f766e",
  color: "#fff",
  cursor: "pointer",
};

const dangerStyle = {
  border: 0,
  padding: "10px 12px",
  borderRadius: 10,
  background: "#fee2e2",
  color: "#991b1b",
  cursor: "pointer",
};

const messageStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  background: "#ecfeff",
  color: "#155e75",
  border: "1px solid #a5f3fc",
};
