"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import React, { useState, useEffect } from "react";
import Tenant from "./tenant/tenant";
import Investor from "./investor/investor";
import CustomBreadSeparator from "../../_components/common/CustomBreadSeparator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vendor from "./vendor/vendor";
import Landlord from "./landlord/landlord";

export default function Page() {
  type TabKey = "tenant" | "vendor" | "investor" | "landlord";

  // Initialize the active tab with "tenant" as default
  const [activeTab, setActiveTab] = useState<TabKey>("tenant");

  // Update active tab when component is mounted or if query parameters change
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (
      savedTab === "tenant" ||
      savedTab === "vendor" ||
      savedTab === "investor" ||
      savedTab === "landlord"
    ) {
      setActiveTab(savedTab as TabKey);
    }
  }, []);

  // Breadcrumb title mapping
  const tabItemsTitle: Record<TabKey, string> = {
    tenant: "Tenant",
    vendor: "Vendor",
    investor: "Investor",
    landlord: "Landlord",
  };

  return (
    <div>
      {/* bread crumb */}
      <Breadcrumb>
        <BreadcrumbList className="text-lg mb-2 font-semibold">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-lg font-medium"
              href="/dashboard/financial"
            >
              User Management
            </BreadcrumbLink>
          </BreadcrumbItem>

          <CustomBreadSeparator />

          <BreadcrumbItem>
            <span className="capitalize font-semibold text-[#170A00]">
              {tabItemsTitle[activeTab]}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tabs section */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as TabKey);
          localStorage.setItem("activeTab", value);
        }}
        className="my-6"
      >
        <div className="relative mb-6">
          <TabsList className="gap-8">
            {Object.entries(tabItemsTitle).map(([key, value]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="tab-item  px-8 text-lg font-semibold text-gray-600 hover:text-orange-800/70 border-transparent h-10 cursor-pointer"
              >
                {value}
              </TabsTrigger>
            ))}
          
          </TabsList>
          <hr className=" absolute -bottom-1 w-full" />
        </div>

        <TabsContent value="tenant">
          <div>
            <Tenant />
          </div>
        </TabsContent>
        <TabsContent value="vendor">
          <div>
            <Vendor />
          </div>
        </TabsContent>
        <TabsContent value="investor">
          <div>
            <Investor />
          </div>
        </TabsContent>
        <TabsContent value="landlord">
          <div>
            <Landlord />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
