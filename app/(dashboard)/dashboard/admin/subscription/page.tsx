"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionList from "./_components/subscription-list";
import SubscriptionPlan from "./_components/subscription-plan";

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("subscription-list");

  return (
    <div>
      <h3 className="text-lg font-medium my-6">Subscription </h3>

      <div>
        <Tabs
          defaultValue="subscription-list"
          onValueChange={setActiveTab}
          className=""
        >
          <div className="border-b-2 w-full h-10">
            <TabsList className="gap-10">
              {/* <TabsTrigger
              className={`text-lg font-semibold px-5 h-10 ${
                activeTab === "subscription-list"
                  ? ""
                  : "text-zinc-400 border-transparent hover:text-[#D70]"
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
            </TabsTrigger> */}

              {["subscription-list", "subscription-plan"].map((item, idx) => (
                <TabsTrigger
                  key={idx}
                  value={item}
                  className="h-10 capitalize px-4"
                >
                  {item.split("-").join(" ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
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
