import React from "react";
import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
// import Card from "../_components/card";
import { VendorTable } from "./_components/vendor-table";
import StatsCards from "../../../_components/common/StatsCards";


const cardData = [
  {
    icon: ClipboardList,
    value: 33,
    label: "Total Tenant",
  },
  {
    icon: UserCheck,
    value: 91,
    label: "Active",
  },
  {
    icon: UserPlus,
    value: 53,
    label: "New",
  },
];


export default function Vendor() {
  return (
    <div className="space-y-6">
      {/* <Card cardData={cardData} /> */}
      <StatsCards cardData={cardData}/>
      <VendorTable />
    </div>
  );
}
