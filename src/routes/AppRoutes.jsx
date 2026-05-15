import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from "../pages/admin/DashboardPage";
import ManagementPage from "../pages/admin/ManagementPage";
import SettingsPage from "../pages/admin/SettingsPage";
import SubscriptionPage from "../pages/admin/SubscriptionPage";
import UsersPage from "../pages/admin/UsersPage";
import Login from "../pages/auth/Login";
import CheckoutPage from "../pages/public/CheckoutPage";
import ContactPage from "../pages/public/ContactPage";
import HomePage from "../pages/public/HomePage";
import OrderConfirmationPage from "../pages/public/OrderConfirmationPage";
import ProductsPage from "../pages/public/ProductsPage";
import ServicesPage from "../pages/public/ServicesPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subscription"
          element={
            <AdminRoute>
              <SubscriptionPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <AdminRoute>
              <ManagementPage pageKey="employees" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <AdminRoute>
              <ManagementPage pageKey="clients" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/backoffice/products"
          element={
            <AdminRoute>
              <ManagementPage pageKey="products" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/backoffice/services"
          element={
            <AdminRoute>
              <ManagementPage pageKey="services" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <ManagementPage pageKey="orders" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/proformas"
          element={
            <AdminRoute>
              <ManagementPage pageKey="proformas" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/invoices"
          element={
            <AdminRoute>
              <ManagementPage pageKey="invoices" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/finance"
          element={
            <AdminRoute>
              <ManagementPage pageKey="finance" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <ManagementPage pageKey="reports" />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <SettingsPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
