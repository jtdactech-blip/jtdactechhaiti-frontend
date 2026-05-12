import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const EmployeeDetail = ({ employee, onBack }) => {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    if (employee) {
      API.get(`/payroll?employeeId=${employee.id}`).then((res) =>
        setPayrolls(res.data.data),
      );
    }
  }, [employee]);

  if (!employee) return null;

  return (
    <div className="employee-detail">
      <button onClick={onBack}>&larr; Tounen</button>
      <h2>Detay Anplwaye</h2>
      <p><b>Kod:</b> {employee.employeeCode}</p>
      <p><b>Non:</b> {employee.firstName} {employee.lastName}</p>
      <p><b>Wol:</b> {employee.role}</p>
      <p><b>Sale Debaz:</b> {employee.baseSalary} HTG</p>
      <h3>Payroll</h3>
      <table>
        <thead>
          <tr>
            <th>Peryod</th>
            <th>Sale Brit</th>
            <th>ONA</th>
            <th>IRI</th>
            <th>OFATMA</th>
            <th>Taks</th>
            <th>Sale Net</th>
            <th>Estati</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p) => (
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
