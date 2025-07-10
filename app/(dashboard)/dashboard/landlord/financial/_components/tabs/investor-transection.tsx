import React from "react";
import Coins from "@/components/icons/finanacial/Coins";
import Screen from "@/components/icons/finanacial/Screen";
import InvestorTransectionTable from "@/app/(dashboard)/dashboard/_components/investor-transection-table";
import StatsCards from "@/app/(dashboard)/dashboard/_components/common/card";


const cardData = [
  {
    icon: Coins,
    value: "300M",
    label: "Total Invested",
  },
  {
    icon: Screen,
    value: 832,
    label: "Withdraw",
  },
  {
    icon: Screen,
    value: 3,
    label: "Pending",
  },
  {
    icon: Screen,
    value: 327,
    label: "Property",
  },
];

export default function InvestorTransection() {
  return (
    <div>
      {/* Card stats */}
      <section className="mt-4">
        <StatsCards cardData={cardData} />
      </section>

      {/* table */}
      <section className="mt-6">
        <InvestorTransectionTable />
      </section>
    </div>
  );
}
