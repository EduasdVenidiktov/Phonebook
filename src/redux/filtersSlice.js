import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    searchContact: "",
  },
  reducers: {
    setStatusFilter(state, action) {
      state.searchContact = action.payload;
    },
  },
});
export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
