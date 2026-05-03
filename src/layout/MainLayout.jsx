//📍 PATH: frontend/src/layout/MainLayout.jsx

import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        padding: "20px",
        background: "#f5f6fa",
        overflowY: "auto"
      }}>
        {children}
      </div>
    </div>
  );
}