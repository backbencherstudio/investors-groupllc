"use client";

import React, { useState, useEffect } from "react";
import Tenant from "./tenant/tenant";
import Vendor from "./vendor/vendor";
import Investor from "./investor/investor";
import Landlord from "./landlord/landlord";

const tabs = [
  { label: "Tenant", value: "tenant" },
  { label: "Vendor", value: "vendor" },
  { label: "Investor", value: "investor" },
  { label: "Landlord", value: "landlord" },
];

export default function Page() {
  // Initialize the active tab with "tenant" as default
  const [activeTab, setActiveTab] = useState("tenant");

  // Update active tab when component is mounted or if query parameters change
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Handle tab change
  const handleTabChange = (tabValue : string) => {
    setActiveTab(tabValue);
    localStorage.setItem("activeTab", tabValue); // Save active tab in localStorage to persist state
  };

  return (
    <div>
      <p className="pb-6">
        {"User Management"}{" "}
        <span className="text-[18px] font-semibold">
          {" "}
          <span className="font-normal mx-2">{">"}</span>
          {activeTab}{" "}
        </span>
      </p>

      {/* Tab Navigation */}
      <div className="w-full bg-transparent overflow-x-auto">
        <nav className="flex border-b border-gray-200 bg-transparent">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`relative px-6 py-3 text-[17px] font-semibold transition-colors duration-200
                ${activeTab === tab.value ? "text-black" : "text-gray-500"}`}
            >
              {tab.label}
              <span
                className={`absolute left-0 -bottom-[1px] h-0.5 w-full bg-orange-500 transition-transform duration-200 origin-left
                  ${activeTab === tab.value ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Render the component based on the active tab */}
      <div className="mt-5">
        {activeTab === "tenant" && <Tenant />}
        {activeTab === "vendor" && <Vendor />}
        {activeTab === "investor" && <Investor />}
        {activeTab === "landlord" && <Landlord />}
      </div>
    </div>
  );
}
