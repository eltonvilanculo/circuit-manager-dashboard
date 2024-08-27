import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppConfig = {
  language: string;
  mode: string;
  isLoading: boolean;
  errorAlert: ErrorAlert;
  currentPage: string;
};

type ErrorAlert = {
  title: string;
  description: string;
  isVisible: boolean;
};

const initialState: AppConfig = {
  language: "pt-MZ",
  mode: "light",
  isLoading: false,
  errorAlert: {
    title: "",
    description: "",
    isVisible: false,
  },
  currentPage: "dashboard",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },

    showErrorAlert(
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) {
      state.errorAlert = {
        title: action.payload.title,
        description: action.payload.description,
        isVisible: true,
      };
    },

    closeErrorAlert(state) {
      state.errorAlert = {
        title: "action.payload.title",
        description: "action.payload.description",
        isVisible: false,
      };
    },
  },
});

export const {
  setLanguage,
  toggleLoading,
  showErrorAlert,
  closeErrorAlert,
  setCurrentPage,
} = appSlice.actions;
export default appSlice.reducer;
