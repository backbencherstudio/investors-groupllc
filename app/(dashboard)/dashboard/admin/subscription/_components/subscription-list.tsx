import StatsCards from "./StatsCards";
import { SubscriptionTable } from "../../../landlord/subscription/_components/subscription-table";

type SubscriptionData = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  paidDate: string;
  planType: string;
  amount: string;
  methods: string;
  status: string;
};

export default function SubscriptionPlan() {
  return (
    <div className="">
      {/* Card stats */}
      <section className="my-6">
        <StatsCards />
      </section>
      {/* Table */}
      <div className="">
        <SubscriptionTable />
      </div>
    </div>
  );
}
