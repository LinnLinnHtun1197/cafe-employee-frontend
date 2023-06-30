import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import {
  createNewEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
  getEachCafeEmployees,
} from "../features/employee/employeeAPI";
import {
  addNewEmp,
  getEmployees,
  updateEmp,
  updateResponse,
} from "../features/employee/employeeSlice";

export function* fetchEmployees() {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(getAllEmployees);
    yield put(getEmployees(result));
  } catch (error) {
    yield put({ type: "EMP_SAGA_FAILED" });
  }
}

export function* fetchEachCafeEmployees({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(getEachCafeEmployees, payload);
    yield put(getEmployees(result));
  } catch (error) {
    yield put({ type: "EMP_SAGA_FAILED" });
  }
}

export function* _createEmp({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(createNewEmployee, payload);
    yield put(addNewEmp(result.data));
    yield put(updateResponse(result));
  } catch (error) {
    yield put({ type: "EMP_SAGA_FAILED" });
  }
}

export function* _updateEmp({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(editEmployee, payload);
    yield put(updateEmp(result.data));
    yield put(updateResponse(result));
  } catch (error) {
    yield put({ type: "EMP_SAGA_FAILED" });
  }
}

export function* _deleteEmp({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(deleteEmployee, payload);
    window.location.reload();
    yield put(updateResponse(result));
  } catch (error) {
    yield put({ type: "EMP_SAGA_FAILED" });
  }
}
// Export the saga (employee-saga)
export default function* employeeSaga() {
  yield takeEvery(sagaActions.FETCH_EMP, fetchEmployees);
  yield takeEvery(sagaActions.FETCH_CAFE_EMP, fetchEachCafeEmployees);
  yield takeEvery(sagaActions.CREATE_EMP, _createEmp);
  yield takeEvery(sagaActions.UPDATE_EMP, _updateEmp);
  yield takeEvery(sagaActions.DELETE_EMP, _deleteEmp);
}
