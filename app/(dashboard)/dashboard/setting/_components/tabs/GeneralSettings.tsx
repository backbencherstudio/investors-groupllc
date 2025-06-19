"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define the structure for the subtabs
interface Subtab {
  label: string;
  value: string;
}

const subtabs: Subtab[] = [
  {
    label: "Account Setting",
    value: "account-setting",
  },
  {
    label: "Payment Setting",
    value: "payment-setting",
  },
];

export default function GeneralSettings() {
  const [activeSubtab, setActiveSubtab] = useState(subtabs[0].value); // Set initial active tab

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          General Settings:{" "}
          {subtabs.find((subTab) => subTab.value === activeSubtab)?.label}
        </h1>
      </div>

      <Tabs
        value={activeSubtab}
        onValueChange={(value) => setActiveSubtab(value)}
        className="w-full"
      >
        <TabsList className="flex gap-4 bg-transparent p-0 border-none mb-4">
          {subtabs.map((subtab) => (
            <TabsTrigger
              key={subtab.value}
              value={subtab.value}
              className="after:bg-transparent border rounded-md data-[state=active]:border-[#D80] data-[state=active]:bg-[#D80] data-[state=active]:text-white px-4 py-2 text-[#707070 font-normal"
            >
              {subtab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="account-setting">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Account Settings Content
            </h2>
            <p className="text-gray-500">
              Content related to account settings goes here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="payment-setting">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Payment Settings Content
            </h2>
            <p className="text-gray-500">
              Content related to payment settings goes here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
