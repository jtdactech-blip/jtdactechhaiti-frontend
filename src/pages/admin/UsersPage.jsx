//frontend/src/pages/admin/UsersPage.jsx

import { useEffect, useState } from "react";
import API from "../../services/api";
import MainLayout from "../../components/MainLayout";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    API.get("/users")
      .then(res => {
        setUsers(res.data.data);
      });

  }, []);

  return (
    <MainLayout>

      <div className="surface-card">

        <h1>Users</h1>

        <table className="admin-table">

          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}
