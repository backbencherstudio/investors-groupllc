"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionList from "./_components/subscription-list";
import SubscriptionPlan from "./_components/subscription-plan";

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("subscription-list");
  return (
    <div>
      <h3 className="text-lg font-medium my-6">Subscription List</h3>

      <div>
        <Tabs
          defaultValue="subscription-list"
          onValueChange={setActiveTab}
          className=""
        >
          <TabsList>
            <TabsTrigger
              className={`text-lg font-semibold px-5 h-10 ${
                activeTab === "subscription-list"
                  ? ""
                  : "text-zinc-400 border-transparent hover:text-orange-700"
              }`}
              value="subscription-list"
            >
              Subscription List
            </TabsTrigger>

            <TabsTrigger
              className={`text-lg font-semibold px-5 h-10 ${
                activeTab === "subscription-plan"
                  ? ""
                  : "text-zinc-400 border-transparent hover:text-orange-700"
              }`}
              value="subscription-plan"
            >
              Subscription Plan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="subscription-list">
            <SubscriptionList />
          </TabsContent>
          <TabsContent value="subscription-plan">
            <SubscriptionPlan />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
