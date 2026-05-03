import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDetail = ({ employee, onBack }) => {
  const [payrolls, setPayrolls] = useState([]);
  useEffect(() => {
    if (employee) {
      axios.get(`/api/payroll?employeeId=${employee.id}`).then(res => setPayrolls(res.data));
    }
  }, [employee]);
  if (!employee) return null;
  return (
    <div className="employee-detail">
      <button onClick={onBack}>← Tounen</button>
      <h2>Detay Anplwaye</h2>
      <p><b>Kòd:</b> {employee.employeeCode}</p>
      <p><b>Non:</b> {employee.firstName} {employee.lastName}</p>
      <p><b>Wòl:</b> {employee.role}</p>
      <p><b>Salè Debaz:</b> {employee.baseSalary} HTG</p>
      <h3>Payroll</h3>
      <table>
        <thead>
          <tr>
            <th>Peryòd</th>
            <th>Salè Brit</th>
            <th>ONA</th>
            <th>IRI</th>
            <th>OFATMA</th>
            <th>Taks</th>
            <th>Salè Net</th>
            <th>Estati</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(p => (
            <tr key={p.id}>
              <td>{p.period}</td>
              <td>{p.grossAmount}</td>
              <td>{p.ona}</td>
              <td>{p.iri}</td>
              <td>{p.ofatma}</td>
              <td>{p.tax}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeDetail;
