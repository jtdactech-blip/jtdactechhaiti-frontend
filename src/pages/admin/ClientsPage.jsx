import AdminLayout from "../../components/AdminLayout";

const clients = [
  {
    id: 1,
    name: "Jean Client",
    email: "jean@email.com",
    phone: "+509 1234 5678",
  },
  {
    id: 2,
    name: "Marie Dupont",
    email: "marie@email.com",
    phone: "+509 9876 5432",
  },
];

export default function ClientsPage() {
  return (
    <AdminLayout title="Gestion des Clients">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
