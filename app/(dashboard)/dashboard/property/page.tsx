"use client";

import React, { useState, useEffect } from "react";
import RentalProperty from "./_components/rental-property";

const tabs = [
  { label: "Rental Property", value: "Rental Property" },
  { label: "Investment Property", value: "Investment Property" },
];

export default function Property() {
  // Initialize the active tab with "tenant" as default
  const [activeTab, setActiveTab] = useState("Rental Property");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Handle tab change
  const handleTabChange = (tabValue : string) => {
    setActiveTab(tabValue);
    localStorage.setItem("activeTab", tabValue); 
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
        {activeTab === "Rental Property" && <RentalProperty />}
      </div>
    </div>
  );
}
