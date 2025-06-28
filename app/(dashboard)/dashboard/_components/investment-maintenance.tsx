import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function InvestmentMaintenance() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3       ">
        <InvestmentCard />
      </div>
      <div className="w-full lg:w-1/3 ">
        <MaintenanceCard />
      </div>
      <div className="w-full lg:w-1/3 ">
        <TotalCollectionCard />
      </div>
    </div>
  );
}

const investmentItems = [
  { label: "Investor", value: 100 },
  { label: "Passive Investor", value: 50 },
  { label: "Active Investor", value: 50 },
  { label: "Total Investment", value: 341000 },
];
const items = [
  { label: "Pending", value: 42 },
  { label: "In Progress", value: 21 },
  { label: "Completed", value: 89 },
  { label: "Urgent Request", value: 10 },
  { label: "Emergency Request", value: 5, danger: true },
];

function InvestmentCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[260px] ">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Maintenance</h2>
        <button className="text-orange-500 font-medium text-sm">
          View all
        </button>
      </div>
      <ul>
        {investmentItems.map((item) => (
          <li
            key={item.label}
            className="flex justify-between items-center mb-2"
          >
            <span className="text-[#404040] font-medium">{item.label}</span>
            {/* <span
              className={
                item?.danger
                  ? "text-red-500 font-bold"
                  : "text-gray-900 font-semibold"
              }
            >
              {item.value}
            </span> */}

            <span className=" font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function MaintenanceCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[260px] w-full ">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-900">Maintenance</h2>
        <button className="text-orange-500 font-medium text-sm">
          View all
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li
            key={item.label}
            className="flex justify-between items-center mb-2"
          >
            <span className="text-[#404040] font-medium">{item.label}</span>
            <span
              className={
                item.danger
                  ? "text-red-500 font-bold"
                  : "text-gray-900 font-semibold"
              }
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TotalCollectionCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[260px] w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 font-medium">Total Collection</span>
        <span className="bg-green-100 text-green-700 font-medium text-xs px-3 py-1 rounded-md">
          25.56%
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-4">$123,569.34</div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 border rounded-xl p-3">
          <span className="bg-green-100 text-green-600 rounded-md p-2">
            <ArrowUp size={18} />
          </span>
          <div>
            <div className="text-lg font-semibold text-gray-900">$100,678</div>
            <div className="text-green-600 text-sm">Income</div>
          </div>
        </div>
        <div className="flex items-center gap-3 border rounded-xl p-3">
          <span className="bg-red-100 text-red-600 rounded-md p-2">
            <ArrowDown size={18} />
          </span>
          <div>
            <div className="text-lg font-semibold text-gray-900">$23,678</div>
            <div className="text-red-600 text-sm">Expanse</div>
          </div>
        </div>
      </div>
    </div>
  );
}
