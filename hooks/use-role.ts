"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectUserRole } from "@/redux/features/auth/authSlice";
import type { UserRole } from "@/redux/features/auth/authTypes";

export function useRole(): UserRole | null {
  return useAppSelector(selectUserRole);
}
