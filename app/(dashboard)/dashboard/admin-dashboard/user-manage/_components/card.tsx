import React from "react";

// Define the type for each card item
interface CardItem {
  icon: React.ElementType;
  value: number | string;
  label: string;
}

export default function Card({ cardData }: { cardData: CardItem[] }) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      {cardData.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center bg-white rounded-xl shadow p-4 min-w-[240px] "
        >
          {/* Icon box */}
          <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-orange-50 mr-4">
            {item.icon && <item.icon className="text-orange-500 w-8 h-8" />}
          </div>
          {/* Number and label */}
          <div>
            <div className="text-3xl font-bold text-neutral-900 leading-tight">
              {item.value}
            </div>
            <div className="text-gray-500 text-lg font-medium mt-1">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
