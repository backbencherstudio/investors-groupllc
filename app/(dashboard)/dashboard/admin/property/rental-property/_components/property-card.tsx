/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";

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
          href={`/dashboard/admin-dashboard/property/rental-property/${property.id}`}
          className="mt-4 border border-gray-300 rounded-lg py-2 w-full font-medium hover:bg-gray-50 transition text-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
