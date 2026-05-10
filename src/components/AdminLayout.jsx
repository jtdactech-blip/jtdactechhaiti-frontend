import DashboardLayout from "./DashboardLayout";

export default function AdminLayout({ children, title }) {
  return (
    <DashboardLayout>
      <div className="admin-wrapper">
        <div className="admin-header">
          <h1>{title}</h1>
        </div>

        <div className="admin-body">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
