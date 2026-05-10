import { useEffect, useState } from "react";

import RevenueChart from "../charts/RevenueChart";
import TenantSwitcher from "../components/TenantSwitcher";
import MainLayout from "../../layout/MainLayout";
import {
  downloadReport,
  getDashboardStats,
  getRevenueChart,
  getInsights,
} from "../../services/dashboard.service";

const DEFAULT_LANG = "ht";

export default function DashboardPage() {
  const [kpis, setKpis] = useState(null);
  const [charts, setCharts] = useState([]);
  const [insights, setInsights] = useState([]);
  const [tenantId, setTenantId] = useState("");
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [reportDate, setReportDate] = useState(new Date().toISOString().slice(0, 10));
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [emailTo, setEmailTo] = useState("");
  const [whatsappTo, setWhatsappTo] = useState("");
  const [busyReport, setBusyReport] = useState("");
  const [message, setMessage] = useState("");

  const tenants = tenantId ? [{ id: tenantId, name: `Business #${tenantId}` }] : [];

  useEffect(() => {
    const storedTenantId = localStorage.getItem("tenantId");
    if (storedTenantId) {
      setTenantId(storedTenantId);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      const nextTenantId = payload?.tenantId ? String(payload.tenantId) : "1";
      setTenantId(nextTenantId);
      localStorage.setItem("tenantId", nextTenantId);
    } catch (error) {
      console.error("Unable to parse tenant from token", error);
      setTenantId("1");
    }
  }, []);

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    const loadDashboard = async () => {
      try {
        const [stats, chartData, insightData] = await Promise.all([
          getDashboardStats(tenantId),
          getRevenueChart(tenantId),
          getInsights(tenantId),
        ]);

        setKpis(stats.kpis);
        setCharts(chartData.chart || []);
        setInsights(normalizeInsights(insightData));
        setMessage("");
      } catch (error) {
        console.error("Dashboard error:", error);
        setMessage("Nou pa rive chaje done dashboard la kounye a.");
        setInsights([
          "Dashboard la kenbe menm layout ak mockup la menm si API a an reta.",
          "Ou ka navige nan tout paj admin yo nan meni agoch la.",
        ]);
      }
    };

    void loadDashboard();
  }, [tenantId]);

  const handleDownload = async (scope) => {
    try {
      setBusyReport(scope);
      setMessage("");

      await downloadReport({
        scope,
        year: scope === "annual" || scope === "monthly" ? Number(year) : undefined,
        month: scope === "monthly" ? Number(month) : undefined,
        date: scope === "daily" ? reportDate : undefined,
        tenantId,
        lang,
        emailTo: emailTo || undefined,
        whatsappTo: whatsappTo || undefined,
      });

      setMessage(`Rapor ${scope} la telechaje avek sikse.`);
    } catch (error) {
      console.error(`Failed to download ${scope} report`, error);
      setMessage(`Nou pa rive telechaje rapor ${scope} la kounye a.`);
    } finally {
      setBusyReport("");
    }
  };

  return (
    <MainLayout>
      <div className="admin-page">
        <section className="admin-hero">
          <div className="admin-banner">
            <p className="eyebrow">TABLEAU DE BORD JT.DACTECH</p>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3.3rem)" }}>
              Tableau de bord principal
            </h1>
            <p className="hero-text">
              Rezime revni, commandes, depans ak rapor PDF yo nan menm language vizyel ak mockup ou te voye a.
            </p>
          </div>

          <div className="surface-card">
            <TenantSwitcher tenants={tenants} value={tenantId} onChange={setTenantId} />

            <label htmlFor="report-lang" style={labelStyle}>
              Lang rapport
            </label>
            <select
              id="report-lang"
              value={lang}
              onChange={(event) => setLang(event.target.value)}
              className="select-input"
            >
              <option value="ht">Kreyol</option>
              <option value="fr">Francais</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section className="kpi-grid">
          <KpiCard label="Revenus" value={`$${Number(kpis?.revenue ?? 0).toFixed(2)}`} note="+18.5%" />
          <KpiCard label="Commandes" value={String(kpis?.totalOrders ?? 0)} note="+12.3%" />
          <KpiCard label="Depenses" value={`$${Number(kpis?.expenses ?? 0).toFixed(2)}`} note="+7.2%" />
          <KpiCard label="Profit" value={`$${Number(kpis?.profit ?? 0).toFixed(2)}`} note="+25.4%" />
        </section>

        <section className="quick-grid">
          <div className="surface-card">
            <h3>Evolution des revenus</h3>
            <div style={{ marginTop: 16 }}>
              <RevenueChart data={charts} />
            </div>
          </div>

          <div className="surface-card">
            <h3>Analyses intelligentes</h3>
            <div className="insights-list" style={{ marginTop: 14 }}>
              {insights.length ? insights.map((item, index) => (
                <div key={`insight-${index}`} className="insight-item">
                  {item}
                </div>
              )) : (
                <div className="insight-item">Analyses yo ap pare apre done yo fin chaje.</div>
              )}
            </div>
          </div>
        </section>

        <section className="surface-card">
          <div className="section-heading">
            <div>
              <h2>Centre de rapports</h2>
              <p>Telechaje PDF yo, voye yo pa email oswa WhatsApp san kite dashboard la.</p>
            </div>
          </div>

          <div className="summary-grid">
            <div>
              <label htmlFor="report-date" style={labelStyle}>Date quotidienne</label>
              <input
                id="report-date"
                type="date"
                className="text-input"
                value={reportDate}
                onChange={(event) => setReportDate(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="report-year" style={labelStyle}>Annee</label>
              <input
                id="report-year"
                className="text-input"
                value={year}
                onChange={(event) => setYear(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="report-month" style={labelStyle}>Mois</label>
              <input
                id="report-month"
                className="text-input"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="report-email" style={labelStyle}>Email</label>
              <input
                id="report-email"
                className="text-input"
                value={emailTo}
                onChange={(event) => setEmailTo(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="report-whatsapp" style={labelStyle}>WhatsApp</label>
              <input
                id="report-whatsapp"
                className="text-input"
                value={whatsappTo}
                onChange={(event) => setWhatsappTo(event.target.value)}
              />
            </div>
          </div>

          <div className="summary-grid" style={{ marginTop: 18 }}>
            <ReportButton
              title="Rapport daily"
              description="Resume pa dat"
              busy={busyReport === "daily"}
              onClick={() => handleDownload("daily")}
            />
            <ReportButton
              title="Rapport monthly"
              description="Resume pa mwa"
              busy={busyReport === "monthly"}
              onClick={() => handleDownload("monthly")}
            />
            <ReportButton
              title="Rapport annual"
              description="Resume anyel"
              busy={busyReport === "annual"}
              onClick={() => handleDownload("annual")}
            />
          </div>

          {message ? <div className="message-banner" style={{ marginTop: 18 }}>{message}</div> : null}
        </section>
      </div>
    </MainLayout>
  );
}

function normalizeInsights(data) {
  if (Array.isArray(data?.insights)) {
    return data.insights;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

function KpiCard({ label, value, note }) {
  return (
    <div className="kpi-card">
      <p className="muted">{label}</p>
      <h2 style={{ marginTop: 10 }}>{value}</h2>
      <span style={{ color: "#16a34a", display: "inline-block", marginTop: 8 }}>{note}</span>
    </div>
  );
}

function ReportButton({ title, description, busy, onClick }) {
  return (
    <button type="button" className="btn-primary" onClick={onClick} disabled={busy}>
      <strong>{title}</strong>
      <div style={{ marginTop: 6, opacity: 0.9 }}>{busy ? "Preparation PDF..." : description}</div>
    </button>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 6,
  color: "#334155",
  fontSize: 13,
  fontWeight: 600,
};
