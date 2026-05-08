import API from "./api";

export const createEmployee = async (data) => {
  const res = await API.post("/employees", data);

  return res.data;
};
