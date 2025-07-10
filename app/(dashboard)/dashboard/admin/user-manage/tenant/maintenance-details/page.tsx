import React from "react";
import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
import { MaintenanceList } from "./_components/maintenance-list";
import StatsCards from "@/app/(dashboard)/dashboard/_components/common/card";

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
    value: 202,
    label: "New",
  },
];

export default function MaintenanceDetail() {
  return (
    <div className="space-y-6">
      <StatsCards cardData={cardData} />
      <MaintenanceList />
    </div>
  );
}
