export default function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`skeleton-row-${rowIndex}`} style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 10 }}>
          {Array.from({ length: columns }).map((__, columnIndex) => (
            <div
              key={`skeleton-cell-${rowIndex}-${columnIndex}`}
              style={{
                height: 18,
                borderRadius: 8,
                background: "linear-gradient(90deg, #e2e8f0, #f8fafc, #e2e8f0)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
