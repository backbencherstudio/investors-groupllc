import CoinHand from "@/components/icons/finanacial/CoinHand";

import Tick from "@/components/icons/finanacial/Tick";
import Request from "@/components/icons/finanacial/Request";
import Info from "@/components/icons/finanacial/Info";

import StatsCards from "@/app/(dashboard)/dashboard/_components/common/StatsCards";
import MyWithdrawalTable from "../tables/my-withdrawal-table";



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

export default function MyWithdrawals() {
  return (
    <div>
      {/* Card stats */}
      <section className="mt-4">
        <StatsCards cardData={cardData} />
      </section>

      {/* table */}
      <section className="mt-6">
        <MyWithdrawalTable/>
      </section>
    </div>
  );
}
