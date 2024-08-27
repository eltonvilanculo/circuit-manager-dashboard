import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./ReduxTypes";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelelector: TypedUseSelectorHook<RootState> = useSelector;
