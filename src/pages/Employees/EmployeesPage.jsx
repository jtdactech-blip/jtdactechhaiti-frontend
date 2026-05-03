//src/pages/employees/EmployeesPage.jsx

import React from "react";
import EmployeeForm from "./EmployeeForm";
import { createEmployee } from "../../services/employees";

const EmployeesPage = () => {

  const handleSubmit = async (data) => {
    try {
      const saved = await createEmployee(data);

      // 🔥 OUVRI POPUP POU PRINT
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
        <html>
        <head>
          <title>ID Card</title>

          <style>
            @page {
              size: 85.6mm 54mm;
              margin: 0;
            }

            body {
              margin: 0;
              padding: 0;
              background: white;
              font-family: Arial, sans-serif;
            }

            .card {
              width: 85.6mm;
              height: 54mm;
              background: linear-gradient(135deg, #0a1f44, #163d7a);
              color: white;
              position: relative;
              overflow: hidden;
            }

            .top-bar {
              height: 8px;
              background: #00c2ff;
            }

            .header {
              display: flex;
              justify-content: space-between;
              padding: 6px 10px;
              font-size: 10px;
            }

            .company {
              font-weight: bold;
              font-size: 11px;
            }

            .role {
              background: white;
              color: #0a1f44;
              padding: 2px 6px;
              border-radius: 6px;
              font-size: 9px;
              font-weight: bold;
            }

            .body {
              display: flex;
              padding: 5px 10px;
            }

            .photo {
              width: 22mm;
              height: 28mm;
              border-radius: 4px;
              object-fit: cover;
              background: #ccc;
            }

            .info {
              margin-left: 8px;
              font-size: 9px;
              line-height: 1.4;
            }

            .name {
              font-size: 11px;
              font-weight: bold;
              margin-bottom: 3px;
            }

            .footer {
              position: absolute;
              bottom: 4px;
              left: 10px;
              right: 10px;
              font-size: 8px;
              display: flex;
              justify-content: space-between;
            }

            .stripe {
              position: absolute;
              right: -20px;
              top: 10px;
              width: 80px;
              height: 80px;
              background: rgba(255,255,255,0.05);
              transform: rotate(45deg);
            }

          </style>
        </head>

        <body>

          <div class="card">

            <div class="top-bar"></div>

            <div class="header">
              <div class="company"><img src="logo.png" height="20" /></div>
              <div class="role">${saved.role.toUpperCase()}</div>
            </div>

            <div class="body">
              <img class="photo" src="${saved.photo || ''}" />

              <div class="info">
                <div class="name">${saved.firstName} ${saved.lastName}</div>
                <div>ID: ${saved.employeeCode}</div>
                <div>Email: ${saved.email || '-'}</div>
                <div>Tel: ${saved.phone || '-'}</div>
              </div>
            </div>

            <div class="footer">
              <div>www.jtdactechhaiti.com</div>
              <div>Valid</div>
            </div>

            <div class="stripe"></div>

          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>

        </body>
        </html>
      `);

      printWindow.document.close();

    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l'employé");
    }
  };

  return (
    <div>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EmployeesPage;