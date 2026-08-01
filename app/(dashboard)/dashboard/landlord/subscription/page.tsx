"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChoosePlan from "./_components/tabs/choose-plan";
import ManageSubscription from "./_components/tabs/manage-subscription";

type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};

const tabItems: TabItem[] = [
  {
    value: "choose-plan",
    label: "Choose Plan",
    content: <ChoosePlan />,
  },
  {
    value: "manage-subscription",
    label: "Manage Subscription",
    content: <ManageSubscription />,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="container">
      <h3 className="text-lg font-medium my-6">Subscription </h3>

      <div>
        <Tabs defaultValue="choose-plan">
          {/* tabs button */}
          <div className="border-b-2 h-[42px] mb-4 overflow-x-auto">
            <TabsList className="gap-4 sm:gap-10 min-w-max">
              {tabItems.map((item) => (
                <TabsTrigger
                  className="h-[43px] px-4 sm:px-6 whitespace-nowrap"
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {/* tab content */}

          {tabItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
