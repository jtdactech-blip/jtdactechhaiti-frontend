export default function EmptyState({
  title = "Aucune donnee",
  description = "Pa gen done pou montre pou kounye a.",
}) {
  return (
    <div className="surface-card" style={{ textAlign: "center", padding: "48px 24px" }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p className="surface-muted" style={{ marginTop: 12 }}>
        {description}
      </p>
    </div>
  );
}
