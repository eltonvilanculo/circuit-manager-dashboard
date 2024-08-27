import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
};

type AuthSlice = {
  user: User | undefined;
};

const initialState: AuthSlice = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = undefined;
    },
  },
});

// export const signInWithPin = createAsyncThunk(
//   `${ACTIONS.AUTH}/pin`,
//   async (pin: string, thunkAPI) => {
//     thunkAPI.dispatch(setButtonLoading());
//     try {
//       const response = await api.post("/auth/pin", { pin });
//       const token = response.data.data;
//       api.defaults.headers.common["Authorization"] = "Bearer " + token;
//       const userResponse = await api.get("/me");
//       const user = userResponse.data.user;

//       thunkAPI.dispatch(
//         authSlice.actions.setUser({
//           id: user.id,
//           name: user.name,
//         })
//       );
//       showSnackBarThunk(
//         thunkAPI,
//         `Bem vindo/a ${user.name}`,
//         MessageType.SUCCESS
//       );
//     } catch (error) {
//       if (error instanceof Error) {
//         showSnackBarThunk(thunkAPI, error.message);
//       } else {
//         showSnackBarThunk(thunkAPI, "Ocorreu um erro ");
//       }
//     } finally {
//       setButtonNotLoading();
//     }
//   }
// );
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
