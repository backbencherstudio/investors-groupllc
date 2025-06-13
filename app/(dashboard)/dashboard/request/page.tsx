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
import Link from "next/link";
import { useState } from "react";

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
  // const [activeSubtab, setActiveSubtab] = useState("booking");

  return (
    <div className="bg-[#FAFAFA] p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList className=" text-lg ">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/request">Request</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/request/`}>
              {activeTab}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {activeTab === "tenant-requests" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Test</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tabs */}

      <Tabs
        defaultValue={activeTab}
        className="bg-white rounded-md p-1 shadow-none border border-gray-200"
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`pb-3 text-base font-semibold transition-colors border-b-2 ${
                activeTab === tab.value
                  ? "text-orange-700 border-orange-500"
                  : "text-zinc-400 border-transparent hover:text-orange-700"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="pt-4">
            <h2 className="text-lg font-semibold">Showing content for: </h2>
            <span className="text-orange-500">{activeTab}</span>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sub-tabs */}
      {/* <div className="flex gap-2 mt-2 mb-4">
        {subtabs.map((st) => (
          <button
            key={st.value}
            onClick={() => setActiveSubtab(st.value)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${
              activeSubtab === st.value
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-orange-50"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div> */}

      {/* Page Content */}
      <div className="pt-4">
        <h2 className="text-lg font-semibold">Showing content for: </h2>
        <span className="text-orange-500">{}</span>
      </div>
    </div>
  );
}
