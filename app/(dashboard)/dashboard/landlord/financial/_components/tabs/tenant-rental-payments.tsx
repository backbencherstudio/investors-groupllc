import React from "react";
import BagMoney from "@/components/icons/finanacial/BagMoney";
import Pending from "@/components/icons/finanacial/Pending";
import RentPayment from "../tables/tenant-rental-payment-table";
import StatsCards from "@/app/(dashboard)/dashboard/_components/common/StatsCards";


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
