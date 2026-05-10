//📍 PATH: frontend/src/layout/MainLayout.jsx

import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="backoffice-shell">
      <Sidebar />
      <div className="backoffice-main">
        {children}
      </div>
    </div>
  );
}
