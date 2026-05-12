import NotificationBell from "./NotificationBell";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="backoffice-shell">
      <Sidebar />
      <div className="backoffice-main">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <NotificationBell />
        </div>
        {children}
      </div>
    </div>
  );
}
