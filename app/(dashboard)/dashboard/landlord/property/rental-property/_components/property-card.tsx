/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, MapPin, Calendar, Building, Layers } from "lucide-react";

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

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover"
          width={100}
          height={100}
          unoptimized
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
            statusText === "Rented"
              ? "bg-blue-100 text-blue-700"
              : statusText === "For Rent"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {statusText}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{address || "Address not available"}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-emerald-600">
              {formattedPrice}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-slate-600 text-xs mb-3">
          {beds != null && (
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <Bed className="h-4 w-4 text-slate-400" />
              <span>{beds} Beds</span>
            </div>
          )}
          {baths != null && (
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <Bath className="h-4 w-4 text-slate-400" />
              <span>{baths} Baths</span>
            </div>
          )}
          {yearBuilt && (
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{yearBuilt}</span>
            </div>
          )}
          {floorCount != null && (
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <Building className="h-4 w-4 text-slate-400" />
              <span>{floorCount} Floors</span>
            </div>
          )}
          {areaValue != null && (
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 col-span-2">
              <Layers className="h-4 w-4 text-slate-400" />
              <span>{areaValue} sq ft</span>
            </div>
          )}
        </div>

        <div className="text-sm text-slate-500 mb-4 line-clamp-2">
          {property?.description ||
            "Beautiful property with premium amenities."}
        </div>

        {amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {amenities.slice(0, 4).map((item: string) => (
              <span
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/dashboard/landlord/property/rental-property/${property?.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
