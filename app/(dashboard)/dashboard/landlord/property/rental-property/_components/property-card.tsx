/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, MapPin, Calendar, Building, Layers } from "lucide-react";
import { useState } from "react";

export function PropertyCard({ property }: { property: any }) {
  const imageUrl =
    property?.images?.[0]?.url || property?.image || "/placeholder.jpg";
  const title = property?.name || property?.title || "Untitled Property";
  const address = [
    property?.address,
    property?.city,
    property?.state,
    property?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");
  const statusText = property?.isRented
    ? "Rented"
    : property?.listingType === "for_rent"
      ? "For Rent"
      : property?.status || "Available";
  const priceValue = property?.price ?? property?.rent ?? property?.monthlyRent;
  const formattedPrice =
    typeof priceValue === "number"
      ? `$${priceValue.toLocaleString()}`
      : property?.price === null
        ? "N/A"
        : property?.price
          ? `$${property.price}`
          : "N/A";
  const yearBuilt = property?.builtYear
    ? new Date(property.builtYear).getFullYear()
    : property?.year;
  const beds = property?.beds ?? property?.bedrooms;
  const baths = property?.baths ?? property?.bathrooms;
  const floorCount = property?.numberOffloors ?? property?.floor;
  const areaValue =
    property?.area ?? property?.areaSqft ?? property?.squareFeet;
  const amenities = Array.isArray(property?.amenities)
    ? property.amenities
    : [];
  const listingType = property?.listingType || "for_rent";
  const petFriendly = property?.petFriendly;
  const utilities = Array.isArray(property?.utilitiesIncluded)
    ? property.utilitiesIncluded
    : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col group">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={300}
          unoptimized
        />

        {/* Status Badge */}
        {/* <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
            statusText === "Rented"
              ? "bg-blue-100 text-blue-700"
              : statusText === "For Rent"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {statusText}
        </span> */}

        {/* Listing Type Badge */}
        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#C2C2C2B2] text-white">
          {listingType === "for_rent" ? "For Rent" : "For Sale"}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {address || "Address not available"}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-bold text-emerald-600 whitespace-nowrap">
              {formattedPrice}
            </div>
            {listingType === "for_rent" && (
              <div className="text-[10px] text-slate-400">/month</div>
            )}
          </div>
        </div>

        {/* Property Stats Grid - Beds, Baths, Year, Floors, Area */}
        <div className="grid grid-cols-2 gap-2 text-slate-600 text-xs mb-3">
          {beds != null && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Bed className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-medium">{beds}</span>
              <span className="text-slate-500">Beds</span>
            </div>
          )}
          {baths != null && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Bath className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-medium">{baths}</span>
              <span className="text-slate-500">Baths</span>
            </div>
          )}
          {yearBuilt && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-slate-500">Built</span>
              <span className="font-medium">{yearBuilt}</span>
            </div>
          )}
          {floorCount != null && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Building className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-medium">{floorCount}</span>
              <span className="text-slate-500">
                Floor{floorCount > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {areaValue != null && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 col-span-2">
              <Layers className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-medium">{areaValue.toLocaleString()}</span>
              <span className="text-slate-500">sq ft</span>
            </div>
          )}
        </div>

        {/* Description */}
        {/* {property?.description && (
          <div className="text-sm text-slate-500 mb-3 line-clamp-2">
            {property.description}
          </div>
        )} */}

        {/* Utilities */}
        {/* {utilities.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {utilities.slice(0, 3).map((item: string) => (
              <span
                key={item}
                className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200"
              >
                {item}
              </span>
            ))}
            {utilities.length > 3 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{utilities.length - 3}
              </span>
            )}
          </div>
        )} */}

        {/* Pet Friendly Badge */}
        {/* {petFriendly && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-medium text-green-700 border border-green-200">
              🐾 Pet Friendly
            </span>
          </div>
        )} */}

        {/* Amenities */}
        {/* {amenities.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {amenities.slice(0, 4).map((item: string) => (
              <span
                key={item}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {item}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{amenities.length - 4}
              </span>
            )}
          </div>
        )} */}

        {/* Details Button */}
        <Link
          href={`/dashboard/landlord/property/rental-property/${property?.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#DD8800] hover:bg-[#b97d05] text-white px-4 py-2.5 text-sm font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
