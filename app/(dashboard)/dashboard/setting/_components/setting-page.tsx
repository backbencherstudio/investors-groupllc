"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import React, { useState } from "react";
import GeneralSettings from "./tabs/GeneralSettings";
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
      content: "Content for Manage Notification goes here.",
    },
    {
      value: "manage-information",
      label: "Manage Information",
      content: "Content for Manage Information goes here.",
    },
    {
      value: "privacy-policy",
      label: "Privacy Policy",
      content: "Content for Privacy Policy goes here.",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsItems[0].value);

  return (
    <div>
      {/* Breadcrumb */}
      <h3 className="text-lg font-medium my-6">
        {tabsItems.find((item) => item.value === activeTab)?.label}
      </h3>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Setting</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/components">Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tabs section */}
      <div>
        <Tabs
          defaultValue={tabsItems[0].value}
          onValueChange={setActiveTab}
          className="w-full "
        >
          <div className="border-b-2 rounded-none h-11">
            <TabsList className="">
              {tabsItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="tab-item  px-4 text-lg font-medium text-gray-600 hover:text-orange-600 border-transparent h-13"
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
