/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

const formatCurrency = (amount: string | number) => {
  const num = Number(amount);
  if (!num) return "-";
  return `$${num.toLocaleString()}`;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function InvestmentCard({ investment }: { investment: any }) {
  const {
    firstImage,
    apartmentName,
    amount,
    type,
    status,
    checkoutDate,
    id,
    apartmentId,
  } = investment || {};

  const displayImage = firstImage || "/images/property-placeholder.png";
  const displayTitle = apartmentName || "-";
  const displayAmount = formatCurrency(amount);
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : "-";
  const displayStatus = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "-";
  const displayDate = formatDate(checkoutDate);
  const linkId = id || apartmentId || "";

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden flex flex-col">
      <div className="relative">
        <Image
          src={displayImage}
          alt={displayTitle}
          className="w-full h-44 object-cover"
          width={100}
          height={100}
        />
        {/* Top left badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-gray-700 border border-gray-200">
          • {displayStatus}
        </span>
        {/* Top right badge */}
        {/* <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
            type === "active"
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {displayType}
        </span> */}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="font-semibold text-lg mb-1">{displayTitle}</div>
        <div className="text-gray-500 text-sm mb-2">{displayDate}</div>
        <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-bed" /> - Beds
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-bath" /> - Baths
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-calendar" /> - Year
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-building" /> - Floor
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-expand" /> - sq ft
          </span>
        </div>
        {/* Investment info row */}
        <div className="flex items-stretch text-center border border-gray-200 rounded-lg overflow-hidden mb-2">
          <div className="flex-1 py-2 px-2 flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">
              {displayAmount}
            </span>
            <span className="text-xs text-gray-500">Invest Start From</span>
          </div>
          <div className="border-l border-gray-200 flex-1 py-2 px-2 flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">-</span>
            <span className="text-xs text-gray-500">Annual ROI</span>
          </div>
          <div className="border-l border-gray-200 flex-1 py-2 px-2 flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">-</span>
            <span className="text-xs text-gray-500">Lock In</span>
          </div>
        </div>
        {/* Investor info */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <Image
            src={"/images/property-placeholder.png"}
            alt={"Investor"}
            className="w-7 h-7 rounded-full"
            width={100}
            height={100}
          />
          <span className="text-xs text-gray-500">Invested by</span>
          <span className="text-xs font-medium">-</span>
        </div>
        <Link
          href={`/dashboard/landlord/property/investment-property/${linkId}`}
        >
          <button className="mt-auto border border-gray-300 rounded-lg py-2 w-full font-medium hover:bg-gray-50 transition cursor-pointer">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
