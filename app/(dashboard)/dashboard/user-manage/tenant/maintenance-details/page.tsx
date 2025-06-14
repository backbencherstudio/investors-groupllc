import React from "react";
import Card from "../../_components/card";
import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
import { MaintenanceList } from "./_components/maintenance-list";

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
      <Card cardData={cardData} />
      <MaintenanceList />
    </div>
  );
}
