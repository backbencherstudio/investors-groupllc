import React from "react";
import Card from "../../../user-manage/_components/card";
import Coins from "@/components/icons/finanacial/Coins";
import Screen from "@/components/icons/finanacial/Screen";
import InvestorTransectionTable from "../../../_components/investor-transection-table";

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
        <Card cardData={cardData} />
      </section>

      {/* table */}
      <section className="mt-6">
        <InvestorTransectionTable/>
      </section>
    </div>
  );
}
