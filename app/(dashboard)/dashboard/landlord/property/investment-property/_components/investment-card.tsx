/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function InvestmentCard({ investment }: { investment: any }) {

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden flex flex-col">
      <div className="relative">
        <Image
          src={investment?.image || "/images/property-placeholder.png"}
          alt={investment?.title || "Property Image"}
          className="w-full h-44 object-cover"
          width={100}
          height={100}
        />
        {/* Top left badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-gray-700 border border-gray-200">
          • Invested
        </span>
        {/* Top right badge */}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
          Passive
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="font-semibold text-lg mb-1">{investment.title}</div>
        <div className="text-gray-500 text-sm mb-2">{investment.address}</div>
        <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-bed" /> {investment.beds} Beds
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-bath" /> {investment.baths} Baths
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-calendar" /> {investment.year} Year
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-building" /> {investment.floor} Floor
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
            <i className="fa fa-expand" /> {investment.area} sq ft
          </span>
        </div>
        {/* Investment info row */}
        <div className="flex items-stretch text-center border border-gray-200 rounded-lg overflow-hidden mb-2">
          <div className="flex-1 py-2 px-2 flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">$5,000</span>
            <span className="text-xs text-gray-500">Invest Start From</span>
          </div>
          <div className="border-l border-gray-200 flex-1 py-2 px-2 flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">6%</span>
            <span className="text-xs text-gray-500">Annual ROI</span>
          </div>
          <div className="border-l border-gray-200 flex-1 py-2 px-2 flex flex-col justify-center">
            <span className="text-[20px] font-bold text-black">1 Year</span>
            <span className="text-xs text-gray-500">Lock In</span>
          </div>
        </div>
        {/* Investor info */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <Image
            src={investment.owner?.avatar || "/images/property-placeholder.png"}
            alt={investment.owner?.name || "Property Owner"}
            className="w-7 h-7 rounded-full"
            width={100}
            height={100}
          />
          <span className="text-xs text-gray-500">Invested by</span>
          <span className="text-xs font-medium">{investment.owner?.name}</span>
        </div>
        <Link href={`/dashboard/landlord/property/investment-property/${investment.id}`}>
        <button className="mt-auto border border-gray-300 rounded-lg py-2 w-full font-medium hover:bg-gray-50 transition cursor-pointer">
          Details
        </button>
        </Link>
      </div>
    </div>
  );
}
