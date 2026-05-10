import Navbar from "../components/Navbar";

export default function RequestServicePage() {
  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="public-section">
          <div className="surface-card">
            <h1>Demande de Service</h1>

            <div className="form-grid">
              <input className="text-input" placeholder="Nom complet" />
              <input className="text-input" placeholder="Email" />
              <input className="text-input" placeholder="Téléphone" />

              <select className="select-input">
                <option>Installation Caméra</option>
                <option>Développement Logiciel</option>
                <option>Réseau Informatique</option>
              </select>

              <textarea
                className="text-area"
                rows="5"
                placeholder="Description du projet"
              />

              <button className="btn-primary">
                Envoyer la demande
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
