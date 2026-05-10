import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const services = [
  {
    icon: "</>",
    title: "Developpement Logiciel",
    description: "Applications web, ERP, CRM ak solisyon metye bati sou mezi.",
  },
  {
    icon: "[]",
    title: "Vente de Materiel",
    description: "Ordinateurs, imprimantes, accessories ak materiel reseau biznis.",
  },
  {
    icon: "()))",
    title: "Cameras de Surveillance",
    description: "Installation DVR, IP camera, monitoring ak remote access.",
  },
  {
    icon: "#",
    title: "Reseaux Informatiques",
    description: "Cablage, Wi-Fi pro, firewall, switch ak maintenance reseau.",
  },
];

const stats = [
  { label: "Services actifs", value: "12+" },
  { label: "Clients satisfaits", value: "250+" },
  { label: "Projets livres", value: "140+" },
  { label: "Support", value: "24/7" },
];

export default function HomePage() {
  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">SOLUTIONS TECHNOLOGIQUES POUR HAITI</span>
            <h1 className="hero-title">Solutions Technologiques pour un Avenir Meilleur</h1>
            <p className="hero-text">
              Developpement de logiciel, vente de materiel informatique, installation de
              cameras de surveillance ak reseaux professionnels pou biznis modenn yo.
            </p>

            <div className="button-row">
              <Link to="/services" className="btn-primary">Decouvrir nos services</Link>
              <Link to="/contact" className="btn-secondary">Nous contacter</Link>
            </div>

            <div className="stats-strip">
              {stats.map((item) => (
                <div key={item.label} className="stat-card">
                  <p className="muted">{item.label}</p>
                  <h3 style={{ marginTop: 8, fontSize: "1.8rem" }}>{item.value}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-panel large" />
            <div className="hero-panel mid" />
            <div className="hero-panel small" />
          </div>
        </section>

        <section className="public-section">
          <div className="section-heading">
            <div>
              <h2>Nos Services</h2>
              <p>Seksyon an pran menm esprit icon + label ki nan mockup la.</p>
            </div>
          </div>

          <div className="feature-grid">
            {services.map((service) => (
              <article key={service.title} className="feature-card">
                <div className="feature-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="surface-muted">{service.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
