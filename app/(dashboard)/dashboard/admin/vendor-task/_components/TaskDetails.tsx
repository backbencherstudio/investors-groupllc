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
  Download,
  EyeIcon,
  FileText,
  Mail,
  Phone,
  X,
  Loader2,
  Calendar,
  MapPin,
  AlertCircle,
  User,
  Home,
  Clock,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { useGetVendorDetailsByIdQuery } from "@/redux/features/vendor-task/vendorTaskApi";

// Types
interface MaintenanceFile {
  id: string;
  fileName: string;
  filePath: string;
  fileType: string;
  maintenance_id: string;
  createdAt: string;
  url: string;
}

interface MaintenanceUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  avatar_url: string;
}

interface MaintenanceProperty {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  image_url: string;
}

interface MaintenanceData {
  id: string;
  issue: string;
  description: string;
  location: string;
  category: string;
  priority: string;
  status: string;
  requested_date: string;
  apartmentId: string;
  unitId: string | null;
  vendor_id: string | null;
  files: MaintenanceFile[];
  user: MaintenanceUser;
  requestId: string;
  property: MaintenanceProperty;
  unit: null;
}

interface TaskDetailsProps {
  reqId?: string;
  data?: string; // This should be the maintenance ID
  children?: React.ReactNode;
  onAccept?: () => void;
  onReject?: () => void;
  onStatusChange?: (status: string) => void;
}

const getPriorityConfig = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "emergency":
      return { color: "text-red-600", bg: "bg-red-100", label: "Emergency", icon: AlertCircle };
    case "high":
      return { color: "text-orange-600", bg: "bg-orange-100", label: "High", icon: AlertCircle };
    case "medium":
      return { color: "text-yellow-600", bg: "bg-yellow-100", label: "Medium", icon: AlertCircle };
    case "low":
      return { color: "text-blue-600", bg: "bg-blue-100", label: "Low", icon: AlertCircle };
    default:
      return { color: "text-gray-600", bg: "bg-gray-100", label: priority, icon: AlertCircle };
  }
};

