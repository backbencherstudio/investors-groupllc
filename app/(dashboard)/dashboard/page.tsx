"use client";

import AdminDashboard from "./admin/page";
import LandlordDashboard from "./landlord/page";
import { useRole } from "@/hooks/use-role";

export default function DashboardHome() {
  const role = useRole();

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "landlord") {
    return <LandlordDashboard />;
  }

  return null;
}
