// maintenance-details.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  EyeIcon,
  X,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Clock,
  DollarSign,
  Bed,
  Bath,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useGetApartmentRequestByIdQuery } from "@/redux/features/request/RequestApi";
import { format } from "date-fns";
import StatusBadge from "@/components/common/StatusBadges";
import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";

interface ApartmentRequestDetailsProps {
  reqId: string;
}

export default function ApartmentRequestDetails({ reqId }: ApartmentRequestDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: request, isLoading } = useGetApartmentRequestByIdQuery(reqId, {
    skip: !isOpen,
  });

  console.log("Apartment req details", request);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon className="w-4 h-4" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white">
          {isLoading ? (
            <Loader />
          ) : request ? (
            <>
              {/* Header */}
              <DrawerHeader className="flex flex-row justify-between items-center pb-4 border-b px-6 py-4">
                <DrawerTitle className="text-[16px] font-semibold">
                  Apartment Request: {request.requestId}
                </DrawerTitle>
                <DrawerClose asChild>
                  <button className="text-zinc-500 hover:text-zinc-700">
                    <X className="w-5 h-5" />
                  </button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-6 pb-4">
                {/* Requester & Property */}
                <div className="flex flex-col gap-4 border-b py-6">
                  <div className="flex items-center gap-3">
                    <Image
                      width={48}
                      height={48}
                      src={request.requester.avatar || "/placeholder-avatar.png"}
                      alt={request.requester.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{request.requester.name}</div>
                      <div className="text-sm text-gray-500">{request.requester.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {request.property.imageUrl && (
                      <Image
                        width={40}
                        height={40}
                        src={request.property.imageUrl}
                        alt={request.property.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{request.property.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {request.property.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4 text-orange-500" />
                      {request.requester.phone || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4 text-orange-500" />
                      {request.requester.email || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Unit Details */}
                <div className="py-6 border-b">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4 text-orange-500" />
                    Unit Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Unit Number</span>
                      <span className="text-sm font-medium">{request.unit.unitNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rent Price</span>
                      <span className="text-sm font-medium">${request.unit.price?.toLocaleString() || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bedrooms</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {request.unit.bedrooms || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bathrooms</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        {request.unit.bathrooms || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tour Details */}
                <div className="py-6 border-b">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Tour Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tour Type</span>
                      <span className="text-sm font-medium">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {request.tourTypeLabel}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tour Date</span>
                      <span className="text-sm font-medium">
                        {format(new Date(request.tourDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tour Time</span>
                      <span className="text-sm font-medium">{request.tourTime}</span>
                    </div>
                    {request.virtualMeetingLink && (
                      <div>
                        <span className="text-sm text-gray-600">Meeting Link</span>
                        <a 
                          href={request.virtualMeetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline block mt-1"
                        >
                          {request.virtualMeetingLink}
                        </a>
                      </div>
                    )}
                    {request.description && (
                      <div>
                        <span className="text-sm text-gray-600">Description</span>
                        <p className="text-sm font-medium mt-1">{request.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Request Details */}
                <div className="py-6 border-b">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Request Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Request ID</span>
                      <span className="text-sm font-medium">{request.requestId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Request Date</span>
                      <span className="text-sm font-medium">
                        {format(new Date(request.requestedAt), "MMM dd, yyyy 'at' hh:mm a")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="text-sm font-medium">
                        {format(new Date(request.updatedAt), "MMM dd, yyyy 'at' hh:mm a")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <StatusBadge status={request.status} />
                    </div>
                  </div>
                </div>

                {/* Rejection Details (if rejected) */}
                {(request.statusRaw === "canceled" || request.statusRaw === "rejected") && request.rejectTitle && (
                  <div className="py-6 border-b">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-red-600">
                      <XCircle className="w-4 h-4" />
                      Rejection Details
                    </h3>
                    <div className="space-y-3 bg-red-50 p-4 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-600">Reason</span>
                        <p className="text-sm font-medium mt-1">{request.rejectTitle}</p>
                      </div>
                      {request.rejectDescription && (
                        <div>
                          <span className="text-sm text-gray-600">Description</span>
                          <p className="text-sm mt-1">{request.rejectDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-t">
                {request.statusRaw !== "canceled" && request.statusRaw !== "rejected" ? (
                  <>
                    <Button className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600">
                      Approve Tour
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Reject
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                )}
              </DrawerFooter>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Failed to load request details</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}