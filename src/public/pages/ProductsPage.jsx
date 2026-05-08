import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../../services/api";
import { addToCart } from "../utils/cart";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API
      .get("/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      kind: "product",
      name: product.name,
      price: Number(product.price),
    });

    setMessage(`${product.name} ajoute nan panier la.`);
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
            <h1>Products</h1>
            <p>Chwazi pwodwi ou vle mete nan commande kliyan an.</p>
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
          {products.map((product) => (
            <div key={product.id} style={cardStyle}>
              <h3>{product.name}</h3>
              <p style={{ color: "#475569" }}>
                {product.description || "Pa gen deskripsyon pou atik sa a."}
              </p>
              <p>${Number(product.price).toFixed(2)}</p>

              <button onClick={() => handleAddToCart(product)} style={buttonStyle}>
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
