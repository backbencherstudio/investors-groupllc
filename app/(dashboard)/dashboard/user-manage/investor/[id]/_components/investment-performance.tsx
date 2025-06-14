"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function InvestmentPerformance() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          className="border border-zinc-200 rounded-lg py-1 mt-2 
        font-medium text-sm hover:bg-orange-50 transition"
        >
          View Details
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full sm:w-[900px]">
        <div className="flex flex-col h-full bg-white p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-semibold">Investment Performance</div>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="w-6 h-6" />
              </button>
            </DrawerClose>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Property & Details */}
            <div>
              {/* Property Card */}
              <div className="bg-white rounded-xl border border-zinc-100 p-4 mb-6">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    alt="property"
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <span className="absolute top-3 left-3 bg-white/80 text-xs text-zinc-700 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="font-semibold text-lg text-neutral-900">
                      Elm Apartment
                    </div>
                    <div className="text-xs text-neutral-500">
                      Unit #305–1234 Oakwood Avenue, Apt 305 Brooklyn, NY 11211
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-2 my-3">
                  <span className="bg-orange-100 text-orange-500 px-2 py-0.5 rounded text-xs font-semibold flex items-center">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mr-1"
                    >
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="#F59E42"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Investor is First Lien Holder
                  </span>
                </div>
                <div className="flex gap-6 mb-2">
                  <div>
                    <div className="text-xs text-zinc-400">Profit Share</div>
                    <div className="font-semibold text-neutral-900">20%</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">
                      Estimated Duration
                    </div>
                    <div className="font-semibold text-neutral-900">
                      8 Months
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Lock-In Period</div>
                    <div className="font-semibold text-neutral-900">
                      Until sale
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="mb-6">
                <div className="font-semibold mb-2">Investment Details</div>
                <div className="bg-white rounded-xl border border-zinc-100 p-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Investment Amount</span>
                      <span className="font-medium text-neutral-900">
                        $75,000
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Start Date</span>
                      <span className="font-medium text-neutral-900">
                        Jan 01, 2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Project End</span>
                      <span className="font-medium text-neutral-900">
                        Aug 01, 2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Lock-In Ends</span>
                      <span className="font-medium text-neutral-900">
                        After sale
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Exit Condition</span>
                      <span className="font-medium text-neutral-900">
                        Profit paid after sale
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <div className="font-semibold mb-2">Documents</div>
                <div className="flex flex-col gap-2">
                  {[
                    "Agreement_Jan2025.pdf",
                    "Receipt_March2025.pdf",
                    "ROI_Report_Q1.pdf",
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white border border-zinc-100 rounded-lg px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-red-100 p-1.5 rounded-md">
                          <svg
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              width="16"
                              height="20"
                              x="4"
                              y="2"
                              rx="2"
                              fill="#F87171"
                            />
                            <path
                              d="M8 6h8M8 10h8M8 14h4"
                              stroke="#fff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <span className="text-sm text-neutral-700">{doc}</span>
                      </div>
                      <button className="text-zinc-400 hover:text-orange-500">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 4v12m0 0l-4-4m4 4l4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="4"
                            y="18"
                            width="16"
                            height="2"
                            rx="1"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Profit Distribution & Summary */}
            <div className="flex flex-col gap-6">
              {/* Profit Distribution */}
              <div>
                <div className="font-semibold mb-2">Profit Distribution</div>
                <div className="border border-orange-300 rounded-xl overflow-hidden">
                  <div className="flex bg-orange-50 text-xs font-semibold text-zinc-500">
                    <div className="flex-1 px-4 py-2 border-r border-orange-200">
                      Field
                    </div>
                    <div className="w-32 px-4 py-2">Value</div>
                  </div>
                  <div className="flex text-sm">
                    <div className="flex-1 px-4 py-2 border-r border-orange-100">
                      Principal Returned
                    </div>
                    <div className="w-32 px-4 py-2">$75,000</div>
                  </div>
                  <div className="flex text-sm">
                    <div className="flex-1 px-4 py-2 border-r border-orange-100">
                      Profit Paid(20%)
                    </div>
                    <div className="w-32 px-4 py-2">$15,000</div>
                  </div>
                  <div className="flex text-sm font-semibold text-orange-500 bg-orange-50">
                    <div className="flex-1 px-4 py-2 border-r border-orange-100">
                      Total Received
                    </div>
                    <div className="w-32 px-4 py-2">$90,000</div>
                  </div>
                </div>
              </div>
              {/* Investment Return Summary */}
              <div>
                <div className="font-semibold mb-2">
                  Investment Return Summary
                </div>
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <div className="flex bg-zinc-50 text-xs font-semibold text-zinc-500">
                    <div className="flex-1 px-4 py-2 border-r border-zinc-100">
                      Field
                    </div>
                    <div className="w-32 px-4 py-2">Value</div>
                  </div>
                  <div className="flex text-sm">
                    <div className="flex-1 px-4 py-2 border-r border-zinc-100">
                      Acquisition Cost
                    </div>
                    <div className="w-32 px-4 py-2">$50,000</div>
                  </div>
                  <div className="flex text-sm">
                    <div className="flex-1 px-4 py-2 border-r border-zinc-100">
                      Renovation Cost
                    </div>
                    <div className="w-32 px-4 py-2">$25,000</div>
                  </div>
                  <div className="flex text-sm">
                    <div className="flex-1 px-4 py-2 border-r border-zinc-100">
                      Total Project Cost
                    </div>
                    <div className="w-32 px-4 py-2">$75,000</div>
                  </div>
                  <div className="flex text-sm">
                    <div className="flex-1 px-4 py-2 border-r border-zinc-100">
                      Projected Sale Price
                    </div>
                    <div className="w-32 px-4 py-2">$150,000</div>
                  </div>
                  <div className="flex text-sm font-semibold">
                    <div className="flex-1 px-4 py-2 border-r border-zinc-100">
                      Profite
                    </div>
                    <div className="w-32 px-4 py-2">$75,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
