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
  Building2,
  User,
  MapPin,
  Home,
  BedDouble,
  Bath,
  Ruler,
  CheckCircle,
  XCircle,
  PawPrint,
  Star,
  Video,
} from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  useGetPropertyListingRequestDetailsQuery,
  useUpdatePropertyListingRequestStatusMutation,
} from "@/redux/features/request/RequestApi";
import { toast } from "sonner";

interface PropertyListingDetailsProps {
  applicationId: string;
  requestId?: string;
}

interface PropertyListingDetailsData {
  requestId?: string;
  property?: {
    imageUrl?: string | null;
    name?: string | null;
    address?: string | null;
  };
  landlord?: {
    id?: string | null;
    name?: string;
    avatar?: string | null;
    email?: string | null;
  };
  information?: {
    requestId?: string;
    requestType?: string;
    priceRange?: string;
    petFriendly?: boolean;
    status?: string;
    statusRaw?: string;
    requestDate?: string;
    listingType?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    description?: string;
    amenities?: string[];
    utilitiesIncluded?: string[];
  };
  units?: Array<{
    id: string;
    unitNumber: string;
    price: number;
    isRented: boolean;
    bedrooms: number;
    bathrooms: number;
  }>;
  attachments?: Array<{
    url: string;
    name?: string;
  }>;
}

export default function PropertyListingDetails({
  applicationId,
}: PropertyListingDetailsProps) {
  const { data: rawData, isLoading, isError } =
    useGetPropertyListingRequestDetailsQuery(applicationId);
  const data = rawData as unknown as PropertyListingDetailsData | undefined;
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdatePropertyListingRequestStatusMutation();

  const isInReview =
    data?.information?.statusRaw === "under_review" ||
    data?.information?.statusRaw === "in_review" ||
    data?.information?.status?.toLowerCase() === "in review";

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    try {
      await updateStatus({ id: applicationId, status }).unwrap();
      toast.success(`Property listing ${status}.`);
    } catch {
      toast.error("Failed to update property listing status.");
    }
  };

  console.log("Property Listing Details Data:", data);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon className="w-5 h-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[520px]">
        <div className="flex flex-col h-full bg-white p-6 overflow-auto">
          <DrawerHeader className="flex flex-row justify-between items-center pb-6 border-b border-zinc-200 mb-4">
            <DrawerTitle className="text-[16px] font-semibold">
              Property Listing Details
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
              {/* Property Image & Name */}
              <div className="flex items-start gap-4 border-b border-zinc-200 pb-6">
                <Image
                  width={80}
                  height={80}
                  src={data.property?.imageUrl || "/placeholder-property.png"}
                  alt={data.property?.name || "Property"}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-base">{data.property?.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {data.property?.address || `${data.information?.city || ''}, ${data.information?.state || ''} ${data.information?.zipCode || ''}`}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={data.information?.statusRaw === "approved" ? "success" : "warning"}>
                      {data.information?.status || "Pending"}
                    </Badge>
                    <Badge variant={data.information?.listingType === "for_rent" ? "default" : "secondary"}>
                      {data.information?.listingType === "for_rent" ? "For Rent" : "For Sale"}
                    </Badge>
                    {/* Remove featured badge as it's not in the data */}
                  </div>
                </div>
              </div>

              {/* Landlord Info */}
              <div className="py-6 border-b border-zinc-200">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" />
                  Landlord
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {data.landlord?.avatar ? (
                      <Image
                        src={data.landlord.avatar}
                        alt={data.landlord.name || "Landlord"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{data.landlord?.name}</div>
                    <div className="text-xs text-gray-500">ID: {data.landlord?.id}</div>
                    <div className="text-xs text-gray-500">{data.landlord?.email}</div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="py-6 border-b border-zinc-200">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-500" />
                  Property Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Request ID</p>
                    <p className="font-semibold">{data.requestId || data.information?.requestId}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Request Type</p>
                    <p className="font-semibold">{data.information?.requestType}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Price Range</p>
                    <p className="font-semibold">{data.information?.priceRange}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Pet Friendly</p>
                    <p className="font-semibold flex items-center gap-1">
                      {data.information?.petFriendly ? (
                        <><PawPrint className="w-4 h-4 text-green-500" /> Yes</>
                      ) : (
                        <><XCircle className="w-4 h-4 text-red-400" /> No</>
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-semibold">{data.information?.status}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Request Date</p>
                    <p className="font-semibold text-sm">
                      {data.information?.requestDate ? format(new Date(data.information.requestDate), "MMM dd, yyyy") : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {data.information?.description && (
                <div className="py-6 border-b border-zinc-200">
                  <h4 className="font-semibold text-sm mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{data.information.description}</p>
                </div>
              )}

              {/* Amenities */}
              {(data.information?.amenities?.length ?? 0) > 0 && (
                <div className="py-6 border-b border-zinc-200">
                  <h4 className="font-semibold text-sm mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.information?.amenities?.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Utilities Included */}
              {(data.information?.utilitiesIncluded?.length ?? 0) > 0 && (
                <div className="py-6 border-b border-zinc-200">
                  <h4 className="font-semibold text-sm mb-3">Utilities Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.information?.utilitiesIncluded?.map((utility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {utility}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Units */}
              {(data.units?.length ?? 0) > 0 && (
                <div className="py-6 border-b border-zinc-200">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4 text-orange-500" />
                    Units ({data.units?.length})
                  </h4>
                  <div className="space-y-3">
                    {data.units?.map((unit) => (
                      <div
                        key={unit.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold">Unit {unit.unitNumber}</div>
                            <div className="text-xs text-gray-500">
                              Price: ${unit.price.toLocaleString()}
                            </div>
                          </div>
                          <Badge variant={unit.isRented ? "destructive" : "success"}>
                            {unit.isRented ? "Rented" : "Available"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <BedDouble className="w-3 h-3" /> {unit.bedrooms} Bed
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Bath className="w-3 h-3" /> {unit.bathrooms} Bath
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {(data.attachments?.length ?? 0) > 0 && (
                <div className="py-6">
                  <h4 className="font-semibold text-sm mb-3">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.attachments?.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          {attachment.name || `Attachment ${index + 1}`}
                        </a>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {isInReview && (
                <DrawerFooter className="flex flex-col sm:flex-row gap-2 mt-auto pt-4 border-t border-zinc-200">
                  <Button
                    variant="default"
                    className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("approved")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isUpdating ? "Updating..." : "Accept"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-red-600 hover:bg-red-50 border-red-200"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("rejected")}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
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

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="w-20 h-20 rounded-lg" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="text-red-500 mb-4">
      <X className="w-12 h-12" />
    </div>
    <p className="text-gray-600 text-center">
      Failed to load property listing details.
      <br />
      Please try again later.
    </p>
  </div>
);
