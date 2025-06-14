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
  // MapPin,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const tenant = {
  avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  name: "Johan Mitchell",
  role: "Tenant",
  phone: "+1555-123-7890",
  email: "johan@email.com",
  currentAddress: "Maple Grove 42 Elm St, Austin, TX",
  employer: "Mahher Hereoan",
  jobTitle: "Business",
  salary: "$10,000-$20,000",
  leaseStart: "Apr 10, 2025",
  leaseEnd: "Apr 10, 2025",
};

const property = {
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80",
  name: "Murphy House",
  id: "#R-Murphy House",
  address: "4140 Parker Rd. Allentown, New Mexi",
  requestType: "Rental Application",
  requestId: "#R-00123",
  status: "In Review",
  requestDate: "Apr 10, 2025",
  leaseStart: "Apr 10, 2025",
  leaseEnd: "Apr 10, 2025",
};

export default function TenantRequestDetails({ reqId }: { reqId: string }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white p-6">
          {/* Header */}
          <DrawerHeader className="flex flex-row justify-between items-center pb-6 border-zinc-200 mb-4">
            <DrawerTitle className="text-[16px] font-semibold">
              Booking Request: {reqId}
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
                  src={tenant.avatar}
                  alt={tenant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{tenant.name}</div>
                  <div className="text-sm text-gray-500">
                    {tenant.role}
                  </div>{" "}
                </div>
              </div>

              {/* middle side - Tenant Info */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={property.image}
                    alt={property.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{property.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {property.address}
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
                {tenant.phone}
              </div>
              <div className=" text-gray-500 flex items-center gap-2 text-sm">
                <Mail className="w-5 h-5 text-orange-500" />
                {tenant.email}
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-zinc-200">
            <div className="space-y-2">
              {/* Current Address */}
              <div className="flex justify-between   text-gray-700">
                <span className="font-semibold">Current Address</span>
                <span className="font-medium">{tenant.currentAddress}</span>
              </div>

              {/* Employer Name */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Employer Name</span>
                <span className="font-medium">{tenant.employer}</span>
              </div>

              {/* Job Title */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Job Title</span>
                <span className="font-medium">{tenant.jobTitle}</span>
              </div>

              {/* Annual Salary */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Annual Salary</span>
                <span className="font-medium">{tenant.salary}</span>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-zinc-200">
            <div className="space-y-2">
              {/* Request Type */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Request Type</span>
                <span className="font-medium">{property.requestType}</span>
              </div>

              {/* Lease Start */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Lease Start</span>
                <span className="font-medium">{property.leaseStart}</span>
              </div>

              {/* Lease End */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Lease End</span>
                <span className="font-medium">{property.leaseEnd}</span>
              </div> 

              {/* Request ID */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Request ID</span>
                <span className="font-medium">{property.requestId}</span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center  text-gray-700">
                <span className="font-semibold">Status</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-semibold">
                  {property.status}
                </span>
              </div>

              {/* Request Date */}
              <div className="flex justify-between  text-gray-700">
                <span className="font-semibold">Request Date</span>
                <span className="font-medium">{property.requestDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <LeaseDoc />
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
const documents = [
  { id: 1, name: "Lease Agreement", size: "12 MB" },
  { id: 2, name: "Lease Agreement", size: "12 MB" },
  { id: 3, name: "Lease Agreement", size: "12 MB" },
];

const LeaseDoc = () => {
  return (
    <div className="w-full max-w-2xl mx-auto  bg-white">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {documents.slice(0, 2).map((doc) => (
          <div
            key={doc.id}
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
                <div className="text-xs text-gray-500">{doc.size}</div>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {documents[2].name}
                </div>
                <div className="text-xs text-gray-500">{documents[2].size}</div>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div> */}
    </div>
  );
};
