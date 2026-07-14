import { useGetLandlordStatsQuery } from "@/redux/features/landlord/dashboard/dashboard";

export default function Maintenance() {
  const { data } = useGetLandlordStatsQuery({});

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm w-full">
      <div className="rounded-xl p-6 w-full mb-6">
        <h2 className="text-lg font-semibold text-[#1c1c1c] mb-4">
          Maintenance
        </h2>
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-[15px] text-[#222]">
            <span>Property Count</span>
            <span>{data?.propertyCount ?? 0}</span>
          </div>
          <div className="flex justify-between text-[15px] text-[#222]">
            <span>Tenant Count</span>
            <span>{data?.tenantCount ?? 0}</span>
          </div>
          <div className="flex justify-between text-[15px] text-[#222]">
            <span>Total Rent Received</span>
            <span>${data?.totalRentReceived ?? 0}</span>
          </div>
          <div className="flex justify-between text-[15px] text-[#222]">
            <span>Balance</span>
            <span>${data?.balance ?? 0}</span>
          </div>
        </div>
        <button className="bg-[#D18A00] hover:bg-[#b87700] text-white rounded-md px-6 py-2 font-medium text-[15px] w-fit">
          View All
        </button>
      </div>
    </div>
  );
}
