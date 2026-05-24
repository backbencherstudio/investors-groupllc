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
  DollarSign,
  Home,
  User,
  MapPin,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useGetBookingRequestByIdQuery } from "@/redux/features/request/RequestApi";
import { format } from "date-fns";
import StatusBadge from "@/components/common/StatusBadges";

interface BookingRequestDetailsProps {
  reqId: string;
}

    export default function BookingRequestDetails({ reqId }: BookingRequestDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: request, isLoading } = useGetBookingRequestByIdQuery(reqId, {
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
                  Booking Request: {request.requestId}
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
                  <div className="flex justify-between items-start">
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
                    <Button variant="link" className="text-orange-500 text-sm p-0 h-auto">
                      View Details
                    </Button>
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

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4 text-orange-500" />
                      {request.applicant.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4 text-orange-500" />
                      {request.applicant.email}
                    </div>
                  </div>
                </div>

                {/* Applicant Details */}
                <div className="py-6 border-b">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Applicant Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Employer Name</span>
                      <span className="text-sm font-medium">{request.applicant.employerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Job Title</span>
                      <span className="text-sm font-medium">{request.applicant.jobTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Annual Salary</span>
                      <span className="text-sm font-medium">${request.applicant.annualSalaryRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Credit Check Authorized</span>
                      <span className="text-sm font-medium">{request.applicant.creditCheckAuthorized ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                {/* Unit Details */}
                {request.unit && (
                  <div className="py-6 border-b">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Home className="w-4 h-4 text-orange-500" />
                      Unit Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Unit Number</span>
                        <span className="text-sm font-medium">{request.unit.unitNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bedrooms</span>
                        <span className="text-sm font-medium">{request.unit.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bathrooms</span>
                        <span className="text-sm font-medium">{request.unit.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price</span>
                        <span className="text-sm font-medium">${request.unit.price}/month</span>
                      </div>
                    </div>
                  </div>
                )}

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
                      <span className="text-sm text-gray-600">Lease Start</span>
                      <span className="text-sm font-medium">{format(new Date(request.leaseStartDate), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Lease End</span>
                      <span className="text-sm font-medium">{format(new Date(request.leaseEndDate), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Request Date</span>
                      <span className="text-sm font-medium">{format(new Date(request.requestedAt), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <StatusBadge status={request.status} />
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="py-6">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    Documents
                  </h3>
                  <div className="space-y-3">
                    {request.idVerificationDocUrl && (
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-red-500" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">ID Verification</div>
                            <div className="text-xs text-gray-500">Click to download</div>
                          </div>
                        </div>
                        <button onClick={() => handleDownload(request.idVerificationDocUrl, "id-verification")}>
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    )}
                    {request.financialDocUrl && (
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-red-500" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Financial Document</div>
                            <div className="text-xs text-gray-500">Click to download</div>
                          </div>
                        </div>
                        <button onClick={() => handleDownload(request.financialDocUrl, "financial-document")}>
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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