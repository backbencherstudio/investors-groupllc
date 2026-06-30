import React from 'react';

interface RoleStatusBadgeProps {
  memberCount: number;
}

export const RoleStatusBadge: React.FC<RoleStatusBadgeProps> = ({ memberCount }) => {
  if (memberCount === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        No Members
      </span>
    );
  }
  if (memberCount < 5) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Low Usage
      </span>
    );
  }
  if (memberCount < 20) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Popular
    </span>
  );
};