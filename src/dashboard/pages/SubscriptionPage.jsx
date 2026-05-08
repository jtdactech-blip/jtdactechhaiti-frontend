import API from "../../services/api";

import MainLayout from "../../layout/MainLayout";

export default function SubscriptionPage() {
  const handleSubscribe = async (plan) => {
    const token = localStorage.getItem("token");

    const res = await API.post(
      "/stripe/checkout",
      { plan },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    window.location.href = res.data.data.url;
  };

  return (
    <MainLayout>
      <h1>Subscription Plans</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        <Plan name="Free" price="$0" onClick={() => {}} />
        <Plan name="Pro" price="$29" onClick={() => handleSubscribe("pro")} />
        <Plan
          name="Enterprise"
          price="$99"
          onClick={() => handleSubscribe("enterprise")}
        />
      </div>
    </MainLayout>
  );
}

function Plan({ name, price, onClick }) {
  return (
    <div
      style={{
        padding: 20,
        background: "#fff",
        borderRadius: 10,
        width: 200,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{name}</h2>
      <h3>{price}/month</h3>

      <button onClick={onClick} style={{ marginTop: 10 }}>
        Choose
      </button>
    </div>
  );
}
