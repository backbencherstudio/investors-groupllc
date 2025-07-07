import CoinHand from "@/components/icons/finanacial/CoinHand";
import Card from "../../../user-manage/_components/card";
import Tick from "@/components/icons/finanacial/Tick";
import Request from "@/components/icons/finanacial/Request";
import Info from "@/components/icons/finanacial/Info";
import WithdrawalTable from "../../../_components/withdrawal-table";

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
        <Card cardData={cardData} />
      </section>

      {/* table */}
      <section className="mt-6">
        <WithdrawalTable/>
      </section>
    </div>
  );
}
