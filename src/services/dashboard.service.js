import API from "./api";

export const getDashboardStats = async (tenantId) => {
  const response = await API.get("/dashboard", {
    params: tenantId ? { tenantId } : undefined,
  });

  return response.data.data;
};

export const getRevenueChart = async (tenantId) => {
  const response = await API.get("/dashboard/charts/revenue", {
    params: tenantId ? { tenantId } : undefined,
  });

  return response.data.data;
};

export const getInsights = async (tenantId) => {
  const response = await API.get("/dashboard/insights", {
    params: tenantId ? { tenantId } : undefined,
  });

  return response.data.data;
};

export const downloadReport = async ({
  scope,
  year,
  month,
  date,
  tenantId,
  lang = "ht",
  emailTo,
  whatsappTo,
}) => {
  const endpoint =
    scope === "annual"
      ? `/reports/download/annual/${year}`
      : scope === "monthly"
        ? "/reports/download/monthly"
        : "/reports/download/daily";

  const response = await API.get(endpoint, {
    params: {
      year,
      month,
      date,
      tenantId,
      lang,
      emailTo,
      whatsappTo,
    },
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const contentDisposition = response.headers["content-disposition"] || "";
  const match = contentDisposition.match(/filename="(.+)"/);
  const fileName = match?.[1] || `${scope}-report.pdf`;

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  return fileName;
};
