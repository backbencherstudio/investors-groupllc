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
  Building2,
  User,
  Clock,
  RefreshCw,
  TrendingUp,
  Lock,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useGetInvestmentApplicationByIdQuery, useUpdateInvestmentApplicationStatusMutation } from "@/redux/features/request/RequestApi";
import { toast } from "sonner";

interface InvestmentApplicationDetailsProps {
  applicationId: string;
  requestId: string;
}

export default function InvestmentApplicationDetails({ 
  applicationId, 
  requestId 
}: InvestmentApplicationDetailsProps) {
  const { data, isLoading, isError } = useGetInvestmentApplicationByIdQuery(applicationId);


  const [updateStatus, { isLoading: isUpdating }] = useUpdateInvestmentApplicationStatusMutation();
  // Handle status update
  const handleStatusUpdate = async (id: string, status: 'pending' | 'active' | 'cancelled') => {
    try {
      const result = await updateStatus({ id, status }).unwrap();
      toast(`Application status updated to ${status}`);
      // refetch();
    } catch (error: any) {
      toast("Failed to update statsu");
    }
  };


  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon className="w-5 h-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white p-6 overflow-auto">
          {/* Header */}
          <DrawerHeader className="flex flex-row justify-between items-center pb-6 border-b border-zinc-200 mb-4">
            <DrawerTitle className="text-[16px] font-semibold">
              Investment Application: {requestId}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {isLoading ? (
            <LoadingSkeleton />
          ) : isError || !data ? (
            <ErrorState />
          ) : (
            <>
              {/* Investor Info */}
              <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6">
                <div className="flex justify-between items-start">
                  {/* Left side - Investor Info */}
                  <div className="flex items-center gap-4 shrink-0">
                    <Image
                      width={48}
                      height={48}
                      src={data.requester.avatar || "/placeholder-avatar.png"}
                      alt={data.requester.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-base">{data.requester.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {data.requester.role}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge 
                    variant={
                      data.statusRaw === 'approved' ? 'success' : 
                      data.statusRaw === 'rejected' ? 'destructive' : 
                      'warning'
                    }
                    className="capitalize"
                  >
                    {data.status}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4">
                  {data.requester.phone && (
                    <div className="text-gray-500 flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-orange-500" />
                      {data.requester.phone}
                    </div>
                  )}
                  {data.requester.email && (
                    <div className="text-gray-500 flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-orange-500" />
                      {data.requester.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Info */}
              <div className="py-6 border-b border-zinc-200">
                <div className="flex items-start gap-4">
                  <Image
                    width={80}
                    height={80}
                    src={data.property.imageUrl || "/placeholder-property.png"}
                    alt={data.property.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-base">{data.property.name}</div>
                    <div className="text-sm text-gray-500">{data.property.address}</div>
                    <Button
                      variant="link"
                      className="text-[#d80] text-sm p-0 h-auto cursor-pointer mt-1"
                    >
                      View Property Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="py-6 border-b border-zinc-200">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-orange-500" />
                  Investment Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Amount</span>
                    <span className="font-semibold text-green-600">
                      ${data.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Type</span>
                    <span className="capitalize">{data.type}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Auto Renew</span>
                    <span className="flex items-center gap-1">
                      <RefreshCw className={cn(
                        "w-4 h-4",
                        data.autoRenew ? "text-green-500" : "text-gray-400"
                      )} />
                      {data.autoRenew ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Requested At</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {format(new Date(data.requestedAt), "MMM dd, yyyy h:mm a")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Last Updated</span>
                    <span className="text-sm">
                      {format(new Date(data.updatedAt), "MMM dd, yyyy h:mm a")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Investment Terms */}
              {data.property.investmentDetails && data.property.investmentDetails.length > 0 && (
                <div className="py-6 border-b border-zinc-200">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    Investment Terms
                  </h4>
                  {data.property.investmentDetails.map((detail, index) => (
                    <div key={index} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Total Goal</p>
                          <p className="font-semibold">${parseInt(detail.totalFoundGoal).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Annual Return</p>
                          <p className="font-semibold text-green-600">{detail.annualReturnRate}%</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Min Investment</p>
                          <p className="font-semibold">${parseInt(detail.minimumInvest).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Max Investment</p>
                          <p className="font-semibold">${parseInt(detail.maximumInvest).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span className="font-medium flex items-center gap-1">
                          <Lock className="w-4 h-4 text-gray-400" />
                          Lock-in Period
                        </span>
                        <span>{detail.lockInPeriod}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span className="font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          Start Date
                        </span>
                        <span>{format(new Date(detail.startDate), "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span className="font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          Completion Date
                        </span>
                        <span>{format(new Date(detail.completionDate), "MMM dd, yyyy")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents */}
              {data.property.images && data.property.images.length > 0 && (
                <div className="py-6">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    Property Images
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {data.property.images.slice(0, 4).map((image, index) => (
                      <div
                        key={image.id || index}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <Image
                          src={image.url}
                          alt={`Property image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {data.property.images.length > 4 && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      +{data.property.images.length - 4} more images
                    </p>
                  )}
                </div>
              )}

              {/* Footer Actions */}
              <DrawerFooter className="flex flex-col sm:flex-row gap-2 mt-auto pt-4 border-t border-zinc-200">
                {data.statusRaw === 'pending' ? (
                  <>
                    <Button
                      variant="default"
                      className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
                      onClick={() => {
                        // Handle approve
                      }}
                    >
                      Approve 
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => {
                        // Handle reject
                      }}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Handle view full details
                    }}
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                )}
              </DrawerFooter>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Loading Skeleton
const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};

// Error State
const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-red-500 mb-4">
        <X className="w-12 h-12" />
      </div>
      <p className="text-gray-600 text-center">
        Failed to load investment application details.
        <br />
        Please try again later.
      </p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </div>
  );
};