import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.png";
import { getUserRole, isAdmin } from "../utils/auth";

const menu = [
  { to: "/dashboard", label: "Tableau de bord", icon: "[]", roles: ["admin", "staff", "user"] },
  { to: "/employees", label: "Employes", icon: "()", roles: ["admin"] },
  { to: "/clients", label: "Clients", icon: "<>", roles: ["admin"] },
  { to: "/backoffice/products", label: "Produits", icon: "{}", roles: ["admin"] },
  { to: "/backoffice/services", label: "Services", icon: "/\\", roles: ["admin"] },
  { to: "/orders", label: "Commandes", icon: "##", roles: ["admin"] },
  { to: "/proformas", label: "Proformas", icon: "<>", roles: ["admin"] },
  { to: "/invoices", label: "Factures", icon: "$$", roles: ["admin"] },
  { to: "/finance", label: "Finances", icon: "%%", roles: ["admin"] },
  { to: "/reports", label: "Rapports", icon: "==", roles: ["admin"] },
  { to: "/subscription", label: "Abonnement", icon: "@@", roles: ["admin", "staff"] },
  { to: "/admin/users", label: "Utilisateurs", icon: "++", roles: ["admin"] },
  { to: "/admin/settings", label: "Settings", icon: "--", roles: ["admin"] },
];

export default function Sidebar() {
  const location = useLocation();
  const role = getUserRole();
  const visibleMenu = menu.filter((item) => !item.roles || item.roles.includes(role));

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
        {visibleMenu.map((item) => (
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
        <p style={{ margin: 0, fontWeight: 700 }}>
          {isAdmin() ? "Espace administrateur" : "Espace securise"}
        </p>
        <p style={{ margin: "8px 0 0", color: "rgba(226,232,240,0.78)" }}>
          Navigation unifiee pou tout paj prensipal yo ak menm layout ak mockup la.
        </p>
      </div>
    </aside>
  );
}
