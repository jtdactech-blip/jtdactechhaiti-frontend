import { useEffect, useMemo, useState } from "react";

import MainLayout from "../../layout/MainLayout";
import API from "../../services/api";
import {
  getDashboardStats,
  getInsights,
  getRevenueChart,
} from "../../services/dashboard.service";

const fallbackClients = [
  { name: "Jean Client", email: "jean.client@email.com", phone: "+509 1234 5678", status: "Actif" },
  { name: "Marie Duport", email: "marie@email.com", phone: "+509 9876 5432", status: "VIP" },
  { name: "Michel Joseph", email: "michael@email.com", phone: "+509 2222 1111", status: "Actif" },
  { name: "Societe ABC", email: "info@abc.com", phone: "+509 7777 8888", status: "Entreprise" },
];

const fallbackReports = [38, 62, 84, 60, 48, 76, 34, 58, 30];

const pageConfigs = {
  employees: {
    title: "Employes",
    subtitle: "Suivi ekip la, salaires yo ak disponibilite yo nan yon menm tablo.",
    endpoint: "/employees",
    actionLabel: "Ajouter un employe",
    columns: [
      { key: "name", label: "Nom" },
      { key: "role", label: "Poste" },
      { key: "salary", label: "Salaire" },
      { key: "status", label: "Statut" },
    ],
  },
  clients: {
    title: "Clients",
    subtitle: "Paj kliyan prensipal la swiv menm stil mockup la menm si backend lis la poko ekspoze.",
    actionLabel: "Ajouter un client",
    columns: [
      { key: "name", label: "Nom" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Telephone" },
      { key: "status", label: "Segment" },
    ],
  },
  products: {
    title: "Produits",
    subtitle: "Kontwole catalogue, pri yo ak stock la ak prezantasyon ki pi pre mockup la.",
    endpoint: "/products",
    actionLabel: "Ajouter un produit",
    columns: [
      { key: "name", label: "Produit" },
      { key: "price", label: "Prix" },
      { key: "stock", label: "Stock" },
      { key: "status", label: "Statut" },
    ],
  },
  services: {
    title: "Services",
    subtitle: "Jesyon servis yo ak tarif yo sou menm estrikti tab ak aperçu referans lan.",
    endpoint: "/services",
    actionLabel: "Ajouter un service",
    columns: [
      { key: "name", label: "Service" },
      { key: "price", label: "Prix" },
      { key: "status", label: "Statut" },
      { key: "description", label: "Description" },
    ],
  },
  orders: {
    title: "Commandes",
    subtitle: "Swiv commandes kliyan yo ak estati yo nan yon fason lis ak fasil pou li.",
    endpoint: "/orders",
    actionLabel: "Nouvelle commande",
    columns: [
      { key: "reference", label: "Commande" },
      { key: "client", label: "Client" },
      { key: "total", label: "Total" },
      { key: "status", label: "Statut" },
    ],
  },
  proformas: {
    title: "Proformas",
    subtitle: "Apercu proformas yo ak referans, total ak dat yo menm jan ak mockup la.",
    endpoint: "/proformas",
    actionLabel: "Nouvelle proforma",
    columns: [
      { key: "reference", label: "Proforma" },
      { key: "client", label: "Client" },
      { key: "total", label: "Total" },
      { key: "status", label: "Statut" },
    ],
  },
  invoices: {
    title: "Factures",
    subtitle: "Paj factures la bay menm layout card + tab klè ki nan imaj la.",
    endpoint: "/invoices",
    actionLabel: "Nouvelle facture",
    columns: [
      { key: "reference", label: "Facture" },
      { key: "client", label: "Client" },
      { key: "total", label: "Total" },
      { key: "status", label: "Statut" },
    ],
  },
  finance: {
    title: "Gestion Financiere",
    subtitle: "Rezime revni, depans, pwofi ak tandans pou pati finans mockup la.",
    actionLabel: "Exporter rapport",
    columns: [
      { key: "label", label: "Categorie" },
      { key: "value", label: "Montant" },
      { key: "status", label: "Variation" },
      { key: "note", label: "Note" },
    ],
  },
  reports: {
    title: "Rapports",
    subtitle: "Sant rapor yo ak rezime anyel, graf ak pwen enpotan nan menm langage vizyel la.",
    actionLabel: "Generer",
    columns: [
      { key: "label", label: "Indicateur" },
      { key: "value", label: "Valeur" },
      { key: "status", label: "Etat" },
      { key: "note", label: "Commentaire" },
    ],
  },
};

export default function ManagementPage({ pageKey }) {
  const config = pageConfigs[pageKey];
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("");
  const [kpis, setKpis] = useState(null);
  const [insights, setInsights] = useState([]);
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const tenantId = localStorage.getItem("tenantId") || "1";

    const load = async () => {
      try {
        const requests = [
          getDashboardStats(tenantId),
          getInsights(tenantId),
          getRevenueChart(tenantId),
        ];

        if (config.endpoint) {
          requests.unshift(API.get(config.endpoint));
        }

        const results = await Promise.all(requests);
        const endpointResult = config.endpoint ? results.shift() : null;
        const stats = results[0];
        const insightData = results[1];
        const chartData = results[2];

        setRows(normalizeRows(pageKey, endpointResult?.data?.data));
        setKpis(stats?.kpis || null);
        setInsights(normalizeInsights(insightData));
        setChart(chartData?.chart || []);
        setMessage("");
      } catch (error) {
        console.error(`Unable to load ${pageKey}`, error);
        setRows(normalizeRows(pageKey));
        setInsights([
          "Done fallback yo chaje pou paj la rete bèl pandan API a pa disponib.",
          "Ou ka konekte route backend ki manke yo pita san chanje layout sa a.",
        ]);
        setMessage("Gen done ki pa t disponib. Paj la ap itilize done fallback kounye a.");
      }
    };

    void load();
  }, [config.endpoint, pageKey]);

  const summaryCards = useMemo(() => buildSummaryCards(pageKey, rows, kpis), [pageKey, rows, kpis]);
  const barValues = chart.length
    ? chart.map((item) => Number(item.total || item.amount || 0))
    : fallbackReports;
  const maxBar = Math.max(...barValues, 1);

  return (
    <MainLayout>
      <div className="admin-page">
        <section className="admin-hero">
          <div className="admin-banner">
            <p className="eyebrow">BACK-OFFICE JT.DACTECH</p>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}>
              {config.title}
            </h1>
            <p className="hero-text">{config.subtitle}</p>
          </div>

          <div className="admin-actions">
            <div className="surface-card">
              <p className="eyebrow" style={{ background: "#eff6ff", color: "#1d4ed8" }}>Action rapide</p>
              <h3>{config.actionLabel}</h3>
              <p className="surface-muted">
                Layout sa a suiv referans la pou tout paj prensipal admin yo ak menm logo, menm sidebar, menm card system.
              </p>
              <button type="button" className="btn-primary" style={{ marginTop: 12 }}>
                {config.actionLabel}
              </button>
            </div>

            <div className="surface-card">
              <h3>Insights</h3>
              <div className="insights-list" style={{ marginTop: 12 }}>
                {insights.slice(0, 2).map((item, index) => (
                  <div key={`${pageKey}-insight-${index}`} className="insight-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="summary-grid">
          {summaryCards.map((card) => (
            <article key={card.label} className="summary-card">
              <p className="muted">{card.label}</p>
              <h3 style={{ marginTop: 10, fontSize: "1.8rem" }}>{card.value}</h3>
              <p style={{ color: card.tone }}>{card.note}</p>
            </article>
          ))}
        </section>

        {message ? <div className="message-banner">{message}</div> : null}

        <section className="quick-grid">
          <div className="surface-card">
            <h3>Tendance</h3>
            <div className="mini-chart">
              {barValues.slice(0, 8).map((value, index) => (
                <div
                  key={`${pageKey}-bar-${index}`}
                  className="mini-bar"
                  style={{ height: `${Math.max(24, (value / maxBar) * 100)}%` }}
                />
              ))}
            </div>
          </div>

          <div className="surface-card">
            <h3>Points cles</h3>
            <div className="insights-list" style={{ marginTop: 12 }}>
              {insights.slice(0, 4).map((item, index) => (
                <div key={`${pageKey}-point-${index}`} className="insight-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="table-shell">
          <div className="table-toolbar">
            <div>
              <h3 style={{ margin: 0 }}>{config.title}</h3>
              <p className="surface-muted">Presentation propre ak tab ki koresponn ak mockup la.</p>
            </div>
            <button type="button" className="btn-soft">
              {config.actionLabel}
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                {config.columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${pageKey}-row-${index}`}>
                  {config.columns.map((column) => (
                    <td key={column.key}>
                      {column.key === "status" ? (
                        <span className={`status-pill ${statusTone(row[column.key])}`}>
                          {row[column.key]}
                        </span>
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </MainLayout>
  );
}

function normalizeRows(pageKey, payload) {
  if (pageKey === "clients") {
    return fallbackClients;
  }

  if (pageKey === "finance") {
    return [
      { label: "Revenus", value: "$25,750", status: "+18.5%", note: "Croissance continue" },
      { label: "Depenses", value: "$8,400", status: "+7.2%", note: "Achats + operations" },
      { label: "Profit net", value: "$17,350", status: "+25.4%", note: "Marge en hausse" },
      { label: "Paiements", value: "$6,950", status: "Stable", note: "Portefeuille digital" },
    ];
  }

  if (pageKey === "reports") {
    return [
      { label: "Rapport mensuel", value: "$25,750", status: "Pret", note: "Mai 2024" },
      { label: "Rapport annuel", value: "$310,400", status: "Pret", note: "2024 complet" },
      { label: "Top produit", value: "Laptop HP 250", status: "Actif", note: "Demande stable" },
      { label: "Top client", value: "Jean Client", status: "VIP", note: "Meilleur volume" },
    ];
  }

  const source = Array.isArray(payload) ? payload : [];
  if (!source.length) {
    return fallbackRows(pageKey);
  }

  if (pageKey === "employees") {
    return source.map((item) => ({
      name: `${item.firstName || ""} ${item.lastName || ""}`.trim() || item.employeeCode,
      role: item.role || "Staff",
      salary: `$${Number(item.baseSalary || 0).toFixed(2)}`,
      status: item.isActive ? "Actif" : "Inactif",
    }));
  }

  if (pageKey === "products") {
    return source.map((item) => ({
      name: item.name,
      price: `$${Number(item.price || 0).toFixed(2)}`,
      stock: item.stock ?? 0,
      status: Number(item.stock || 0) > 0 ? "Disponible" : "Rupture",
    }));
  }

  if (pageKey === "services") {
    return source.map((item) => ({
      name: item.name,
      price: `$${Number(item.price || 0).toFixed(2)}`,
      status: "Actif",
      description: item.description || "Service professionnel",
    }));
  }

  if (pageKey === "orders") {
    return source.map((item) => ({
      reference: item.reference || `CMD-${item.id}`,
      client: item.client?.name || item.client_name || "Client",
      total: `$${Number(item.total || 0).toFixed(2)}`,
      status: translateStatus(item.status),
    }));
  }

  if (pageKey === "proformas") {
    return source.map((item) => ({
      reference: item.reference || `PF-${item.id}`,
      client: item.order?.client?.name || item.order?.client_name || "Client",
      total: `$${Number(item.total || 0).toFixed(2)}`,
      status: translateStatus(item.status),
    }));
  }

  if (pageKey === "invoices") {
    return source.map((item) => ({
      reference: item.reference || `FAC-${item.id}`,
      client: item.order?.client?.name || item.order?.client_name || "Client",
      total: `$${Number(item.amount || 0).toFixed(2)}`,
      status: translateStatus(item.status),
    }));
  }

  return fallbackRows(pageKey);
}

function fallbackRows(pageKey) {
  const map = {
    employees: [
      { name: "John Doe", role: "Developpeur", salary: "$800.00", status: "Actif" },
      { name: "Marie Saintil", role: "Comptable", salary: "$600.00", status: "Actif" },
      { name: "Paul Jacques", role: "Technicien", salary: "$500.00", status: "Actif" },
    ],
    products: [
      { name: "Laptop HP 250 G8", price: "$650.00", stock: 15, status: "Disponible" },
      { name: "Imprimante Canon LBP", price: "$250.00", stock: 8, status: "Disponible" },
      { name: "Dell OptiPlex 3080", price: "$400.00", stock: 0, status: "Rupture" },
    ],
    services: [
      { name: "Installation Camera", price: "$150.00", status: "Actif", description: "Pose complete sur site" },
      { name: "Installation Reseau", price: "$200.00", status: "Actif", description: "Configuration entreprise" },
      { name: "Support Technique", price: "$90.00", status: "Actif", description: "Maintenance et assistance" },
    ],
    orders: [
      { reference: "CMD-0001", client: "Jean Client", total: "$748.00", status: "Confirmee" },
      { reference: "CMD-0002", client: "Marie Duport", total: "$320.00", status: "En attente" },
      { reference: "CMD-0003", client: "Entreprise XYZ", total: "$1,250.00", status: "Confirmee" },
    ],
    proformas: [
      { reference: "PF-2024-0001", client: "Jean Client", total: "$748.00", status: "Envoyee" },
      { reference: "PF-2024-0002", client: "Marie Duport", total: "$320.00", status: "Brouillon" },
      { reference: "PF-2024-0003", client: "Entreprise XYZ", total: "$1,250.00", status: "Envoyee" },
    ],
    invoices: [
      { reference: "FAC-2024-0001", client: "Jean Client", total: "$748.00", status: "Payee" },
      { reference: "FAC-2024-0002", client: "Marie Duport", total: "$320.00", status: "Payee" },
      { reference: "FAC-2024-0003", client: "Entreprise XYZ", total: "$1,250.00", status: "Impayee" },
    ],
  };

  return map[pageKey] || [];
}

function buildSummaryCards(pageKey, rows, kpis) {
  if (pageKey === "finance") {
    return [
      { label: "Revenus", value: "$25,750", note: "+18.5%", tone: "#16a34a" },
      { label: "Depenses", value: "$8,400", note: "+7.2%", tone: "#ea580c" },
      { label: "Profit", value: "$17,350", note: "+25.4%", tone: "#16a34a" },
    ];
  }

  if (pageKey === "reports") {
    return [
      { label: "Total revenus", value: "$25,750", note: "Periode active", tone: "#2563eb" },
      { label: "Total depenses", value: "$8,400", note: "Suivi stable", tone: "#ea580c" },
      { label: "Profit net", value: "$17,350", note: "Bonne marge", tone: "#16a34a" },
    ];
  }

  return [
    { label: "Enregistrements", value: String(rows.length), note: "Dans cette vue", tone: "#2563eb" },
    { label: "Commandes", value: String(kpis?.totalOrders ?? 0), note: "Volume global", tone: "#2563eb" },
    { label: "Revenu", value: `$${Number(kpis?.revenue ?? 0).toFixed(2)}`, note: "Dashboard central", tone: "#16a34a" },
  ];
}

function normalizeInsights(data) {
  if (Array.isArray(data?.insights)) {
    return data.insights;
  }

  return [
    "Le design back-office a ete unifie avec le dashboard principal.",
    "Les tableaux utilisent une structure stable pour tous les modules.",
    "Les blocs de resume reprennent l'esprit du mockup fourni.",
  ];
}

function translateStatus(status) {
  const normalized = String(status || "").toLowerCase();

  if (["paid", "payee", "paye", "success", "confirmed", "confirmee", "converted", "active"].includes(normalized)) {
    return "Actif";
  }

  if (["pending", "draft", "brouillon", "envoyee", "en attente"].includes(normalized)) {
    return "En attente";
  }

  if (["unpaid", "impayee", "cancelled"].includes(normalized)) {
    return "Impayee";
  }

  return status || "Actif";
}

function statusTone(status) {
  const normalized = String(status || "").toLowerCase();

  if (["actif", "active", "vip", "disponible", "payee", "pret", "confirmee", "entreprise"].includes(normalized)) {
    return "success";
  }

  if (["en attente", "brouillon", "envoyee", "stable"].includes(normalized)) {
    return "pending";
  }

  return "danger";
}
