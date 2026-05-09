"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useFetchMeQuery } from "@/redux/features/auth/authApi";
import {
  clearAuth,
  setHydrated,
  setUser,
} from "@/redux/features/auth/authSlice";

const PUBLIC_PATHS = [
  "/",
  "/forgot-password",
  "/enter-otp",
  "/reset-your-password",
  "/reset-successful",
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const { data: user, isSuccess, isError, isLoading } = useFetchMeQuery(
    undefined,
    { skip: isPublicRoute }
  );

  useEffect(() => {
    if (isPublicRoute) {
      dispatch(setHydrated(true));
      return;
    }

    if (isSuccess && user) {
      dispatch(setUser(user));
      dispatch(setHydrated(true));
    }
    if (isError) {
      dispatch(clearAuth());
      dispatch(setHydrated(true));
    }
  }, [isPublicRoute, isSuccess, isError, user, dispatch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
