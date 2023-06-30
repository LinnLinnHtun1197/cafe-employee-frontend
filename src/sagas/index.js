import { spawn } from "redux-saga/effects";

// Sagas
import cafeSaga from "./cafe-saga";
import employeeSaga from "./employee-saga";

// Export the root saga
export default function* rootSaga() {
  yield spawn(cafeSaga);
  yield spawn(employeeSaga);
}
