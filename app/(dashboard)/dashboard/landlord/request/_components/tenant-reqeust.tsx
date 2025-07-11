import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Booking from "./sub-tab/booking";
import Transfer from "./sub-tab/transfer";
import MaintenanceRequests from "./sub-tab/maintenance";
import PropertyTour from "./sub-tab/property-tour";

interface Subtab {
  label: string;
  value: string;
}

const loadSubtabContent = (subtabValue: string) => {
  if (subtabValue === "booking") {
    return <Booking />;
  } else if (subtabValue === "transfer") {
    return <Transfer />;
  } else if (subtabValue === "maintenance") {
    return <MaintenanceRequests />;
  } else if (subtabValue === "property-tour") {
    return <PropertyTour />;
  } else {
    return <div>Invalid Subtab</div>;
  }
};

export default function TenantRequests({
  subtabs,
  activeSubtab,
  setActiveSubtab,
}: {
  subtabs: Subtab[];
  activeSubtab: string;
  setActiveSubtab: (value: string) => void;
}) {
  // Manage active tab state
  console.log("Active Subtab:", activeSubtab);

  return (
    <div>
      <Tabs
        value={activeSubtab}
        onValueChange={(value) => {
          setActiveSubtab(value);
          console.log("Active Subtab:", value);
        }}
        className=""
      >
        <TabsList className="flex gap-5 bg-transparent p-0 border-none mb-4 ">
          {subtabs.map((subtab) => (
            <TabsTrigger
              key={subtab.value}
              value={subtab.value}
              // className="relative data-[state=active]:bg-transparent data-[state=active]:text-green-700 data-[state=active]:shadow-none px-4 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5  after:scale-x-0 after:transition-transform after:duration-200 after:origin-left data-[state=active]:after:scale-x-100 border-none"
              className="after:bg-transparent border rounded-md data-[state=active]:border-[#D80] data-[state=active]:bg-[#D80] data-[state=active]:text-white px-4 py-2  text-[#707070] overflow-x-auto"
            >
              {subtab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="booking">
          {loadSubtabContent("booking")}
        </TabsContent>
        <TabsContent value="transfer">
          {loadSubtabContent("transfer")}
        </TabsContent>
        <TabsContent value="maintenance">
          {loadSubtabContent("maintenance")}
        </TabsContent>
        <TabsContent value="property-tour">
          {loadSubtabContent("property-tour")}
        </TabsContent>

       
      </Tabs>
    </div>
  );
}
