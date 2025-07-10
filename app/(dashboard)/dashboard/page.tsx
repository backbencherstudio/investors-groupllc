import React from "react";
import AdminDashboard from "./_components/admin/admin-dashboard";
import LandlordDashboard from "./_components/landlord/landlord-dashboard";

export default function DashboardHome() {
  const role = "landlord";

  return (
    <div className="space-y-6">
      {role === "admin" ? <AdminDashboard /> : <LandlordDashboard />}
    </div>
  );
}
