import React from "react";

export default function TenantSwitcher({
  tenants = [],
  value = "",
  onChange = () => {},
}) {
  if (!tenants.length) {
    return null;
  }

  return (
    <div
      style={{
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 260,
      }}
    >
      <label
        htmlFor="tenant-switcher"
        style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}
      >
        Active business
      </label>

      <select
        id="tenant-switcher"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          border: "1px solid #cbd5e1",
          borderRadius: 12,
          padding: "10px 12px",
          background: "#fff",
          color: "#0f172a",
        }}
      >
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </select>
    </div>
  );
}
