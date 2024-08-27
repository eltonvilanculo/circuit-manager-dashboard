import AuthSlice from "@/feature/auth/AuthSlice";
import AppSlice from "@/feature/global/AppSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    authReducer: AuthSlice,
    appReducer: AppSlice,
  },
});
