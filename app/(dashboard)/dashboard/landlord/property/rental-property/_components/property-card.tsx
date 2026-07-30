/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, MapPin, Clock, Layers, Ruler } from "lucide-react";

export function PropertyCard({ property }: { property: any }) {
  // ---------- Image ----------
  const imageUrl =
    property?.images?.[0]?.url || property?.image || "/placeholder.jpg";

  // ---------- Basic info ----------
  const title = property?.name || property?.title || "Untitled Property";
  const address = [
    property?.address,
    property?.city,
    property?.state,
    property?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  const isRented = Boolean(property?.isRented);
  const listingType = property?.listingType || "for_rent";
  const statusLabel = isRented
    ? "Rented"
    : listingType === "for_rent"
      ? "For Rent"
      : "For Sale";

  // ---------- Units (bedrooms/bathrooms/size/price live on each unit) ----------
  const units: any[] = Array.isArray(property?.units) ? property.units : [];
  const primaryUnit = units[0];

  const beds = property?.beds ?? property?.bedrooms ?? primaryUnit?.bedrooms;
  const baths =
    property?.baths ?? property?.bathrooms ?? primaryUnit?.bathrooms;
  const areaValue =
    property?.area ??
    property?.areaSqft ??
    property?.squareFeet ??
    primaryUnit?.sizeSqFt;
  const floorCount = property?.numberOffloors ?? property?.floor;

  // ---------- Price ----------
  const priceValue = property?.price ?? property?.rent ?? property?.monthlyRent;

  const unitPrices = units.map((u) => u.price).filter((p) => p != null);
  const unitPriceRange = (() => {
    if (unitPrices.length === 0) return null;
    const min = Math.min(...unitPrices);
    const max = Math.max(...unitPrices);
    return min === max
      ? `$${min.toLocaleString()}`
      : `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  })();

  const formattedPrice =
    typeof priceValue === "number"
      ? `$${priceValue.toLocaleString()}`
      : unitPriceRange || "N/A";

  // ---------- Age ----------
  const age = (() => {
    if (!property?.builtYear) return null;
    const built = new Date(property.builtYear);
    if (Number.isNaN(built.getTime())) return null;
    const years = Math.max(1, new Date().getFullYear() - built.getFullYear());
    return years;
  })();

  // ---------- Tenant (Rented by) ----------
  const tenantName = property?.tenantName;
  const tenantAvatar = property?.tenantAvatar;
  const initials = tenantName
    ? tenantName
        .split(" ")
        .map((p: string) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

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
        {isRented ? (
          <span className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/35 text-white backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Rented
          </span>
        ) : (
          <span className="absolute top-3 left-3 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#C2C2C2B2] text-white">
            {statusLabel}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-base font-semibold text-slate-900 truncate">
            {title}
          </h3>
          <div className="text-base font-bold text-emerald-600 whitespace-nowrap">
            {formattedPrice}
          </div>
        </div>

        {/* Address */}
        <div className="mb-3 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{address || "Address not available"}</span>
        </div>

        {/* Stats row 1 — Beds / Baths / Age */}
        <div className="grid grid-cols-3 gap-2 text-slate-600 text-xs mb-2">
          {beds != null && (
            <StatPill
              icon={<Bed className="h-3.5 w-3.5" />}
              value={beds}
              label="Beds"
            />
          )}
          {baths != null && (
            <StatPill
              icon={<Bath className="h-3.5 w-3.5" />}
              value={baths}
              label="Baths"
            />
          )}
          {age != null && (
            <StatPill
              icon={<Clock className="h-3.5 w-3.5" />}
              value={age}
              label="Year"
            />
          )}
          {floorCount != null && (
            <StatPill
              icon={<Layers className="h-3.5 w-3.5" />}
              value={floorCount}
              label="Floor"
            />
          )}
          {areaValue != null && (
            <StatPill
              icon={<Ruler className="h-3.5 w-3.5" />}
              value={Number(areaValue).toLocaleString()}
              label="sq ft"
            />
          )}
        </div>

        {/* Rented by */}
        {isRented && tenantName && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center shrink-0">
              {tenantAvatar ? (
                <Image
                  src={tenantAvatar}
                  alt={tenantName}
                  width={32}
                  height={32}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] font-semibold text-slate-600">
                  {initials}
                </span>
              )}
            </div>
            <div className="text-xs leading-tight">
              <div className="text-slate-400">Rented by</div>
              <div className="font-medium text-slate-700">{tenantName}</div>
            </div>
          </div>
        )}

        {/* Details Button */}
        <Link
          href={`/dashboard/landlord/property/rental-property/${property?.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-lg border border-slate-200 hover:border-[#DD8800] hover:text-[#DD8800] text-slate-700 px-4 py-2.5 text-sm font-medium transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2">
      <span>{icon}</span>
      <span>{value}</span>
      <span>{label}</span>
    </div>
  );
}
