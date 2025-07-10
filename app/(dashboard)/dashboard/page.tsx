import React from "react";
import AdminDashboard from "./admin/page";
import LandlordDashboard from "./landlord/page";
// import AdminDashboard from "./_components/admin/admin-dashboard";
// import LandlordDashboard from "./_components/landlord/landlord-dashboard";

type role = "admin" | "landlord" | null;

export default function DashboardHome() {
  const role: role = "admin";

  return (
    <div className="space-y-6">
      {role === "admin" ? <AdminDashboard /> : <LandlordDashboard />}
    </div>
  );
}
