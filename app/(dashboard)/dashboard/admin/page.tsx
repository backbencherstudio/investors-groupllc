import React from "react";
import Analytics from "../_components/anlytics";
import { IncomeChart } from "../_components/income-chart";
import InvestmentMaintenance from "../_components/investment-maintenance";
import TenantTable from "../_components/tenant-table";
import InvestorTransectionTable from "../_components/investor-transection-table";
import WithdrawalTable from "../_components/withdrawal-table";

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
