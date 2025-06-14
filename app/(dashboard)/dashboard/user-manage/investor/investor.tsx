import React from "react";

import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
import { DataTable } from "../_components/table";
import Card from "../_components/card";
import { InvestorTable } from "./_components/investor-table";

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
      <Card cardData={cardData} />
      <InvestorTable />
    </div>
  );
}
