/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";


export function PropertyCard({ property }: { property: any}) {
    return (
      <div className="bg-white rounded-xl shadow border overflow-hidden flex flex-col">
        <div className="relative">
          <Image
            src={property.image}
            alt={property.title}
            className="w-full h-44 object-cover"
            width={100}
            height={100}
          />
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
              property.status === "Rented"
                ? "bg-blue-100 text-blue-600"
                : property.status === "For Rent"
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {property.status}
          </span>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <div className="font-semibold text-lg">{property.title}</div>
            <div className="text-green-600 font-bold text-lg">
              ${property.price.toLocaleString()}
            </div>
          </div>
          <div className="text-gray-500 text-sm mb-2">{property.address}</div>
          <div className="flex gap-3 text-gray-600 text-xs mb-2">
            <span>
              <i className="fa fa-bed mr-1" />
              {property.beds} Beds
            </span>
            <span>
              <i className="fa fa-bath mr-1" />
              {property.baths} Baths
            </span>
            <span>
              <i className="fa fa-calendar mr-1" />
              {property.year} Year
            </span>
          </div>
          <div className="flex gap-3 text-gray-600 text-xs mb-2">
            <span>
              <i className="fa fa-building mr-1" />
              {property.floor} Floor
            </span>
            <span>
              <i className="fa fa-expand mr-1" />
              {property.area} sq ft
            </span>
          </div>
          {property.owner && (
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
          <Link href={`/dashboard/admin-dashboard/property/rental-property/${property.id}`} className="mt-4 border border-gray-300 rounded-lg py-2 w-full font-medium hover:bg-gray-50 transition text-center">
            Details
          </Link>
        </div>
      </div>
    );
  }