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
  Download,
  EyeIcon,
  FileText,
  Mail,
  Phone,
  X,
  Calendar,
  Home,
  User,
  MapPin,
  AlertCircle,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useGetMaintenanceRequestByIdQuery } from "@/redux/features/request/RequestApi";
import { format } from "date-fns";
import StatusBadge from "@/components/common/StatusBadges";

interface MaintenanceDetailsProps {
  reqId: string;
}

export default function MaintenanceDetails({ reqId }: MaintenanceDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: request, isLoading } = useGetMaintenanceRequestByIdQuery(reqId, {
    skip: !isOpen,
  });

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "emergency":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : request ? (
            <>
              {/* Header */}
              <DrawerHeader className="flex flex-row justify-between items-center pb-4 border-b px-6 py-4">
                <DrawerTitle className="text-[16px] font-semibold">
                  Maintenance Request: {request.requestId}
                </DrawerTitle>
                <DrawerClose asChild>
                  <button className="text-zinc-500 hover:text-zinc-700">
                    <X className="w-5 h-5" />
                  </button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-6">
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

                  <div className="flex gap-4">
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

                {/* Issue Details */}
                <div className="py-6 border-b">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Issue Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Issue</span>
                      <span className="text-sm font-medium">{request.issue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Category</span>
                      <span className="text-sm font-medium">{request.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm font-medium">{request.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Priority</span>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
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
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Request Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Request ID</span>
                      <span className="text-sm font-medium">{request.requestId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Request Date</span>
                      <span className="text-sm font-medium">{format(new Date(request.requestedAt), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <StatusBadge status={request.status} />
                    </div>
                    {request.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completed Date</span>
                        <span className="text-sm font-medium">{format(new Date(request.completedAt), "MMM dd, yyyy")}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignee Info */}
                {request.assignee && (
                  <div className="py-6 border-b">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-500" />
                      Assigned To
                    </h3>
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={request.assignee.avatar || "/placeholder-avatar.png"}
                        alt={request.assignee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{request.assignee.name}</div>
                        <div className="text-xs text-gray-500">{request.assignee.role}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cost Details */}
                {request.cost && (request.cost.estimatedPartsFee || request.cost.serviceFee || request.cost.actualCost) && (
                  <div className="py-6 border-b">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-orange-500" />
                      Cost Details
                    </h3>
                    <div className="space-y-2">
                      {request.cost.estimatedPartsFee && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Estimated Parts Fee</span>
                          <span className="text-sm font-medium">${request.cost.estimatedPartsFee}</span>
                        </div>
                      )}
                      {request.cost.serviceFee && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Service Fee</span>
                          <span className="text-sm font-medium">${request.cost.serviceFee}</span>
                        </div>
                      )}
                      {request.cost.actualCost && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Actual Cost</span>
                          <span className="text-sm font-medium">${request.cost.actualCost}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents */}
                {request.files && request.files.length > 0 && (
                  <div className="py-6">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-500" />
                      Attached Files
                    </h3>
                    <div className="space-y-3">
                      {request.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-red-500" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{file.fileName}</div>
                              <div className="text-xs text-gray-500">{format(new Date(file.createdAt), "MMM dd, yyyy")}</div>
                            </div>
                          </div>
                          <button onClick={() => handleDownload(file.url, file.fileName)}>
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-t">
                <Button className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600">
                  Accept
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Reject
                </Button>
              </DrawerFooter>
            </>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}