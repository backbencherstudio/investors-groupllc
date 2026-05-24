import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, UserRole } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setHydrated(state, action: PayloadAction<boolean>) {
      state.isHydrated = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.isHydrated = true; // stay hydrated so AuthGuard skips /me and redirects via user===null
    },
  },
});

export const { setUser, setHydrated, clearAuth } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsHydrated = (state: { auth: AuthState }) =>
  state.auth.isHydrated;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.user !== null;

export const selectUserRole = (state: { auth: AuthState }): UserRole | null => {
  const type = state.auth.user?.type?.toLowerCase();
  if (type === "admin" || type === "landlord") return type;
  return null;
};

export default authSlice.reducer;
