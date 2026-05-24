"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearAuth,
  selectIsHydrated,
  selectUser,
  setHydrated,
  setUser,
} from "@/redux/features/auth/authSlice";
import { useFetchMeQuery } from "@/redux/features/auth/authApi";

const PUBLIC_PATHS = [
  "/login",
  "/forgot-password",
  "/enter-otp",
  "/reset-your-password",
  "/reset-successful",
];

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isHydrated = useAppSelector(selectIsHydrated);

  const isPublicRoute = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const {
    data: meUser,
    isSuccess,
    isError,
    isLoading,
  } = useFetchMeQuery(undefined, { skip: isPublicRoute || isHydrated });

  useEffect(() => {
    if (isPublicRoute) {
      dispatch(setHydrated(true));
      return;
    }
    if (isSuccess && meUser) {
      dispatch(setUser(meUser));
      dispatch(setHydrated(true));
    }
    if (isError) {
      dispatch(clearAuth());
      dispatch(setHydrated(true));
    }
  }, [isPublicRoute, isSuccess, isError, meUser, dispatch]);

  useEffect(() => {
    if (!isHydrated || isPublicRoute) return;
    if (!user) router.replace("/login");
  }, [user, isHydrated, isPublicRoute, router]);

  if (!isPublicRoute && (!isHydrated || isLoading)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-y-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
