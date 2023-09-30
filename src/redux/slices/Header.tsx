import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  headers: {
    token: token,
  },
};

const headerSlice : any = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeader: (state, action) => {
      state.headers = action.payload.headers;
    },
  },
});

export const { setHeader } = headerSlice.actions;
export default headerSlice.reducer;
