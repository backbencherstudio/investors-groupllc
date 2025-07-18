"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileEditForm from "../others/account-setting";
import PaymentSetting from "../others/payment-setting";


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
    <div className="my-4">
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
            <ProfileEditForm />
          </div>
        </TabsContent>

        <TabsContent value="payment-setting">
          <div>
            <PaymentSetting />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
