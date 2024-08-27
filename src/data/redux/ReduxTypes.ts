import { ThunkAction, Action } from "@reduxjs/toolkit";
import { store } from "./ReduxStore";

export enum LoadingState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export enum ACTIONS {
  AUTH = "AUTH",
  GLOBAL = "GLOBAL",
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
>;