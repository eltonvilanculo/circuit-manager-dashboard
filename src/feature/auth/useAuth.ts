import { AppThunk } from "@/data/redux/ReduxTypes";
import { toggleLoading } from "../global/AppSlice";

export default function useHome() {
  const togggleLoadingModal =
    (): AppThunk<any> => async (dispatch, getState) => {
      dispatch(toggleLoading);
    };

  return { togggleLoadingModal };
}
