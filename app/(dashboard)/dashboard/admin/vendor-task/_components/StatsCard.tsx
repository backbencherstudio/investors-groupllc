// _components/stats-cards.tsx
import React from "react";

interface Stats {
  total: number;
  inProgress: number;
  inReview: number;
  completed: number;
}

interface StatsCardsProps {
  stats?: Stats;
}

export function TaskStatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    { 
      label: "Total Tasks", 
      value: stats?.total || 0, 
      bgColor: "bg-blue-50", 
      textColor: "text-blue-600",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      label: "In Progress", 
      value: stats?.inProgress || 0, 
      bgColor: "bg-orange-50", 
      textColor: "text-orange-600",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      label: "In Review", 
      value: stats?.inReview || 0, 
      bgColor: "bg-purple-50", 
      textColor: "text-purple-600",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Completed", 
      value: stats?.completed || 0, 
      bgColor: "bg-green-50", 
      textColor: "text-green-600",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
            <div className={`${item.bgColor} ${item.textColor} p-3 rounded-full`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}