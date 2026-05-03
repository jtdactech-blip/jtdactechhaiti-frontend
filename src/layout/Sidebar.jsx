// 📍 PATH: frontend/src/layout/Sidebar.jsx

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "250px",
      background: "#111827",
      color: "white",
      padding: "20px"
    }}>
      <h2>🚀 SaaS App</h2>

      <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link style={linkStyle} to="/dashboard">📊 Dashboard</Link>
        <Link style={linkStyle} to="/orders">📦 Orders</Link>
        <Link style={linkStyle} to="/products">🛒 Products</Link>
        <Link style={linkStyle} to="/subscription">💳 Subscription</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};