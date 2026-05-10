import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/products", label: "Produits" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
  { to: "/checkout", label: "Paiement" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="public-nav">
      <Link to="/" className="brand-lockup">
        <img src={logo} alt="JT.DACTECH logo" />
        <div className="brand-copy">
          <p className="brand-title">JT.DACTECH</p>
          <p className="brand-subtitle">Solutions IT, reseaux, cameras et services pro</p>
        </div>
      </Link>

      <nav className="nav-links">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-link${location.pathname === item.to ? " is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}

        <Link to="/dashboard" className="nav-link nav-cta">
          Demander un devis
        </Link>
      </nav>
    </header>
  );
}
