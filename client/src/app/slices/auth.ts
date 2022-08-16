import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type State = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: State = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { setIsAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;
