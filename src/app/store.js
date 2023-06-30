import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cafeReducer from "../features/cafe/cafeSlice";
import empReducer from "../features/employee/employeeSlice";
import rootSaga from "../sagas";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    cafe: cafeReducer,
    emp: empReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default store;
