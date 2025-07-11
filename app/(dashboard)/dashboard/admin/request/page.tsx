"use client";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import TenantRequests from "./_components/tenant-reqeust";
import InvestmentApplications from "./_components/investment-application";
import PropertyListingRequest from "./_components/property-listing-reqest";
import CustomBreadSeparator from "../../_components/common/CustomBreadSeparator";

// Main tabs data
const tabs = [
  { label: "Tenant Requests", value: "tenant-requests" },
  { label: "Investment Applications", value: "investment-applications" },
  { label: "Property Listing Requests", value: "property-listing-requests" },
];
// Sub-tabs data
const subtabs = [
  { label: "Booking", value: "booking" },
  { label: "Transfer", value: "transfer" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Property Tour", value: "property-tour" },
];
export default function RequestPage() {
  const [activeTab, setActiveTab] = useState("tenant-requests");
  const [activeSubtab, setActiveSubtab] = useState("booking");

  // Function to load content dynamically based on tab value
  const loadTabContent = (tabValue: string) => {
    switch (tabValue) {
      case "tenant-requests":
        return (
          <TenantRequests
            subtabs={subtabs}
            activeSubtab={activeSubtab}
            setActiveSubtab={setActiveSubtab}
          />
        );
      case "investment-applications":
        return <InvestmentApplications />;
      case "property-listing-requests":
        return <PropertyListingRequest />;
      default:
        return <div>Invalid Tab</div>;
    }
  };

  return (
    <div className="p-2 ">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList className="md:text-lg font-medium">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/admin/request">
              Request
            </BreadcrumbLink>
          </BreadcrumbItem>
          <CustomBreadSeparator />
          <BreadcrumbItem
            className={` ${
              activeTab === "tenant-requests" ||
              "text-lg font-semibold text-[#170A00]"
            } `}
          >
            {/* <BreadcrumbLink href={`/dashboard/request/`}> */}
            {tabs.find((tab) => tab.value === activeTab)?.label}
            {/* </BreadcrumbLink> */}
          </BreadcrumbItem>

          {activeTab === "tenant-requests" && (
            <>
              <CustomBreadSeparator />
              <BreadcrumbItem className="text-lg font-semibold text-[#170A00]">
                {subtabs.find((subtab) => subtab.value === activeSubtab)?.label}
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className=" rounded-md relative"
      >
        <div className=" overflow-x-auto whitespace-nowrap border-b-2 h">
          <TabsList className="gap-8  rounded-none p-[0px] ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
              

                className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {/* <hr className=" absolute h-[6px] w-full top-[32px]  " /> */}
        {/* <hr className=" absolute bottom-0.5 w-full " /> */}
        <TabsContent value={activeTab}>
          <div className="pt-2">
            <span className="text-orange-500">{loadTabContent(activeTab)}</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