const getStatusConfig = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return { color: "text-yellow-600", bg: "bg-yellow-100", label: "Pending", icon: Clock };
    case "on_going":
      return { color: "text-orange-600", bg: "bg-orange-100", label: "On Going", icon: Clock };
    case "in_review":
      return { color: "text-purple-600", bg: "bg-purple-100", label: "In Review", icon: Clock };
    case "completed":
      return { color: "text-green-600", bg: "bg-green-100", label: "Completed", icon: Clock };
    default:
      return { color: "text-gray-600", bg: "bg-gray-100", label: status, icon: Clock };
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const TaskDocuments = ({ files }: { files: MaintenanceFile[] }) => {
  const handleDownload = (url: string, fileName: string) => {
    window.open(url, "_blank");
  };

  if (!files || files.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No attachments available
      </div>
    );
  }

  return (
    <div className="w-full">
      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-orange-500" />
        Attachments ({files.length})
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow bg-gray-50"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-gray-900 text-xs truncate max-w-[120px]">
                  {file.fileName}
                </div>
                <div className="text-xs text-gray-500">
                  {file.fileType?.split("/")[1]?.toUpperCase() || "FILE"}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDownload(file.url, file.fileName)}
              className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex flex-col h-full bg-white">
    <div className="p-6 pb-4 border-b border-zinc-200">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-24 bg-gray-200 rounded mt-2 animate-pulse"></div>
    </div>
    <div className="flex-1 p-6 space-y-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded mt-1 animate-pulse"></div>
          </div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function TaskDetails({ 
  reqId, 
  data, 
  children, 
  onAccept, 
  onReject,
  onStatusChange 
}: TaskDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // data should be the maintenance ID
  const { data: response, isLoading, error } = useGetVendorDetailsByIdQuery(
    { id: data ?? "" },
    { skip: !isOpen || !data }
  );
  
  const maintenanceData = response?.data;
  console.log("maintenanceData: ", maintenanceData);

  const handleAccept = async () => {
    if (onAccept) {
      await onAccept();
    }
    toast.success("Request accepted successfully");
    onStatusChange?.("accepted");
  };

  const handleReject = async () => {
    if (onReject) {
      await onReject();
    }
    toast.success("Request rejected");
    onStatusChange?.("rejected");
  };

  const priorityConfig = maintenanceData ? getPriorityConfig(maintenanceData.priority) : null;
  const statusConfig = maintenanceData ? getStatusConfig(maintenanceData.status) : null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        {children || (
          <button className="text-gray-600 hover:text-primary cursor-pointer">
            <EyeIcon className="w-4 h-4" />
          </button>
        )}
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[500px] lg:w-[550px]">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-red-500 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-3" />
              <p className="text-lg font-semibold mb-2">Error loading details</p>
              <p className="text-sm">Please try again later</p>
            </div>
          </div>
        ) : maintenanceData ? (
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <DrawerHeader className="flex flex-row justify-between items-center p-6 pb-4 border-b border-zinc-200">
              <div>
                <DrawerTitle className="text-lg font-semibold flex items-center gap-2">
                  <Home className="w-5 h-5 text-orange-500" />
                  Maintenance Request
                </DrawerTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {maintenanceData.requestId}
                </p>
              </div>
              <DrawerClose asChild>
                <button className="text-zinc-500 hover:text-zinc-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </DrawerClose>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Requester & Property Info */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Image
                    width={56}
                    height={56}
                    src={maintenanceData.user.avatar_url || "/default-avatar.png"}
                    alt={maintenanceData.user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-100"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {maintenanceData.user.name}
                    </div>
                    <div className="text-sm text-gray-500">Requester</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{maintenanceData.user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 truncate max-w-[150px]">
                        {maintenanceData.user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Image
                    width={56}
                    height={56}
                    src={maintenanceData?.property?.image_url || "/default-property.png"}
                    alt={maintenanceData?.property?.name || "Property Image"}
                    className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="text-right">
                    <div className="font-medium text-gray-900 text-sm">
                      {maintenanceData?.property?.name}
                    </div>
                    <div className="text-xs text-gray-500 max-w-[150px]">
                      {maintenanceData?.property?.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority & Status Badges */}
              <div className="flex gap-3">
                {priorityConfig && (
                  <div className={`${priorityConfig.bg} ${priorityConfig.color} px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1`}>
                    <priorityConfig.icon className="w-3 h-3" />
                    {priorityConfig.label}
                  </div>
                )}
                {statusConfig && (
                  <div className={`${statusConfig.bg} ${statusConfig.color} px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1`}>
                    <statusConfig.icon className="w-3 h-3" />
                    {statusConfig.label}
                  </div>
                )}
              </div>

              {/* Issue Details */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Issue Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Issue Title</div>
                    <div className="font-medium text-gray-900">{maintenanceData?.issue}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Description</div>
                    <div className="text-sm text-gray-700">{maintenanceData?.description}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Category</div>
                      <div className="text-sm font-medium text-gray-900">{maintenanceData?.category}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Location</div>
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {maintenanceData?.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Property Information</h4>
                <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property Name</span>
                    <span className="font-medium text-gray-900">{maintenanceData?.property?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium text-gray-900 text-right">
                      {maintenanceData?.property?.address}, {maintenanceData?.property?.city}, {maintenanceData?.property?.state}
                    </span>
                  </div>
                  {maintenanceData?.unit && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Unit</span>
                      <span className="font-medium text-gray-900">
                        {maintenanceData?.unit?.name || "N/A"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Request Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Request Information</h4>
                <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Request ID</span>
                    <span className="font-mono text-xs text-gray-900">{maintenanceData?.requestId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Request Date</span>
                    <span className="font-medium text-gray-900">
                      {formatDateTime(maintenanceData?.requested_date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vendor Status</span>
                    <span className="font-medium text-gray-900">
                      {maintenanceData?.vendor_id ? "Assigned" : "Not assigned"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {maintenanceData?.files && maintenanceData?.files.length > 0 && (
                <TaskDocuments files={maintenanceData?.files || []} />
              )}
            </div>

            {/* Footer Actions */}
            {(onAccept || onReject) && (
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 p-6 border-t border-zinc-200 bg-gray-50">
                {onAccept && (
                  <Button
                    onClick={handleAccept}
                    variant="default"
                    className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Accept Request
                  </Button>
                )}
                {onReject && (
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-200"
                  >
                    Reject Request
                  </Button>
                )}
              </DrawerFooter>
            )}
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}