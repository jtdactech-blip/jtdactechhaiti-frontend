// frontend/src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import DashboardPage from "./dashboard/pages/DashboardPage";
import ManagementPage from "./dashboard/pages/ManagementPage";
import HomePage from "./public/pages/HomePage";
import ProductsPage from "./public/pages/ProductsPage";
import ServicesPage from "./public/pages/ServicesPage";
import ContactPage from "./public/pages/ContactPage";
import CheckoutPage from "./public/pages/CheckoutPage";
import OrderConfirmationPage from "./public/pages/OrderConfirmationPage";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import SubscriptionPage from "./dashboard/pages/SubscriptionPage";

import { connectSocket } from "./services/socket";
import "./styles/site.css";

function App() {
  // SOCKET CONNECTION
  useEffect(() => {
    const tenantId = localStorage.getItem("tenantId") || 1;
    connectSocket(tenantId);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
        <Route path="/login" element={<Login />} />

        {/* PRIVATE ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="employees" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="clients" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/backoffice/products"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="products" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/backoffice/services"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="services" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="orders" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proformas"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="proformas" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="invoices" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="finance" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ManagementPage pageKey="reports" />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
