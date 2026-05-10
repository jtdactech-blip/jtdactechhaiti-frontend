import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.png";

const menu = [
  { to: "/dashboard", label: "Tableau de bord", icon: "◫" },
  { to: "/employees", label: "Employes", icon: "◯" },
  { to: "/clients", label: "Clients", icon: "◎" },
  { to: "/backoffice/products", label: "Produits", icon: "□" },
  { to: "/backoffice/services", label: "Services", icon: "△" },
  { to: "/orders", label: "Commandes", icon: "▣" },
  { to: "/proformas", label: "Proformas", icon: "◇" },
  { to: "/invoices", label: "Factures", icon: "◈" },
  { to: "/finance", label: "Finances", icon: "◧" },
  { to: "/reports", label: "Rapports", icon: "▤" },
  { to: "/subscription", label: "Abonnement", icon: "◌" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="backoffice-sidebar">
      <Link to="/dashboard" className="brand-lockup">
        <img src={logo} alt="JT.DACTECH logo" />
        <div className="brand-copy">
          <p className="brand-title">JT.DACTECH</p>
          <p className="brand-subtitle">Back-office intelligent</p>
        </div>
      </Link>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`sidebar-link${location.pathname === item.to ? " is-active" : ""}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p style={{ margin: 0, fontWeight: 700 }}>Espace securise</p>
        <p style={{ margin: "8px 0 0", color: "rgba(226,232,240,0.78)" }}>
          Navigation unifiee pou tout paj prensipal yo ak menm layout ak mockup la.
        </p>
      </div>
    </aside>
  );
}
