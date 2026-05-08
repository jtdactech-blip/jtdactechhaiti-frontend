import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [period, setPeriod] = useState('');

  useEffect(() => {
    API.get('/payroll').then((res) => setPayrolls(res.data.data));
  }, []);

  const downloadReport = async () => {
    if (!period) return alert('Chwazi peryod!');

    const res = await API.get(`/payroll/report/pdf?period=${period}`);
    window.open(res.data, '_blank');
  };

  return (
    <div className="payroll-page">
      <h2>Rapo Payroll</h2>
      <div>
        <input
          type="month"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <button onClick={downloadReport}>Telechaje PDF</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Anplwaye</th>
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
              <td>{p.employee?.firstName} {p.employee?.lastName}</td>
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

export default Payroll;
