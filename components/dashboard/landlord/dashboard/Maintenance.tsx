import { useGetLandlordStatsQuery } from "@/redux/features/landlord/dashboard/dashboard";

export default function Maintenance() {
  const { data } = useGetLandlordStatsQuery({});

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm w-full">
      <div className="rounded-xl p-4 sm:p-6 w-full mb-6">
        <h2 className="text-lg font-semibold text-[#1c1c1c] mb-4">
          Maintenance
        </h2>
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm sm:text-[15px] text-[#222] gap-2">
            <span>Property Count</span>
            <span className="font-medium">{data?.propertyCount ?? 0}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-[15px] text-[#222] gap-2">
            <span>Tenant Count</span>
            <span className="font-medium">{data?.tenantCount ?? 0}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-[15px] text-[#222] gap-2">
            <span>Total Rent Received</span>
            <span className="font-medium">${data?.totalRentReceived ?? 0}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-[15px] text-[#222] gap-2">
            <span>Balance</span>
            <span className="font-medium">${data?.balance ?? 0}</span>
          </div>
        </div>
        <button className="bg-[#D18A00] hover:bg-[#b87700] text-white rounded-md px-6 py-2 font-medium text-[15px] w-fit">
          View All
        </button>
      </div>
    </div>
  );
}
