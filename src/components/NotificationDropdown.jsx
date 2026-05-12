export default function NotificationDropdown({ notifications, onClear }) {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "calc(100% + 10px)",
        width: 320,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
        border: "1px solid #e2e8f0",
        padding: 16,
        zIndex: 40,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <strong>Notifications</strong>
        <button type="button" className="btn-soft" onClick={onClear}>
          Tout marquer lu
        </button>
      </div>

      <div style={{ display: "grid", gap: 10, maxHeight: 320, overflowY: "auto" }}>
        {notifications.length ? notifications.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 12,
              borderRadius: 12,
              background: item.read ? "#f8fafc" : "#eff6ff",
              border: "1px solid #dbeafe",
            }}
          >
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ marginTop: 4, color: "#475569", fontSize: 14 }}>{item.message}</div>
            <div style={{ marginTop: 8, color: "#94a3b8", fontSize: 12 }}>{item.time}</div>
          </div>
        )) : (
          <div style={{ color: "#64748b", fontSize: 14 }}>Pa gen notifications pou kounye a.</div>
        )}
      </div>
    </div>
  );
}
