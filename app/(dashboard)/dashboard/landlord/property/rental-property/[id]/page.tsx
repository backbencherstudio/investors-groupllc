"use client";

import PropertyImage from "@/app/(dashboard)/dashboard/_components/property-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSingleApartmentsQuery } from "@/redux/features/landlord/property/propertyApi";
import {
  Bed,
  Bath,
  Clock,
  Building2,
  Ruler,
  MapPin,
  Play,
  Check,
  ChevronRight,
  Layers,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Unit = {
  id: string;
  unitNumber: string;
  floor?: number;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqFt?: number;
  price?: number;
  isRented?: boolean;
};

export default function PropertyDetails() {
  const { id } = useParams();

  const { data } = useGetSingleApartmentsQuery(id);

  const property = data?.data;

  // ---- Images ----
  const images: string[] =
    property?.images && property.images.length > 0
      ? property.images.map((img: any) => img.url)
      : [
          "/placeholder-house.jpg",
          "/placeholder-house.jpg",
          "/placeholder-house.jpg",
        ];

  const [activeImage, setActiveImage] = useState(0);

  // ---- Units (bedrooms/bathrooms/size/price live on each unit, not on the property) ----
  const units: Unit[] =
    property?.units && property.units.length > 0
      ? property.units
      : [
          {
            id: "1",
            unitNumber: "101",
            bedrooms: 2,
            bathrooms: 2,
            sizeSqFt: 950,
            floor: 1,
            isRented: true,
            price: 1200,
          },
          {
            id: "2",
            unitNumber: "102",
            bedrooms: 2,
            bathrooms: 1,
            sizeSqFt: 950,
            floor: 1,
            isRented: false,
            price: 1200,
          },
          {
            id: "3",
            unitNumber: "103",
            bedrooms: 2,
            bathrooms: 1,
            sizeSqFt: 950,
            floor: 1,
            isRented: false,
            price: 1200,
          },
        ];

  // "Property Facilities" summary block — pulled from the first unit as the
  // representative unit (matches how the mock shows one bed/bath/size figure).
  const primaryUnit = units[0];
  const beds = primaryUnit?.bedrooms ?? 0;
  const baths = primaryUnit?.bathrooms ?? 0;
  const sizeSqFt = primaryUnit?.sizeSqFt ?? 0;
  const floors = property?.numberOffloors ?? 0;

  const age = (() => {
    if (property?.builtYear) {
      const built = new Date(property.builtYear);
      const now = new Date();
      return Math.max(1, now.getFullYear() - built.getFullYear());
    }
    return 1;
  })();

  const amenities: string[] =
    property?.amenities && property.amenities.length > 0
      ? property.amenities
      : ["Parking", "Gym Access", "Balcony"];

  const utilities: string[] =
    property?.utilitiesIncluded && property.utilitiesIncluded.length > 0
      ? property.utilitiesIncluded
      : ["Water", "Electricity", "Gas"];

  // Price range across all units for the header "Price" field
  const priceRange = (() => {
    const prices = units.map((u) => u.price).filter(Boolean) as number[];
    if (prices.length === 0) return "";
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `${min}` : `${min}-${max}`;
  })();

  const locationStr =
    [property?.address, property?.city, property?.state, property?.zipCode]
      .filter(Boolean)
      .join(", ") || "Maple Grove 42 Elm St, Austin, TX";

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
        {/* ---------------- Left column ---------------- */}
        <div className="flex flex-col gap-6">
          {/* Image gallery */}
          <ImageGallery images={images} />

          {/* Virtual video */}
          <div>
            <div className="mb-2 font-medium">Property Virtual Video</div>
            <div className="relative w-16 h-14 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center cursor-pointer">
              {property?.video || property?.tourVideo ? (
                <video
                  src={property.video || property.tourVideo}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Property facilities */}
          <div>
            <div className="mb-2 font-medium">Property Facilities</div>
            <div className="flex flex-wrap gap-2">
              <FacilityPill
                icon={<Bed className="w-3.5 h-3.5" />}
                label={`${beds} Beds`}
              />
              <FacilityPill
                icon={<Bath className="w-3.5 h-3.5" />}
                label={`${baths} Baths`}
              />
              <FacilityPill
                icon={<Clock className="w-3.5 h-3.5" />}
                label={`${age} Year`}
              />
              <FacilityPill
                icon={<Building2 className="w-3.5 h-3.5" />}
                label={`${floors} Floor`}
              />
            </div>
            <div className="mt-2">
              <FacilityPill
                icon={<Ruler className="w-3.5 h-3.5" />}
                label={`${sizeSqFt} sq ft`}
              />
            </div>
          </div>

          {/* Amenities / Utilities */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2 font-medium">Amenities</div>
              <div className="flex flex-col gap-2">
                {amenities.map((a) => (
                  <CheckItem key={a} label={a} />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 font-medium">Utilities</div>
              <div className="flex flex-col gap-2">
                {utilities.map((u) => (
                  <CheckItem key={u} label={u} />
                ))}
              </div>
            </div>
          </div>

          {/* Units — now shows bed/bath/size per unit, not just price + status */}
          <div>
            <div className="mb-2 font-medium">Units ({units.length})</div>
            <div className="flex flex-col gap-3">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center justify-between border rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        Unit {unit.unitNumber}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span
                          className={`text-[11px] font-medium ${
                            unit.isRented
                              ? "text-red-500 bg-red-50 px-1.5 py-0.5 rounded"
                              : "text-green-600"
                          }`}
                        >
                          {unit.isRented ? "Rented" : "Vacant"}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Bed className="w-3 h-3" /> {unit.bedrooms ?? 0}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Bath className="w-3 h-3" /> {unit.bathrooms ?? 0}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Ruler className="w-3 h-3" /> {unit.sizeSqFt ?? 0}{" "}
                          sqft
                        </span>
                        {unit.floor != null && (
                          <span className="text-[11px] text-gray-500 flex items-center gap-1">
                            <Layers className="w-3 h-3" /> Fl {unit.floor}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm text-gray-700 font-medium">
                      ${unit.price}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Right column ---------------- */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 font-medium">Property Name</div>
            <Input
              className="h-[56px]"
              defaultValue={property?.name || "Oakwood Avenue"}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <div className="mb-2 font-medium">Price</div>
              <Input
                className="h-[56px]"
                defaultValue={priceRange ? `$${priceRange}` : ""}
              />
            </div>
            <div>
              <div className="mb-2 font-medium">&nbsp;</div>
              <Select defaultValue="USD">
                <SelectTrigger className="h-[56px]!">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 font-medium">Location</div>
            <Input className="h-[56px]" defaultValue={locationStr} />
            <div className="mt-2 rounded-lg overflow-hidden border h-32 relative bg-gray-100">
              <img
                src="https://staticmap.openstreetmap.de/staticmap.php?center=40.7128,-74.0060&zoom=12&size=600x260&markers=40.7128,-74.0060,red-pushpin"
                alt="Map"
                className="w-full h-full object-cover"
              />
              <MapPin className="w-6 h-6 text-red-500 fill-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full drop-shadow" />
            </div>
          </div>

          <div>
            <div className="mb-2 font-medium">Property Status</div>
            <Select
              defaultValue={
                property?.listingType === "for_rent"
                  ? "For Rent"
                  : property?.listingType === "for_sale"
                    ? "For Sale"
                    : property?.isRented
                      ? "Rented"
                      : "For Rent"
              }
            >
              <SelectTrigger className="h-[56px]! w-full">
                <SelectValue placeholder="For Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="For Rent">For Rent</SelectItem>
                <SelectItem value="For Sale">For Sale</SelectItem>
                <SelectItem value="Rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mb-2 font-medium">Description</div>
            <textarea
              rows={4}
              defaultValue={
                property?.description ||
                "Spacious apartment with hardwood floors, modern kitchen, walk in closets, and a private balcony with city views."
              }
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d48806] focus:border-[#d48806] min-h-[96px]"
            />
          </div>

          <InfoBlock
            title="Automatic Lease Agreement Generation"
            body="Once you request the transfer, the system will automatically generate a lease agreement for the new property."
          />
          <InfoBlock
            title="No Credit Impact"
            body="This transfer will not impact your credit score. It's just a lease transfer."
          />
          <InfoBlock
            title="Cancellation policy"
            body="If a tenant plans to leave, they must notify the landlord at least 1 month in advance. Likewise, the landlord is also required to notify the tenant 1 month prior to any termination or non-renewal."
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image gallery — renders the real images from apartment.images     */
/* ------------------------------------------------------------------ */

function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        No images available
      </div>
    );
  }

  return (
    <div>
      <img
        src={images[active]}
        alt="Property"
        className="w-full h-64 object-cover rounded-lg"
      />
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Property thumbnail ${idx + 1}`}
              onClick={() => setActive(idx)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                idx === active ? "border-[#d48806]" : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FacilityPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-700 bg-white">
      {icon}
      {label}
    </span>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-700">
      <span className="w-4 h-4 rounded-full border border-[#d48806] flex items-center justify-center">
        <Check className="w-2.5 h-2.5 text-[#d48806]" />
      </span>
      {label}
    </div>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="mb-2 font-medium text-sm">{title}</div>
      <div className="bg-gray-50 border rounded-lg px-4 py-4 text-xs text-gray-500">
        {body}
      </div>
    </div>
  );
}
