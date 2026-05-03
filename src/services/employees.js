//src/services/employees.js

import axios from "axios";

const API = "http://localhost:3000/employees";

export const createEmployee = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};