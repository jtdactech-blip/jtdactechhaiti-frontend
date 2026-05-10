// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-content">
        <div>
          <h3>JT.DACTECH HAÏTI</h3>
          <p>
            Solutions technologiques modernes pour entreprises,
            institutions et particuliers.
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li>Développement logiciel</li>
            <li>Caméras de surveillance</li>
            <li>Réseaux informatiques</li>
            <li>Support technique</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Port-au-Prince, Haïti</p>
          <p>info@jtdactech.com</p>
          <p>+509 1234 5678</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 JT.DACTECH HAÏTI — Tous droits réservés.
      </div>
    </footer>
  );
}
