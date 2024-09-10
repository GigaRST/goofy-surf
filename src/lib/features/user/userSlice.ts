import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLogged: boolean;
}

const initialState: UserState = {
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
    setIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
  },
});

export const { login, logout, setIsLogged } = userSlice.actions;

export default userSlice.reducer;
