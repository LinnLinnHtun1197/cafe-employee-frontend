import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cafeReducer from "../features/cafe/cafeSlice";
import saga from "../sagas/saga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    cafe: cafeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(saga);

export default store;
