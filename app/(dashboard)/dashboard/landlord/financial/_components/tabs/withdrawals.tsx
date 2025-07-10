import CoinHand from "@/components/icons/finanacial/CoinHand";

import Tick from "@/components/icons/finanacial/Tick";
import Request from "@/components/icons/finanacial/Request";
import Info from "@/components/icons/finanacial/Info";
import WithdrawalTable from "@/app/(dashboard)/dashboard/_components/withdrawal-table";
import StatsCards from "../../../user-manage/_components/card";


const cardData = [
  {
    icon: CoinHand,
    value: "300M",
    label: "Total Invested",
  },
  {
    icon: Tick,
    value: 832,
    label: "Withdraw",
  },
  {
    icon: Request,
    value: 3,
    label: "Pending",
  },
  {
    icon: Info,
    value: 327,
    label: "Property",
  },
];

export default function Withdrawals() {
  return (
    <div>
      {/* Card stats */}
      <section className="mt-4">
        <StatsCards cardData={cardData} />
      </section>

      {/* table */}
      <section className="mt-6">
        <WithdrawalTable />
      </section>
    </div>
  );
}
