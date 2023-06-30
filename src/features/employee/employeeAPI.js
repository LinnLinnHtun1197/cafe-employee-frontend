import { axios } from "../../helper/helper";

export const getAllEmployees = async () => {
  try {
    const employees = await axios.get("employees");
    return employees.data;
  } catch (error) {
    return console.error(error);
  }
};

export const getEachCafeEmployees = async (cafeId) => {
  try {
    const employees = await axios.get(`employees/search?cafe_id=${cafeId}`);
    return employees.data;
  } catch (error) {
    return console.error(error);
  }
};

export const createNewEmployee = async (data) => {
  try {
    const employee = await axios.post("employee", JSON.stringify(data));
    return employee.data;
  } catch (error) {
    return console.error(error);
  }
};

export const editEmployee = async (data) => {
  try {
    const employee = await axios.put("employee", JSON.stringify(data));
    return employee.data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteEmployee = async (id) => {
  try {
    const employee = await axios.delete(`employee/${id}/delete`);
    return employee.data;
  } catch (error) {
    return console.error(error);
  }
};
