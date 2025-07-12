import React from "react";
import AdminDashboard from "./admin/page";
import LandlordDashboard from "./landlord/page";

export default function DashboardHome() {
  const role = "admin";

    if (role === "admin") {
      return <AdminDashboard />;
    }
    if (role === 'landlord') {
      return <LandlordDashboard />;
    }
  
}
