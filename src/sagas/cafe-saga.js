import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import {
  createNewCafe,
  deleteCafe,
  editCafe,
  getAllCafes,
} from "../features/cafe/cafeAPI";
import {
  addNewCafe,
  getCafes,
  updateCafe,
  updateResponse,
} from "../features/cafe/cafeSlice";

export function* fetchCafes() {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(getAllCafes);
    yield put(getCafes(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export function* _createCafe({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(createNewCafe, payload);
    yield put(addNewCafe(result.data));
    yield put(updateResponse(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export function* _updateCafe({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(editCafe, payload);
    yield put(updateCafe(result.data));
    yield put(updateResponse(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export function* _deleteCafe({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    const result = yield call(deleteCafe, payload);
    window.location.reload();
    yield put(updateResponse(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

// Export the saga (cafe-saga)
export default function* cafeSaga() {
  yield takeEvery(sagaActions.FETCH_CAFES, fetchCafes);
  yield takeEvery(sagaActions.CREATE_CAFE, _createCafe);
  yield takeEvery(sagaActions.UPDATE_CAFE, _updateCafe);
  yield takeEvery(sagaActions.DELETE_CAFE, _deleteCafe);
}
