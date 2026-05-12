export default function Loader({ label = "Chargement..." }) {
  return (
    <div style={{ display: "grid", placeItems: "center", gap: 12, padding: 24 }}>
      <div
        style={{
          width: 36,
          height: 36,
          border: "4px solid #dbeafe",
          borderTopColor: "#2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <div style={{ color: "#475569", fontSize: 14 }}>{label}</div>
    </div>
  );
}
