"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  Calendar,
  Car,
  Dumbbell,
  FileText,
  Home,
  Layers,
  Mail,
  MapPin,
  Maximize2,
  MessageSquare,
  MoreVertical,
  Phone,
  Play,
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
  const { data: propertyDetails, isLoading } = useGetSingleRentalPropertyQuery(
    id as string
  );

  const property = propertyDetails?.data;

  // Selected state for active gallery image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading property details...</div>;
  }

  if (!property) {
    return <div className="p-8 text-center text-gray-500">Property not found.</div>;
  }

  // Derive specs from property and first unit for summary card
  const primaryUnit = property.units?.[0];
  const activeImage = selectedImage || property.images?.[0]?.url || "/placeholder.jpg";

  // Helper for price display (Range if multiple units exist)
  const renderPrice = () => {
    if (!property.units || property.units.length === 0) return "N/A";
    const prices = property.units.map((u: any) => u.price).filter(Boolean);
    if (prices.length === 0) return "N/A";
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;
  };

  return (
    <div className="bg-gray-50/50 min-h-screen p-6 md:p-8 text-gray-800">
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <span>Property</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-semibold">Property Details</span>
        </div>
        <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Image Display */}
          <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src={activeImage}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          {property.images && property.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {property.images.map((img: any) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img.url
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-transparent hover:opacity-80"
                    }`}
                >
                  <Image src={img.url} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Virtual Video Tour */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Property Virtual Video</h3>
            {property.tourVideo ? (
              <a
                href={property.tourVideo}
                target="_blank"
                rel="noreferrer"
                className="relative block w-20 h-20 rounded-xl overflow-hidden bg-gray-900 group border border-gray-200"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
                    <Play className="w-4 h-4 text-emerald-600 fill-emerald-600 ml-0.5" />
                  </div>
                </div>
              </a>
            ) : (
              <p className="text-xs text-gray-400">No virtual tour available</p>
            )}
          </div>

          {/* Property Facilities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Property Facilities</h3>
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
              {primaryUnit?.leaseTerm && (
                <span className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {primaryUnit.leaseTerm}
                </span>
              )}
              {property.numberOffloors && (
                <span className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                  <Layers className="w-3.5 h-3.5 text-gray-400" />
                  {property.numberOffloors} Floor
                </span>
              )}
              {primaryUnit?.sizeSqFt && (
                <span className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                  <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                  {primaryUnit.sizeSqFt} sq ft
                </span>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Amenities</h3>
            <ul className="space-y-2 text-xs text-gray-600 font-medium">
              {property.amenities?.map((amenity: string, idx: number) => (
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

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-5">
          {/* Landlord / Rented Card */}
          <div className="bg-amber-50/60 border border-amber-100/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-white">
                <Image
                  src={
                    property?.landlord?.avatar
                      ? `https://gueloprboy.anikstudio.com/public/storage/avatar/${property.landlord.avatar}`
                      : "/avatar-placeholder.png"
                  }
                  alt={property?.landlord?.name || "Landlord"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Rented by</p>
                <h4 className="font-semibold text-gray-900 text-base">
                  {property.landlord?.name || "Landlord Name"}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-600" /> +1555-123-7890
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-600" /> landlord@email.com
                  </span>
                </div>
              </div>
            </div>
            <Button size="icon" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>

          {/* Property Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Property Name</label>
            <Input
              readOnly
              value={property.name}
              className="bg-white border-gray-200 text-sm h-11"
            />
          </div>

          {/* Price */}
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

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Location</label>
            <Input
              readOnly
              value={`${property.address}, ${property.city}, ${property.state}`}
              className="bg-white border-gray-200 text-sm h-11"
            />
          </div>

          {/* Map Preview Placeholder */}
          <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center gap-2 text-rose-500 bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 text-xs font-medium z-10">
              <MapPin className="w-4 h-4 fill-rose-500 text-white" />
              <span>{property.city}, {property.country}</span>
            </div>
          </div>

          {/* Property Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Property Status</label>
            <Select defaultValue={property.listingType}>
              <SelectTrigger className="bg-white border-gray-200 h-11 text-sm">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="for_rent">For Rent</SelectItem>
                <SelectItem value="for_sale">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Description</label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-600 min-h-[90px]">
              {property.description}
            </div>
          </div>

          {/* Automatic Lease Agreement Generation */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              Automatic Lease Agreement Generation
            </label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-500">
              Once you request the transfer, the system will automatically generate a lease agreement for the new property.
            </div>
          </div>

          {/* No Credit Impact */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              No Credit Impact
            </label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-500">
              This transfer will not impact your credit score. It&apos;s just a lease transfer.
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Cancellation policy</label>
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed text-gray-500">
              If a tenant plans to leave, they must notify the landlord at least 1 month in advance. Likewise, the landlord is also required to notify the tenant 1 month prior to any termination or non-renewal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}