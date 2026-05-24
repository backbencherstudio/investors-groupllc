import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/features/api/baseApi";
import authReducer from "@/redux/features/auth/authSlice";
import "@/redux/features/subscription/SubscriptionApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
