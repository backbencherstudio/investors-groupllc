"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React, { useEffect, useState } from "react";
import GeneralSettings from "./tabs/GeneralSettings";
import ManageNotification from "./tabs/ManageNotification";
import ManageInformation from "./tabs/ManageInformation";
import PrivacyPolicy from "./tabs/PrivacyPolicy";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "";

export default function SettingPage() {
  // Define the tabs items
  const tabsItems = [
    {
      value: "general-settings",
      label: "General Settings",
      content: <GeneralSettings />,
    },

    {
      value: "manage-notification",
      label: "Manage Notification",
      content: <ManageNotification />,
    },
    {
      value: "manage-information",
      label: "Manage Information",
      content: <ManageInformation />,
    },
    {
      value: "privacy-policy",
      label: "Privacy Policy",
      content: <PrivacyPolicy />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsItems[0].value);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (
      savedTab === "general-settings" ||
      savedTab === "manage-notification" ||
      savedTab === "manage-information" ||
      savedTab === "privacy-policy"
    ) {
      setActiveTab(savedTab);
    }
  }, []);

  return (
    <div className="container">
      {/* Breadcrumb */}
      <h3 className="text-lg font-medium my-6"></h3>

      <Breadcrumb>
        <BreadcrumbList className="text-lg mb-2 font-semibold">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Setting</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {tabsItems.find((item) => item.value === activeTab)?.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tabs section */}
      <div>
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            localStorage.setItem("activeTab", value);
          }}
          className="w-full"
        >
          <div className="border-b-2 rounded-none h-13.5 overflow-x-auto py-2">
            <TabsList className="">
              {tabsItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="tab-item  px-4 text-lg font-medium text-gray-600 hover:text-orange-800/70 border-transparent h-13 cursor-pointer"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabsItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div>{item.content}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
