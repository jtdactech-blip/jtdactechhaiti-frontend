// 📍 frontend/src/components/Insights.jsx

export default function Insights({ insights }) {
  return (
    <div style={{
      marginTop: "20px",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px"
    }}>
      <h3>🧠 AI Insights</h3>
      <p>Total Orders: {insights?.totalOrders}</p>
      <p>Best Month: {insights?.bestMonth}</p>
      <p>{insights?.message}</p>
    </div>
  );
}