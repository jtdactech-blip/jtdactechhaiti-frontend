// This file is now obsolete and replaced by dashboard/pages/DashboardPage.jsx
// It can be safely deleted.
import { useEffect, useState } from "react";
import socket from "../services/socket";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 🔥 ORDER LIVE
    socket.on("order.created", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    // 🔥 NOTIFICATION LIVE
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);

      alert(data.message); // 🔥 popup basic
    });

    return () => {
      socket.off("order.created");
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Notifications</h3>
      {notifications.map((n, i) => (
        <div key={i}>{n.message}</div>
      ))}

      <h3>Orders</h3>
      {orders.map((o) => (
        <div key={o.id}>Order #{o.id} - {o.total}</div>
      ))}
    </div>
  ); 

  import { useEffect, useState } from "react";
import { getSocket } from "../services/socket";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    // 🔥 NEW ORDER
    socket.on("orderCreated", (order) => {
      console.log("🆕 Order received:", order);

      setOrders((prev) => [order, ...prev]);
    });

    // 🔔 NOTIFICATION
    socket.on("notification", (data) => {
      console.log("🔔 Notification:", data);

      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("orderCreated");
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h2>📊 Dashboard</h2>

      <h3>Orders</h3>
      {orders.map((o) => (
        <div key={o.id}>
          #{o.id} - {o.total}$
        </div>
      ))}

      <h3>Notifications</h3>
      {notifications.map((n, i) => (
        <div key={i}>{n.message}</div>
      ))}
    </div>
  );
}

}
import { useEffect, useState } from "react";
import { getSocket } from "../services/socket";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // 🆕 ORDER
    socket.on("orderCreated", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("notification", (data) => {
  console.log("🔔 Smart Alert:", data);

  setNotifications((prev) => [data, ...prev]);
});

    // 🔔 NOTIFICATION
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    // 📈 ANALYTICS
    socket.on("analyticsUpdate", (data) => {
      setStats((prev) => ({
        revenue: prev.revenue + Number(data.revenue),
        orders: prev.orders + data.orders,
      }));

      setChartData((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          revenue: data.revenue,
        },
      ]);
    });

    return () => {
      socket.off("orderCreated");
      socket.off("notification");
      socket.off("analyticsUpdate");
    };
  }, []);

  return (
    <div>
      <h2>📊 Live Dashboard</h2>

      {/* 🔥 STATS */}
      <div style={{ display: "flex", gap: 20 }}>
        <div>💰 Revenue: ${stats.revenue}</div>
        <div>🧾 Orders: {stats.orders}</div>
      </div>

      {/* 📈 CHART */}
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" />
      </LineChart>

      {/* 🆕 ORDERS */}
      <h3>Orders</h3>
      {orders.map((o) => (
        <div key={o.id}>
          #{o.id} - ${o.total}
        </div>
      ))}

      {/* 🔔 NOTIFS */}
      <h3>Notifications</h3>
      {notifications.map((n, i) => (
        <div key={i}>{n.message}</div>
      ))}
    </div> 
  ); 

  <div style={{
  padding: 10,
  background:
    n.type === "warning" ? "#ffcccc" :
    n.type === "success" ? "#ccffcc" :
    "#eee"
}}>
  {n.message}
</div>

}


export default Dashboard;

