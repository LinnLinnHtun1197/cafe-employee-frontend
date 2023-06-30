import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  response: {},
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployees: (state, action) => {
      const empData = action.payload;
      state.employees = empData;
    },
    addNewEmp: (state, action) => {
      const empData = action.payload;
      state.employees.push(empData);
    },
    updateEmp: (state, action) => {
      let idx = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (idx >= 0) {
        state.employees[idx] = action.payload;
      }
    },
    updateResponse: (state, action) => {
      state.response.status = action.payload.status;
      state.response.message = action.payload.message;
    },
  },
});

export const { getEmployees, addNewEmp, updateEmp, updateResponse } =
  employeeSlice.actions;

export const selectEmployees = (state) => state.emp.employees;
export const selectResponse = (state) => state.emp.response;

export default employeeSlice.reducer;
