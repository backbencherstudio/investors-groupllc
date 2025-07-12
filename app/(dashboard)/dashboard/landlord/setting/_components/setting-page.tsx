"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileEditForm from "./others/account-setting";
import PaymentSetting from "./others/payment-setting";

// Define the structure for the subtabs
interface Subtab {
  label: string;
  value: string;
  content: React.ReactNode;
}

const subtabs: Subtab[] = [
  {
    label: "Account Setting",
    value: "account-setting",
    content: <ProfileEditForm />,
  },
  {
    label: "Payment Setting",
    value: "payment-setting",
    content: <PaymentSetting />,
  },
];

export default function SettingPage() {
  const [activeSubtab, setActiveSubtab] = useState(subtabs[0].value);

  return (
    <>
      {/* breadcrumb */}
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
              {subtabs.find((item) => item?.value === activeSubtab)?.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* setting tabs */}
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
                className="after:bg-transparent border rounded-md data-[state=active]:border-[#D80] data-[state=active]:bg-[#D80] data-[state=active]:text-white px-4 py-2 text-[#707070 font- cursor-pointer"
              >
                {subtab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}

          {subtabs?.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div>{item.content}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
