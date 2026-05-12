import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const EmployeeList = ({ onSelect, onAdd }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get('/employees').then((res) => setEmployees(res.data.data));
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
            <th>Kod</th>
            <th>Non</th>
            <th>Wol</th>
            <th>Sale Debaz</th>
            <th>Aktyon</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employeeCode}</td>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.role}</td>
              <td>{emp.baseSalary} HTG</td>
              <td>
                <button onClick={() => onSelect(emp)}>We</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
