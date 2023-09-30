import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "./slices/Header";
import AdminReducer from "./slices/AdminLogin";
import ParentReducer from "./slices/Parent";
import DateReducer from "./slices/DateNow";

export const store = configureStore({
  reducer: {
    header: HeaderReducer,
    admin: AdminReducer,
    parent: ParentReducer,
    date: DateReducer,
  },
});
