import Loader from "./Loader";

export default function PageLoader({ label }) {
  return (
    <div className="surface-card" style={{ minHeight: 280, display: "grid", placeItems: "center" }}>
      <Loader label={label} />
    </div>
  );
}
