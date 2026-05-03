import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 20,
      background: "#111827",
      color: "white"
    }}>
      <h2>JT.Dactech</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Link to="/" style={link}>Home</Link>
        <Link to="/products" style={link}>Products</Link>
        <Link to="/services" style={link}>Services</Link>
        <Link to="/checkout" style={link}>Checkout</Link>
        <Link to="/contact" style={link}>Contact</Link>
        <Link to="/login" style={link}>Login</Link>
      </div>
    </div>
  );
}

const link = { color: "white", textDecoration: "none" };
