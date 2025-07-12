"use client";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomBreadSeparator from "../../_components/common/CustomBreadSeparator";
import { useState } from "react";
import Booking from "./_components/tabs/booking";

import MaintenanceRequests from "./_components/tabs/maintenance";
import PropertyTour from "./_components/tabs/property-tour";
import Transfer from "./_components/tabs/transfer";

const tabItems = [
  { label: "Booking", value: "booking", content: <Booking /> },
  { label: "Transfer", value: "transfer", content: <Transfer /> },
  {
    label: "Maintenance",
    value: "maintenance",
    content: <MaintenanceRequests />,
  },
  { label: "Property Tour", value: "property-tour", content: <PropertyTour /> },
];

export default function RequestPage() {
  const [activeTab, setActiveTab] = useState("booking");

  return (
    <div>
      {/* BreadCrumb */}
      <Breadcrumb>
        <BreadcrumbList className="md:text-lg font-medium">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/landlord/request">
              Request
            </BreadcrumbLink>
          </BreadcrumbItem>
          <CustomBreadSeparator />
          <BreadcrumbItem
            className={` ${"text-lg font-semibold text-[#170A00] capitalize"} `}
          >
            {activeTab}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className=" rounded-md relative mt-6"
      >
        <div className=" overflow-x-auto whitespace-nowrap ">
          <TabsList className="flex gap-5 bg-transparent p-0 border-none mb-4">
            {tabItems.map((subtab) => (
              <TabsTrigger
                key={subtab.value}
                value={subtab.value}
                // className="relative data-[state=active]:bg-transparent data-[state=active]:text-green-700 data-[state=active]:shadow-none px-4 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5  after:scale-x-0 after:transition-transform after:duration-200 after:origin-left data-[state=active]:after:scale-x-100 border-none"
                className="after:bg-transparent border rounded-md data-[state=active]:border-[#D80] data-[state=active]:bg-[#D80] data-[state=active]:text-white px-4 py-2  text-[#707070] cursor-pointer"
              >
                {subtab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <div className="pt-2">
            {tabItems.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.content}
              </TabsContent>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
