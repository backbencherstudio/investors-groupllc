"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import CustomBreadSeparator from "../../_components/common/CustomBreadSeparator";
import TenantRentalPayments from "./tabs/tenant-rental-payments";

import CustomBreadSeparator from "../../../_components/common/CustomBreadSeparator";
import MyWithdrawals from "./tabs/my-withdrawals";

export default function FinancialPageContent() {
  type TabKey = "tenant-rental-payments" | "my-withdrawals";

  const [activeTab, setActiveTab] = useState<TabKey>("tenant-rental-payments");

  const breadcrumbTitle: Record<TabKey, string> = {
    "tenant-rental-payments": "Tenant Rental Payments",
    "my-withdrawals": "My Withdrawals",
  };

  return (
    <div>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-lg font-medium"
              href="/dashboard/financial"
            >
              Finance
            </BreadcrumbLink>
          </BreadcrumbItem>

          <CustomBreadSeparator />

          <BreadcrumbItem className="text-lg font-semibold text-[#170A00]">
            {breadcrumbTitle[activeTab]}{" "}
            {/* Dynamically displays the active tab title */}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tabs section */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabKey)}
      >
        <div className="relative">
          {/* <TabsList className="gap-10">
            <TabsTrigger
              value="tenant-rental-payments"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
            >
              Tenant Rental Payments
            </TabsTrigger>
            <TabsTrigger
              value="investor-transaction"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none "
            >
              Investor Transaction
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
            >
              Withdrawals
            </TabsTrigger>
          </TabsList> */}
          <hr className=" absolute bottom-0.5 w-full" />

          <TabsList className="gap-10">
            {Object.entries(breadcrumbTitle).map(([key, val]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
              >
                {val}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div></div>

        <TabsContent value="tenant-rental-payments">
          <div>
            <TenantRentalPayments />
          </div>
        </TabsContent>

        <TabsContent value="my-withdrawals">
          <MyWithdrawals />
        </TabsContent>
      </Tabs>
    </div>
  );
}
