"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2,
  Calendar,
  Car,
  Dumbbell,
  FileText,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSingleRentalPropertyQuery } from "@/redux/features/apartments/apartmentsApi";

export default function PropertyDetails() {
  const { id } = useParams();
  const { data: property, isLoading } = useGetSingleRentalPropertyQuery(
    id as string,
    { skip: !id }
  );

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-8 text-center text-gray-500">Property not found.</div>
    );
  }

  const primaryUnit = property.units?.[0];
  const info = property.information;
  const summary = property.property;
  const landlord = property.landlord;
  const activeImage = summary?.imageUrl || "/placeholder.jpg";

  const renderPrice = () => {
    if (info?.priceRange) return info.priceRange;
    if (!property.units || property.units.length === 0) return "N/A";
    const prices = property.units.map((u) => u.price).filter(Boolean);
    if (prices.length === 0) return "N/A";
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return minPrice === maxPrice
      ? `$${minPrice}`
      : `$${minPrice} - $${maxPrice}`;
  };

  return (
    <div className="bg-gray-50/50 min-h-screen p-6 md:p-8 text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Link
            href="/dashboard/admin/property/rental-property"
            className="hover:text-gray-900 transition-colors"
          >
            Property
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900 font-semibold">Property Details</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src={activeImage}
              alt={summary?.name || "Property"}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Property Facilities
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-600">
              {primaryUnit?.bedrooms && (
                <span className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                  <Home className="w-3.5 h-3.5 text-gray-400" />
                  {primaryUnit.bedrooms} Beds
                </span>
              )}
              {primaryUnit?.bathrooms && (
                <span className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  {primaryUnit.bathrooms} Baths
                </span>
              )}
              {primaryUnit?.unitNumber && (
                <span className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Unit {primaryUnit.unitNumber}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Amenities
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 font-medium">
              {info?.amenities?.map((amenity, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-gray-400">
                    {amenity.toLowerCase().includes("park") ? (
                      <Car className="w-4 h-4" />
                    ) : amenity.toLowerCase().includes("gym") ? (
                      <Dumbbell className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-amber-50/60 border border-amber-100/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-white">
                {landlord?.avatar ? (
                  <Image
                    src={landlord.avatar}
                    alt={landlord.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    N/A
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  {landlord?.role || "Landlord"}
                </p>
                <h4 className="font-semibold text-gray-900 text-base">
                  {landlord?.name || "Landlord Name"}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  {landlord?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-600" />
                      {landlord.phone}
                    </span>
                  )}
                  {landlord?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-amber-600" />
                      {landlord.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Property Name
            </label>
            <Input
              readOnly
              value={summary?.name || ""}
              className="bg-white border-gray-200 text-sm h-11"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Price</label>
            <div className="flex gap-3">
              <Input
                readOnly
                value={renderPrice()}
                className="bg-white border-gray-200 text-sm h-11 flex-1"
              />
              <Select defaultValue="USD">
                <SelectTrigger className="w-24 bg-white border-gray-200 h-11">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Location
            </label>
            <Input
              readOnly
              value={
                summary?.address ||
                `${info?.city || ""}, ${info?.state || ""} ${info?.zipCode || ""}`
              }
              className="bg-white border-gray-200 text-sm h-11"
            />
          </div>

          <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center gap-2 text-rose-500 bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 text-xs font-medium z-10">
              <MapPin className="w-4 h-4 fill-rose-500 text-white" />
              <span>
                {info?.city}, {info?.country}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Request Status
            </label>
            <Input
              readOnly
              value={info?.status || "N/A"}
              className="bg-white border-gray-200 text-sm h-11"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Property Status
            </label>
            <Select defaultValue={info?.listingType || "for_rent"}>
              <SelectTrigger className="bg-white border-gray-200 h-11 text-sm">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="for_rent">For Rent</SelectItem>
                <SelectItem value="for_sale">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Description
            </label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-600 min-h-[90px]">
              {info?.description || "No description available."}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              Automatic Lease Agreement Generation
            </label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-500">
              Once you request the transfer, the system will automatically
              generate a lease agreement for the new property.
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              No Credit Impact
            </label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-500">
              This transfer will not impact your credit score. It&apos;s just a
              lease transfer.
            </div>
          </div>

          {(property.actions?.accept?.enabled ||
            property.actions?.reject?.enabled) && (
            <div className="flex gap-3 pt-2">
              {property.actions.accept.enabled && (
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  {property.actions.accept.label}
                </Button>
              )}
              {property.actions.reject.enabled && (
                <Button variant="outline" className="border-red-200 text-red-600">
                  {property.actions.reject.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
