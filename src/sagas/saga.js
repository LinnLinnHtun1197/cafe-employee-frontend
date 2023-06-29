import { call, takeEvery, put, takeLatest } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import {
  createNewCafe,
  deleteCafe,
  editCafe,
  getAllCafes,
} from "../features/cafe/cafeAPI";
import { addNewCafe, getCafes, updateCafe } from "../features/cafe/cafeSlice";

export function* fetchCafes() {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    let result = yield call(getAllCafes);
    yield put(getCafes(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export function* _createCafe({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    let result = yield call(createNewCafe, payload);
    yield put(addNewCafe(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export function* _updateCafe({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    let result = yield call(editCafe, payload);
    yield put(updateCafe(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export function* _deleteCafe({ payload }) {
  try {
    yield put({ type: sagaActions.SET_LOADING });
    yield call(deleteCafe, payload);
    // yield put(updateCafe(result));
  } catch (error) {
    yield put({ type: "CAFE_SAGA_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_CAFES, fetchCafes);
  yield takeEvery(sagaActions.CREATE_CAFE, _createCafe);
  yield takeEvery(sagaActions.UPDATE_CAFE, _updateCafe);
  yield takeLatest(sagaActions.DELETE_CAFE, _deleteCafe);
}
