import API from "../../services/api";

import MainLayout from "../../components/MainLayout";

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
      <div className="admin-page">
        <div className="admin-banner">
          <p className="eyebrow">ABONNEMENT</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Subscription Plans
          </h1>
          <p className="hero-text">
            Menm pati abonnement nan resevwa menm kalite layout premium ak tout lot paj prensipal yo.
          </p>
        </div>

        <div className="summary-grid">
        <Plan name="Free" price="$0" onClick={() => {}} />
        <Plan name="Pro" price="$29" onClick={() => handleSubscribe("pro")} />
        <Plan
          name="Enterprise"
          price="$99"
          onClick={() => handleSubscribe("enterprise")}
        />
        </div>
      </div>
    </MainLayout>
  );
}

function Plan({ name, price, onClick }) {
  return (
    <div className="surface-card">
      <h2>{name}</h2>
      <h3>{price}/month</h3>

      <button onClick={onClick} className="btn-primary" style={{ marginTop: 10 }}>
        Choose
      </button>
    </div>
  );
}
