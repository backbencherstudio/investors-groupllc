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
        <BreadcrumbList className="md:text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/request">Request</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* <BreadcrumbLink href={`/dashboard/request/`}> */}
            {tabs.find((tab) => tab.value === activeTab)?.label}
            {/* </BreadcrumbLink> */}
          </BreadcrumbItem>

          {activeTab === "tenant-requests" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {
                    subtabs.find((subtab) => subtab.value === activeSubtab)
                      ?.label
                  }
                </BreadcrumbPage>
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
        <TabsList className="  rounded-none ">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`pb-3 md:pb-6 text-sm md:text-lg font-semibold transition-colors  ${
                activeTab === tab.value
                  ? ""
                  : "text-zinc-400 border-transparent hover:text-orange-600"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <hr className=" absolute h-1 inset-x-0 top-[32px] " />
        <TabsContent value={activeTab}>
          <div className="pt-2">
            {/* <h2 className="text-lg font-semibold">Showing content for: </h2> */}
            <span className="text-orange-500">{loadTabContent(activeTab)}</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
