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
  const breadcrumbTitle: Record<TabKey, string> = {
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
              {breadcrumbTitle[activeTab]}
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
          <TabsList className="gap-16">
            <TabsTrigger
              value="tenant"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
            >
              Tenant
            </TabsTrigger>
            <TabsTrigger
              value="vendor"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none "
            >
              Vendor
            </TabsTrigger>
            <TabsTrigger
              value="investor"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
            >
              Investor
            </TabsTrigger>
            <TabsTrigger
              value="landlord"
              className="data-[state=active]:text-[#170A00] text-[#707070] text-lg data-[state=active]:font-semibold pb-4 rounded-none"
            >
              Landlord
            </TabsTrigger>
          </TabsList>
          <hr className=" absolute bottom-0.5 w-full" />
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
