"use client";

import { type ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import {
  selectIsHydrated,
  selectUserRole,
} from "@/redux/features/auth/authSlice";
import type { UserRole } from "@/redux/features/auth/authTypes";

const ROLE_HOME: Record<UserRole, string> = {
  admin: "/dashboard/admin",
  landlord: "/dashboard/landlord",
};

type RoleGuardProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const isHydrated = useAppSelector(selectIsHydrated);
  const role = useAppSelector(selectUserRole);

  const isAllowed = role !== null && allowedRoles.includes(role);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAllowed) {
      // Send them to their own dashboard, or /dashboard as a fallback.
      router.replace(role ? ROLE_HOME[role] : "/dashboard");
    }
  }, [isHydrated, isAllowed, role, router]);

  // Blank screen while hydrating or before redirect fires.
  if (!isHydrated || !isAllowed) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
