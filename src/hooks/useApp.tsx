import { useAppDispatch } from "@/data/redux/useRedux";
import { setCurrentPage, toggleLoading } from "@/feature/global/AppSlice";

export default function useApp() {
  const dispatch = useAppDispatch();

  const _setCurrentPage = (page: string) => {
    dispatch(setCurrentPage(page));
  };
  const _toggleLoading = () => {
    dispatch(toggleLoading());
  };

  return { _setCurrentPage, _toggleLoading };
}
