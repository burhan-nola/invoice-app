import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  father: "",
  mother: "",
};

const parentSlice: any = createSlice({
  name: "parent",
  initialState,
  reducers: {
    setParent: (state, action) => {
      state.id = action.payload.id;
      state.father = action.payload.father;
      state.mother = action.payload.mother;
    },
  },
});

export const { setParent } = parentSlice.actions;
export default parentSlice.reducer;
