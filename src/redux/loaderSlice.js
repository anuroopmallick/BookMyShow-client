import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: function (state) {
      state.loading = true;
    },
    hideLoading: function (state) {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = loaderSlice.actions;

export default loaderSlice;
