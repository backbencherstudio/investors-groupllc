import React from "react";

import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
import { DataTable } from "../_components/table";
import StatsCards from "@/app/(dashboard)/dashboard/_components/common/StatsCards";


const cardData = [
  {
    icon: ClipboardList,
    value: 52,
    label: "Total Tenant",
  },
  {
    icon: UserCheck,
    value: 32,
    label: "Active",
  },
  {
    icon: UserPlus,
    value: 20,
    label: "New",
  },
];

export default function Tenant() {
  return (
    <div className="space-y-6">
      <StatsCards cardData={cardData} />
      <DataTable />
    </div>
  );
}
