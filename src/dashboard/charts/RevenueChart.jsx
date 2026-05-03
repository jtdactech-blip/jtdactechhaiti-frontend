// frontend/src/dashboard/charts/RevenueChart.jsx

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ marginTop: 0, color: "#0f172a" }}>Revni pa mwa</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#0f766e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
