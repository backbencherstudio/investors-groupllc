"use client";

import { useState, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TenantRentalPayments from "./tabs/tenant-rental-payments";
import InvestorTransaction from "./tabs/investor-transection"; // Consider renaming the file/component for consistency
import Withdrawals from "./tabs/withdrawals";
import CustomBreadSeparator from "../../../_components/common/CustomBreadSeparator";

const TAB_CONFIG = {
  "tenant-rental-payments": {
    label: "Tenant Rental Payments",
    content: <TenantRentalPayments />,
  },
  "investor-transaction": {
    label: "Investor Transaction",
    content: <InvestorTransaction />,
  },
  withdrawals: {
    label: "Withdrawals",
    content: <Withdrawals />,
  },
} as const;

type TabKey = keyof typeof TAB_CONFIG;

export default function FinancialPageContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("tenant-rental-payments");

  const handleTabChange = useCallback(
    (value: string) => setActiveTab(value as TabKey),
    []
  );

  return (
    <div>
      {/* Bread Crumb start */}
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
            {TAB_CONFIG[activeTab].label}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tab section start */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="border-b-2 overflow-x-auto whitespace-nowrap overflow-y-hidden h-10">
          <TabsList className="gap-10">
            {Object.entries(TAB_CONFIG).map(([key, { label }]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold  h-10 rounded-none "
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {Object.entries(TAB_CONFIG).map(([key, { content }]) => (
          <TabsContent key={key} value={key}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
