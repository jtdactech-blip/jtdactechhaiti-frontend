import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = ({ onSelect, onAdd }) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get('/api/employees').then(res => setEmployees(res.data));
  }, []);
  return (
    <div className="employee-list">
      <div className="header">
        <h2>Lis Anplwaye yo</h2>
        <button onClick={onAdd}>+ Nouvo Anplwaye</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Kòd</th>
            <th>Non</th>
            <th>Wòl</th>
            <th>Salè Debaz</th>
            <th>Aktyon</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.employeeCode}</td>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.role}</td>
              <td>{emp.baseSalary} HTG</td>
              <td>
                <button onClick={() => onSelect(emp)}>Wè</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeList;
