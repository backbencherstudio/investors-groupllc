import React from "react";

import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
import { InvestorTable } from "./_components/investor-table";

import StatsCards from "@/app/(dashboard)/dashboard/admin/subscription/_components/StatsCards";
import { UserTable } from "../_components/UserTable";


const cardData = [
  {
    icon: ClipboardList,
    value: 86,
    label: "Total Tenant",
  },
  {
    icon: UserCheck,
    value: 18,
    label: "Active",
  },
  {
    icon: UserPlus,
    value: 64,
    label: "New",
  },
];

export default function Investor() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <UserTable userType="INVESTOR" title="Investor List" />
    </div>
  );
}
