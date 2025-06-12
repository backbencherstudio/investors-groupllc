import React from "react";
import Analytics from "./_components/anlytics";
import IncomeChart from "./_components/income-chart";
import InvestmentMaintenance from "./_components/investment-maintenance";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* <h1>Dashboard HOme</h1> */}
      <Analytics />
      <IncomeChart />
      <InvestmentMaintenance />
    </div>
  );
}
