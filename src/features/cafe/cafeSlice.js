import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cafeId: "",
  cafes: [],
  response: {},
};

export const cafeSlice = createSlice({
  name: "cafe",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    updateCafeId: (state, action) => {
      state.cafeId = action.payload;
    },
    getCafes: (state, action) => {
      const cafeData = action.payload;
      state.cafes = cafeData;
    },
    addNewCafe: (state, action) => {
      const cafeData = action.payload;
      state.cafes.push(cafeData);
    },
    updateCafe: (state, action) => {
      let idx = state.cafes.findIndex((cafe) => cafe.id === action.payload.id);
      if (idx >= 0) {
        state.cafes[idx] = action.payload;
      }
    },
    updateResponse: (state, action) => {
      state.response.status = action.payload.status;
      state.response.message = action.payload.message;
    },
  },
});

export const {
  updateCafeId,
  getCafes,
  addNewCafe,
  updateCafe,
  updateResponse,
} = cafeSlice.actions;

export const selectCafeId = (state) => state.cafe.cafeId;
export const selectCafes = (state) => state.cafe.cafes;
export const selectLoading = (state) => state.cafe.loading;
export const selectResponse = (state) => state.cafe.response;

export default cafeSlice.reducer;
