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
import { Download, EyeIcon, FileText, Mail, Phone, X } from "lucide-react";
import Image from "next/image";

function formatDate(isoString: string): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface DocumentItem {
  name: string;
  url: string;
  size?: string;
}

export default function TenantRequestDetails({
  data,
  onOpen,
}: {
  data: any;
  onOpen?: () => void;
}) {
  const tenantName = data?.name || "";
  const tenantAvatar = data?.tenant?.avatar_url || "";
  const tenantRole = data?.tenant?.type
    ? data.tenant.type.charAt(0) + data.tenant.type.slice(1).toLowerCase()
    : "Tenant";
  const tenantPhone = data?.phone || "";
  const tenantEmail = data?.email || "";
  const tenantJobTitle = data?.jobTitle || "";
  const tenantSalary = data?.annualSalaryRange || "";
  const tenantLeaseStart = data?.leaseStartDate
    ? formatDate(data.leaseStartDate)
    : "";
  const tenantLeaseEnd = data?.leaseEndDate
    ? formatDate(data.leaseEndDate)
    : "";

  const propertyImage = data?.apartment?.first_image_url || "";
  const propertyName = data?.apartment?.name || "";
  const propertyAddress = data?.apartment
    ? `${data.apartment.address}, ${data.apartment.city}, ${data.apartment.state} ${data.apartment.zipCode}`
    : "";
  const propertyRequestType = "Rental Application";
  const propertyRequestId = data?.id ? `#${data.id.slice(0, 8)}` : "";
  const propertyLeaseStart = tenantLeaseStart;
  const propertyLeaseEnd = tenantLeaseEnd;
  const status = data?.status;

  const documents: DocumentItem[] = [];
  if (data?.doc?.idVerificationDocUrl) {
    documents.push({
      name: "ID Verification Document",
      url: data.doc.idVerificationDocUrl,
    });
  }
  if (data?.doc?.financialDocUrl) {
    documents.push({
      name: "Financial Document",
      url: data.doc.financialDocUrl,
    });
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          className="text-gray-600 hover:text-primary cursor-pointer"
          onClick={onOpen}
        >
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white p-6">
          {/* Header */}
          <DrawerHeader className="flex flex-row justify-between items-center pb-6 border-zinc-200 mb-4">
            <DrawerTitle className="text-[16px] font-semibold">
              Booking Request: {propertyRequestId}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* Tenant Info */}
          <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6">
            <div className="flex justify-between items-center ">
              {/* Left side - Tenant Info */}
              <div className="flex items-center gap-4">
                <Image
                  width={40}
                  height={40}
                  src={tenantAvatar}
                  alt={tenantName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{tenantName}</div>
                  <div className="text-sm text-gray-500">{tenantRole}</div>{" "}
                </div>
              </div>

              {/* middle side - Tenant Info */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={propertyImage}
                    alt={propertyName}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{propertyName}</div>
                    <div className="text-xs text-muted-foreground">
                      {propertyAddress}
                    </div>
                  </div>
                </div>
              </div>
              {/* Right side - Property Info */}
              <Button
                variant="link"
                className="text-orange-500 text-sm p-0 h-auto cursor-pointer"
              >
                View Details
              </Button>
            </div>
            {/* Tenant Role */}
            <div className="flex  gap-4">
              <div className=" text-gray-500 flex items-center gap-2 text-sm">
                <Phone className="w-5 h-5 text-orange-500" />
                {tenantPhone}
              </div>
              <div className=" text-gray-500 flex items-center gap-2 text-sm">
                <Mail className="w-5 h-5 text-orange-500" />
                {tenantEmail}
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-zinc-200">
            <div className="space-y-2">
              {/* Current Address */}
              <div className="flex justify-between   text-gray-700">
                <span className="font-semibold">Current Address</span>
                <span className="font-medium">{propertyAddress}</span>
              </div>

              {/* Employer Name */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Employer Name</span>
                <span className="font-medium">—</span>
              </div>

              {/* Job Title */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Job Title</span>
                <span className="font-medium">{tenantJobTitle}</span>
              </div>

              {/* Annual Salary */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Annual Salary</span>
                <span className="font-medium">{tenantSalary}</span>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-zinc-200">
            <div className="space-y-2">
              {/* Request Type */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Request Type</span>
                <span className="font-medium">{propertyRequestType}</span>
              </div>

              {/* Lease Start */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Lease Start</span>
                <span className="font-medium">{propertyLeaseStart}</span>
              </div>

              {/* Lease End */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Lease End</span>
                <span className="font-medium">{propertyLeaseEnd}</span>
              </div>

              {/* Request ID */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Request ID</span>
                <span className="font-medium">{propertyRequestId}</span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center  text-gray-700">
                <span className="font-semibold">Status</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-semibold">
                  {status}
                </span>
              </div>

              {/* Request Date */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Request Date</span>
                <span className="font-medium">{tenantLeaseStart}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <LeaseDoc documents={documents} />
          </div>

          {/* Footer Actions */}
          <DrawerFooter className="flex flex-col sm:flex-row gap-2 mt-auto">
            <Button
              variant="default"
              className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600"
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto  text-black hover:bg-orange-50"
            >
              Reject
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const LeaseDoc = ({ documents }: { documents: DocumentItem[] }) => {
  return (
    <div className="w-full max-w-2xl mx-auto  bg-white">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {documents.slice(0, 2).map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {doc.name}
                </div>
              </div>
            </div>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
