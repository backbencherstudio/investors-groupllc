/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { MouseEvent } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useToggleFeaturedApartmentMutation } from "@/redux/features/apartments/apartmentsApi";

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
    : property?.status || "Available";
  const priceValue = property?.price ?? property?.rent ?? property?.monthlyRent;
  const formattedPrice =
    typeof priceValue === "number"
      ? `$${priceValue.toLocaleString()}`
      : "Price on request";
  const yearBuilt = property?.builtYear
    ? new Date(property.builtYear).getFullYear()
    : property?.year;
  const floorCount = property?.numberOffloors ?? property?.floor;
  const areaValue = property?.area ?? property?.areaSqft;
  const amenities = Array.isArray(property?.amenities)
    ? property.amenities
    : [];
  const utilities = Array.isArray(property?.utilitiesIncluded)
    ? property.utilitiesIncluded
    : [];
  const description =
    property?.description ||
    property?.shortDescription ||
    "No description available.";

  const isFeatured = Boolean(property?.isFeatured);
  const [toggleFeatured, { isLoading: isTogglingFeatured }] =
    useToggleFeaturedApartmentMutation();

  const handleToggleFeatured = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!property?.id || isTogglingFeatured) return;

    try {
      await toggleFeatured(property.id).unwrap();
      toast.success(
        isFeatured ? "Removed from featured properties" : "Marked as featured",
      );
    } catch {
      toast.error("Failed to update featured status");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden flex flex-col">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-44 object-cover"
          width={100}
          height={100}
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
            statusText === "Rented"
              ? "bg-blue-100 text-blue-600"
              : statusText === "For Rent"
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-700"
          }`}
        >
          {statusText}
        </span>


        <button
          type="button"
          onClick={handleToggleFeatured}
          disabled={isTogglingFeatured}
          aria-label={isFeatured ? "Remove featured" : "Mark as featured"}
          className={`absolute top-3 right-3 rounded-full p-1.5 text-xs font-semibold transition-colors ${
            isFeatured
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-200 text-gray-700"
          } ${isTogglingFeatured ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:opacity-80"}`}
        >
          <Star className="w-4 h-4" fill={isFeatured ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-green-600 font-bold text-lg">
            {formattedPrice}
          </div>
        </div>
        <div className="text-gray-500 text-sm mb-2">
          {address || "Address not available"}
        </div>
        <div className="flex gap-3 text-gray-600 text-xs mb-2">
          {property?.beds && (
            <span>
              <i className="fa fa-bed mr-1" />
              {property.beds} Beds
            </span>
          )}
          {property?.baths && (
            <span>
              <i className="fa fa-bath mr-1" />
              {property.baths} Baths
            </span>
          )}
          {yearBuilt && (
            <span>
              <i className="fa fa-calendar mr-1" />
              {yearBuilt} Year
            </span>
          )}
        </div>
        <div className="flex gap-3 text-gray-600 text-xs mb-2">
          {floorCount && (
            <span>
              <i className="fa fa-building mr-1" />
              {floorCount} Floor
            </span>
          )}
          {areaValue && (
            <span>
              <i className="fa fa-expand mr-1" />
              {areaValue} sq ft
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mb-3">{description}</div>
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {amenities.map((item: string) => (
              <span
                key={item}
                className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        {utilities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {utilities.map((item: string) => (
              <span
                key={item}
                className="px-2 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        {property?.owner && (
          <div className="flex items-center gap-2 mt-2">
            <Image
              src={property.owner.avatar}
              alt={property.owner.name}
              className="w-7 h-7 rounded-full"
              width={100}
              height={100}
            />
            <span className="text-xs text-gray-500">{property.ownerLabel}</span>
            <span className="text-xs font-medium">{property.owner.name}</span>
          </div>
        )}
        <Link
          href={`/dashboard/admin/property/rental-property/${property.id}`}
          className="mt-4 border border-gray-300 rounded-lg py-2 w-full font-medium hover:bg-gray-50 transition text-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
