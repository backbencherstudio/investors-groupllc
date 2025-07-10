import React from "react";
import Analytics from "../anlytics";
import { IncomeChart } from "../income-chart";
import InvestmentMaintenance from "../investment-maintenance";
import TenantTable from "../tenant-table";
import InvestorTransectionTable from "../investor-transection-table";
import WithdrawalTable from "../withdrawal-table";

export default function AdminDashboard() {
  return (
    <div>
      <Analytics />
      <IncomeChart />
      <InvestmentMaintenance />
      <TenantTable />
      <InvestorTransectionTable />
      <WithdrawalTable />
    </div>
  );
}
