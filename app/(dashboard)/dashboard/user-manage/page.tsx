"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Tenant from "./tenant/tenant";


const tabs = [
  { label: "Tenant", value: "tenant" },
  { label: "Vendor", value: "vendor" },
  { label: "Investor", value: "investor" },
  { label: "Landlord", value: "landlord" },
];

export default function Page() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "tenant";

  return (
    <div>
      <p className="pb-6">
        {"User Management"}{" "}
        <span className="text-[18px] font-semibold">{"> Tenant"}</span>
      </p>
      <div className="w-full bg-transparent">
        <nav className="flex border-b border-gray-200 bg-transparent">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={`?tab=${tab.value}`}
              className={`relative px-6 py-3 text-[17px] font-semibold transition-colors duration-200
                ${activeTab === tab.value ? "text-black" : "text-gray-500"}
              `}
            >
              {tab.label}
              <span
                className={`absolute left-0 -bottom-[1px] h-0.5 w-full bg-orange-500 transition-transform duration-200 origin-left
                  ${activeTab === tab.value ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-5">
        {/* Render content based on activeTab here */}
        {activeTab === "tenant" && <Tenant />}
        {activeTab === "vendor" && <div>Vendor Content</div>}
        {activeTab === "investor" && <div>Investor Content</div>}
        {activeTab === "landlord" && <div>Landlord Content</div>}
      </div>
    </div>
  );
}
