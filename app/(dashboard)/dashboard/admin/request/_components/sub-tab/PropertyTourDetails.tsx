"use client"
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
  useGetPropertyTourRequestByIdQuery,
  useUpdatePropertyTourRequestStatusMutation,
} from "@/redux/features/request/RequestApi";
import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";
import {
  Download,
  EyeIcon,
  FileText,
  Mail,
  Phone,
  X,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Bed,
  Bath,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

export default function PropertyTourDetails({ reqId }: { reqId: string }) {
  const { data: response, isLoading } = useGetPropertyTourRequestByIdQuery(reqId);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdatePropertyTourRequestStatusMutation();

  // Safely extract the item data whether it's nested in `data` or returned directly
  const tourData =  response;

  const tenant = tourData?.requester;
  const property = tourData?.property;
  const unit = tourData?.unit;
  const isInReview =
    tourData?.statusRaw === "under_review" ||
    tourData?.statusRaw === "in_review" ||
    tourData?.status?.toLowerCase() === "in review";

  const handleStatusUpdate = async (status: "confirmed" | "rejected") => {
    try {
      await updateStatus({ id: reqId, status }).unwrap();
      toast.success(`Property tour request ${status}.`);
    } catch {
      toast.error("Failed to update property tour request status.");
    }
  };

  // Format date nicely if available
  const formattedDate = tourData?.tourDate
    ? new Date(tourData.tourDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const requestedDate = tourData?.requestedAt
    ? new Date(tourData.requestedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white p-6 overflow-y-auto">
          {/* Header */}
          <DrawerHeader className="flex flex-row justify-between items-center pb-6 border-zinc-200 mb-4 p-0">
            <DrawerTitle className="text-[16px] font-semibold">
              Property Tour Request: {tourData?.requestId || reqId}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {isLoading ? (
            <Loader />
          ) : !tourData ? (
            <div className="flex items-center justify-center flex-1 py-12 text-red-500">
              Failed to load tour details.
            </div>
          ) : (
            <>
              {/* Tenant & Property Overview */}
              <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6">
                <div className="flex flex-col gap-4">
                  {/* Tenant Info */}
                  <div className="flex items-center gap-4">
                    {tenant?.avatar ? (
                      <Image
                        width={48}
                        height={48}
                        src={tenant.avatar}
                        alt={tenant.name || "Tenant"}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {tenant?.name?.charAt(0).toUpperCase() || "T"}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{tenant?.name}</div>
                      <div className="text-sm text-gray-500">{tenant?.role}</div>
                    </div>
                  </div>

                  {/* Property Info Card */}
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      {property?.imageUrl ? (
                        <Image
                          width={40}
                          height={40}
                          src={property.imageUrl}
                          alt={property.name || "Property"}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Building className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{property?.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {property?.address}
                        </div>
                      </div>
                    </div>
                    {unit && (
                      <div className="text-right">
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded font-semibold">
                          Unit {unit.unitNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex gap-4">
                  <div className="text-gray-500 flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span>Contact via app</span>
                  </div>
                  <div className="text-gray-500 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span className="truncate max-w-[180px]">{tenant?.name}</span>
                  </div>
                </div>
              </div>

              {/* Unit Specifications */}
              {unit && (
                <div className="py-6 border-b border-zinc-200">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Unit Details
                  </div>
                  <div className="grid grid-cols-3 gap-3 bg-zinc-50 p-3 rounded-lg border border-zinc-100 text-center">
                    <div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" /> Price
                      </div>
                      <div className="font-semibold text-gray-800 text-sm mt-1">${unit.price}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Bed className="w-3.5 h-3.5" /> Beds
                      </div>
                      <div className="font-semibold text-gray-800 text-sm mt-1">{unit.bedrooms}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Bath className="w-3.5 h-3.5" /> Baths
                      </div>
                      <div className="font-semibold text-gray-800 text-sm mt-1">{unit.bathrooms}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tour Request Details */}
              <div className="py-6 border-b border-zinc-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Tour Information
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span className="font-semibold">Tour Type</span>
                    <span className="font-medium capitalize">
                      {tourData?.tourType?.replace("_", " ") || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 text-sm">
                    <span className="font-semibold">Tour Date</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" /> {formattedDate}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 text-sm">
                    <span className="font-semibold">Tour Time</span>
                    <span className="font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" /> {tourData?.tourTime || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 text-sm">
                    <span className="font-semibold">Request ID</span>
                    <span className="font-medium">{tourData?.requestId}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-700 text-sm">
                    <span className="font-semibold">Status</span>
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                      {tourData?.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 text-sm">
                    <span className="font-semibold">Requested At</span>
                    <span className="font-medium">{requestedDate}</span>
                  </div>

                  {tourData?.statusRaw === "canceled" && tourData?.rejectTitle && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="font-semibold text-red-700 text-xs uppercase mb-1">
                        Rejection Reason: {tourData.rejectTitle}
                      </div>
                      <div className="text-sm text-red-600">
                        {tourData.rejectDescription || "No description provided."}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-6">
                <LeaseDoc />
              </div>

              {isInReview && (
                <DrawerFooter className="flex flex-col sm:flex-row gap-2 mt-auto p-0 pt-6">
                  <Button
                    variant="default"
                    className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("confirmed")}
                  >
                    {isUpdating ? "Updating..." : "Accept"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-black hover:bg-orange-50 cursor-pointer"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("rejected")}
                  >
                    {isUpdating ? "Updating..." : "Reject"}
                  </Button>
                </DrawerFooter>
              )}
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const documents = [
  { id: 1, name: "Tour Guidelines", size: "2.4 MB" },
  { id: 2, name: "ID Verification", size: "4.1 MB" },
];

const LeaseDoc = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        Attached Files
      </div>
      <div className="grid grid-cols-2 gap-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div className="truncate">
                <div className="font-medium text-gray-900 text-xs truncate">
                  {doc.name}
                </div>
                <div className="text-[10px] text-gray-500">{doc.size}</div>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer shrink-0">
              <Download className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
