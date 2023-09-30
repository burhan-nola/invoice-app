import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
};

const adminSlice: any = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
