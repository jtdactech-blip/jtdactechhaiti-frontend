import React, { useEffect, useState } from "react";

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
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [emailTo, setEmailTo] = useState("");
  const [whatsappTo, setWhatsappTo] = useState("");
  const [busyReport, setBusyReport] = useState("");
  const [message, setMessage] = useState("");

  const tenants = tenantId
    ? [{ id: tenantId, name: `Business #${tenantId}` }]
    : [];

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
      const nextTenantId = payload?.tenantId ? String(payload.tenantId) : "";

      if (nextTenantId) {
        setTenantId(nextTenantId);
        localStorage.setItem("tenantId", nextTenantId);
      }
    } catch (error) {
      console.error("Unable to parse tenant from token", error);
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
      }
    };

    void loadDashboard();
  }, [tenantId]);

  const handleTenantChange = (value) => {
    setTenantId(value);
    localStorage.setItem("tenantId", value);
  };

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

      setMessage(`Rapò ${scope} la telechaje avèk siksè.`);
    } catch (error) {
      console.error(`Failed to download ${scope} report`, error);
      setMessage(`Nou pa rive telechaje rapò ${scope} la kounye a.`);
    } finally {
      setBusyReport("");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "grid",
          gap: 24,
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.06), rgba(14,116,144,0.1))",
          borderRadius: 28,
          padding: 24,
          minHeight: "calc(100vh - 40px)",
        }}
      >
        <section
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "2fr 1fr",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#0f172a",
              color: "#f8fafc",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 20px 45px rgba(15,23,42,0.18)",
            }}
          >
            <p style={{ margin: 0, letterSpacing: "0.12em", fontSize: 12 }}>
              SANT KONTWOL FINANSYE
            </p>
            <h1
              style={{
                margin: "10px 0 8px",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.05,
              }}
            >
              Rapò entelijan, livrezon reyèl, an yon sèl klik.
            </h1>
            <p style={{ margin: 0, maxWidth: 620, color: "#cbd5e1" }}>
              Telechaje rapò PDF yo touswit, voye yo pa imèl oswa WhatsApp,
              epi kenbe analiz anyèl yo pare pou administratè ak ekip finans yo.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
            }}
          >
            <TenantSwitcher
              tenants={tenants}
              value={tenantId}
              onChange={handleTenantChange}
            />

            <label style={labelStyle} htmlFor="report-lang">
              Lang rapò a
            </label>
            <select
              id="report-lang"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={inputStyle}
            >
              <option value="ht">Kreyol</option>
              <option value="fr">Francais</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          <Card title="Lòd yo" value={kpis ? kpis.totalOrders : "..."} />
          <Card title="Revni" value={kpis ? `$${kpis.revenue}` : "..."} />
          <Card title="Depans" value={kpis ? `$${kpis.expenses}` : "..."} />
          <Card title="Pwofi" value={kpis ? `$${kpis.profit}` : "..."} />
        </section>

        <section
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1.4fr 1fr",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
            }}
          >
            <RevenueChart data={charts} />
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#0f172a" }}>Analiz entelijan</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {insights.length ? (
                insights.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 14,
                      padding: "12px 14px",
                      color: "#334155",
                    }}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", margin: 0 }}>
                  Analiz yo ap parèt la apre done yo fin chaje.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
            display: "grid",
            gap: 18,
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#0f766e", fontWeight: 700 }}>
              SANT RAPÒ YO
            </p>
            <h2 style={{ margin: "6px 0 8px", color: "#0f172a" }}>
              Telechaje epi voye rapò PDF finans yo
            </h2>
            <p style={{ margin: 0, color: "#64748b" }}>
              Menm aksyon an ka telechaje PDF la epi voye li pa imèl oswa
              WhatsApp lè yon kontak disponib.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            }}
          >
            <div>
              <label style={labelStyle} htmlFor="report-date">
                Dat rapò daily a
              </label>
              <input
                id="report-date"
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="report-year">
                Ane
              </label>
              <input
                id="report-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="report-month">
                Mwa
              </label>
              <input
                id="report-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="report-email">
                Imèl pou voye
              </label>
              <input
                id="report-email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="finance@company.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="report-whatsapp">
                WhatsApp pou voye
              </label>
              <input
                id="report-whatsapp"
                value={whatsappTo}
                onChange={(e) => setWhatsappTo(e.target.value)}
                placeholder="+509..."
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            <ReportButton
              title="Rapò daily"
              description="Rezime pa dat"
              busy={busyReport === "daily"}
              onClick={() => handleDownload("daily")}
            />
            <ReportButton
              title="Rapò monthly"
              description="Rezime pa mwa"
              busy={busyReport === "monthly"}
              onClick={() => handleDownload("monthly")}
            />
            <ReportButton
              title="Rapò annual"
              description="Rezime anyèl"
              busy={busyReport === "annual"}
              onClick={() => handleDownload("annual")}
            />
          </div>

          {message ? (
            <div
              style={{
                borderRadius: 14,
                padding: "12px 14px",
                background: "#ecfeff",
                border: "1px solid #a5f3fc",
                color: "#155e75",
              }}
            >
              {message}
            </div>
          ) : null}
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

  if (data?.insights?.message) {
    return [data.insights.message];
  }

  return [];
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
        border: "1px solid rgba(148,163,184,0.15)",
      }}
    >
      <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>{title}</p>
      <h2 style={{ margin: "12px 0 0", color: "#0f172a" }}>{value}</h2>
    </div>
  );
}

function ReportButton({ title, description, busy, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      style={{
        border: 0,
        borderRadius: 18,
        padding: "18px 20px",
        textAlign: "left",
        background: busy
          ? "#cbd5e1"
          : "linear-gradient(135deg, #0f766e, #164e63)",
        color: "#fff",
        cursor: busy ? "not-allowed" : "pointer",
        boxShadow: "0 18px 35px rgba(15,118,110,0.22)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
        {busy ? "Ap prepare PDF la..." : description}
      </div>
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

const inputStyle = {
  width: "100%",
  border: "1px solid #cbd5e1",
  borderRadius: 12,
  padding: "10px 12px",
  background: "#fff",
  color: "#0f172a",
  boxSizing: "border-box",
};
