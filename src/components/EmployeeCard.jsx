import React from "react";
import "./employee-card.css";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="card">
      <div className="card-header">JT.DACTECH Haiti</div>

      <div className="card-body">
        <img
          src={employee.photo || "https://via.placeholder.com/120"}
          alt="profile"
          className="photo"
        />

        <h3>{employee.firstName} {employee.lastName}</h3>

        <p><strong>ID:</strong> {employee.employeeCode}</p>
        <p><strong>Poste:</strong> {employee.role}</p>
        <p><strong>Tel:</strong> {employee.phone}</p>
      </div>

      <div className="card-footer">
        www.jtdactechhaiti.com
      </div>
    </div>
  );
};

export default EmployeeCard;