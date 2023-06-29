import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  cafes: [],
};

export const cafeSlice = createSlice({
  name: "cafe",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getCafes: (state, action) => {
      const cafeData = action.payload;
      state.cafes = cafeData;
    },
    addNewCafe: (state, action) => {
      const cafeData = action.payload;
      state.cafes = cafeData;
    },
    updateCafe: (state, action) => {
      let idx = state.cafes.findIndex((cafe) => cafe.id === action.payload.id);
      if (idx >= 0) {
        state.cafes[idx] = action.payload;
      }
    },
  },
});

export const { getCafes, addNewCafe, updateCafe } = cafeSlice.actions;

export const selectCafes = (state) => state.cafe.cafes;
export const selectLoading = (state) => state.cafe.loading;

export default cafeSlice.reducer;
