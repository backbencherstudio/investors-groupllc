import Image from "next/image";
import { MoreVertical, User } from "lucide-react";
import { DashboardOverviewData } from "@/redux/features/dashboard/dashboardTypes";

const Sidebar = ({ sidebarData }: { sidebarData: DashboardOverviewData }) => {
  // Destructure with default fallbacks to prevent runtime crashes
  const {
    rentCollectedThisMonth = 0,
    rentCollectionProgress = { paidTenants: 0, totalTenantsWithDueRent: 0 },
    team = [],
  } = sidebarData || {};

  const { paidTenants, totalTenantsWithDueRent } = rentCollectionProgress;

  // Calculate percentage safely (avoids Division by Zero)
  const progressPercentage =
    totalTenantsWithDueRent > 0
      ? Math.min((paidTenants / totalTenantsWithDueRent) * 100, 100)
      : 0;

  // Format currency consistently
  const formattedRent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(rentCollectedThisMonth);

  return (
    <div className="bg-white rounded-2xl px-6 py-5 shadow-sm w-full">
      {/* Rent Collected Section */}
      <div className="border border-gray-200 rounded-xl px-6 py-4 mb-6">
        <p className="text-sm text-[#404040] mb-2">This Month</p>
        <h2 className="text-2xl font-bold text-[#170A00]">{formattedRent}</h2>
        <p className="text-gray-600 font-medium">Rent Collected</p>

        {/* Progress Bar */}
        <div className="my-2">
          <div className="h-1 rounded-full bg-[#EDEDED] w-full overflow-hidden">
            <div
              className="h-1 rounded-full bg-[#DD8800] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-[#707070] mt-2">
            {paidTenants.toLocaleString()}/{totalTenantsWithDueRent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Team Section */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Team</h3>

      <ul className="space-y-4">
        {team.map((member) => (
          <li key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                />
              ) : (
                /* Fallback UI when member avatar is null */
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <User className="w-5 h-5" />
                </div>
              )}

              <div className="max-w-[160px]">
                <p className="font-medium text-sm text-gray-900 truncate">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{member.role}</p>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer flex-shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;