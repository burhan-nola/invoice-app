import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
// const formatDate = format(date, "dd/MM/yyyy");
const month = date.getMonth() + 1;
const year = date.getFullYear();

const initialState = {
  date: {
    month: month,
    year: year,
  },
};

const dateSlice: any = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.date;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
