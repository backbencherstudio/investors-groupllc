"use client"
import React from "react";
import Analytics from "../_components/anlytics";
// import { IncomeChart } from "../_components/income-chart";
import InvestmentMaintenance from "../_components/investment-maintenance";
import TenantTable from "../_components/tenant-table";
import InvestorTransectionTable from "../_components/investor-transection-table";
import WithdrawalTable from "../_components/withdrawal-table";
import IncomeChartSidebar from "../_components/income-chart";
import IncomeChart from "../_components/IncomeChart";
import { useGetDashboardOverviewQuery } from "@/redux/features/dashboard/dashboardApi";
import { DashboardOverviewData, InvestmentsOverview } from "@/redux/features/dashboard/dashboardTypes";

export default function AdminDashboard() {


  const { data: dashboardOverview } = useGetDashboardOverviewQuery();
  console.log("dashboardOverview", dashboardOverview);
  return (
    <div className="space-y-6">
      <Analytics statsData={dashboardOverview?.data as DashboardOverviewData}   />
      <IncomeChartSidebar data={dashboardOverview?.data as DashboardOverviewData}   />
      {/* <IncomeChart /> */}
      <InvestmentMaintenance data={dashboardOverview?.data as DashboardOverviewData}  />
      <TenantTable />
      <InvestorTransectionTable />
      <WithdrawalTable />
    </div>
  );
}
