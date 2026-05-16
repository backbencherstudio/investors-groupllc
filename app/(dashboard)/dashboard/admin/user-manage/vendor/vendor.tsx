import React from "react";
import { ClipboardList, UserCheck, UserPlus } from "lucide-react";

import { VendorTable } from "./_components/vendor-table";
import StatsCards from "../../subscription/_components/StatsCards";
import { UserTable } from "../_components/UserTable";


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
      <StatsCards />
      {/* <VendorTable />
       */}
       <UserTable userType="VENDOR" title="Vendor List" />
    </div>
  );
}
