import React from "react";
import Card from "../../../user-manage/_components/card";
import BagMoney from "@/components/icons/finanacial/BagMoney";
import Pending from "@/components/icons/finanacial/Pending";
import RentPayment from "./withdrawal-list";
import StatsCards from "../../../user-manage/_components/card";

const cardData = [
  {
    icon: BagMoney,
    value: 52,
    label: "Total Rent Collected",
  },
  {
    icon: Pending,
    value: 32,
    label: "Due",
  },
];

export default function TenantRentalPayments() {
  return (
    <div>
      {/* Card stats */}
      <section className="mt-4">
        <StatsCards cardData={cardData} />
      </section>

      {/* table */}
      <section className="mt-6">
        <RentPayment />
      </section>
    </div>
  );
}
