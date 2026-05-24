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
                activeTab === "subscriptio// DeleteConfirmToast.tsx
interface DeleteConfirmToastProps {
  toastId: string | number;
  planName: string;
  onConfirm: () => void;
}

export const DeleteConfirmToast = ({ toastId, planName, onConfirm }: DeleteConfirmToastProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm mx-4">
    <h3 className="font-semibold mb-2">Confirm Deletion</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
      Are you sure you want to delete "{planName}"? This action cannot be undone.
    </p>
    <div className="flex gap-2 justify-end">
      <button
        onClick={() => toast.dismiss(toastId)}
        className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onConfirm();
          toast.dismiss(toastId);
          toast.success("Subscription deleted successfully");
        }}
        className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);n-plan"
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
