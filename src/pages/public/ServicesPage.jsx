import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import API from "../../services/api";
import { addToCart } from "../../utils/cart";

const fallbackServices = [
  { id: 1, name: "Installation Camera", description: "Configuration DVR, cablage et acces mobile", price: 150 },
  { id: 2, name: "Installation Reseau", description: "Mise en place routeur, switch et Wi-Fi bureau", price: 200 },
  { id: 3, name: "Developpement Logiciel", description: "Conception application metye sur mesure", price: 500 },
  { id: 4, name: "Maintenance Reseau", description: "Support preventif et diagnostic technique", price: 100 },
  { id: 5, name: "Support Technique", description: "Assistance sur site ou a distance", price: 90 },
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API
      .get("/services")
      .then((res) => {
        const items = Array.isArray(res.data?.data) ? res.data.data : [];
        setServices(items.length ? items : fallbackServices);
      })
      .catch(() => setServices(fallbackServices));
  }, []);

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id,
      kind: "service",
      name: service.name,
      price: Number(service.price),
    });

    setMessage(`${service.name} ajoute nan panier la.`);
  };

  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="public-section">
          <div className="section-heading">
            <div>
              <h1>Demande de Service</h1>
              <p>Seksyon sa a pran menm santiman fòm + lis servis ki nan mockup la.</p>
            </div>
            <Link to="/contact" className="btn-primary">
              Demander un devis
            </Link>
          </div>

          {message ? <div className="message-banner" style={{ marginBottom: 18 }}>{message}</div> : null}

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.id} className="surface-card service-row">
                <div>
                  <h3>{service.name}</h3>
                  <p className="surface-muted">
                    {service.description || "Service professionnel adapte aux besoins clients."}
                  </p>
                </div>
                <strong>${Number(service.price).toFixed(2)}</strong>
                <button type="button" onClick={() => handleAddToCart(service)} className="btn-soft">
                  Ajouter
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
