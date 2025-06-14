import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
// import DatePicker from "@/components/common/DatePicker";    
import { TablePagination } from "@/components/common/TablePagination";
import TenantRequestDetails from "../others/tenant-request-details";

interface BookingData {
  reqDate: string;
  name: string;
  id: string;
  fromProperty: string;
  fromPropertyImage: string;
  fromPropertyAddress: string;
  toProperty: string;
  toPropertyImage: string;
  toPropertyAddress: string;
  status: string;
  action: string;
  avatar: string;
  phone: string;
}

const bookingData: BookingData[] = [
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#T-0556",
    fromProperty: "Murphy House",
    fromPropertyImage: "/placeholder-avatar.png",
    fromPropertyAddress: "123 Main St, Anytown, USA",
    toProperty: "Skyline Villas",
    toPropertyImage: "/placeholder-avatar.png",
    toPropertyAddress: "123 Main St, Anytown, USA",
    status: "In Review",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
  },
  {
    reqDate: "Apr 10, 2025",
    name: "Esther Hawq",
    id: "#T-0557",
    fromProperty: "River View",
    fromPropertyImage: "/placeholder-avatar.png",
    fromPropertyAddress: "123 Main St, Anytown, USA",
    toProperty: "Lakeside Manor",
    toPropertyImage: "/placeholder-avatar.png",
    toPropertyAddress: "123 Main St, Anytown, USA",
    status: "Approved",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
  },
  {
    reqDate: "Apr 10, 2025",
    name: "Johan Smith",
    id: "#T-0558",
    fromProperty: "Pine Ridge",
    fromPropertyImage: "/placeholder-avatar.png",
    fromPropertyAddress: "123 Main St, Anytown, USA",
    toProperty: "Sunset Beach",
    toPropertyImage: "/placeholder-avatar.png",
    toPropertyAddress: "123 Main St, Anytown, USA",
    status: "Rejected",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
  },
];

export default function Booking() {
  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  // const [propertyDate, setPropertyDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const tenantColumns: Column<BookingData>[] = [
    {
      header: "Name",
      accessor: "name" as keyof BookingData,
      render: (value: string, row: BookingData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={value}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">{row.phone}</div>
          </div>
        </div>
      ),
    },
    { header: "Request ID", accessor: "id" as keyof BookingData },
    {
      header: "From Property",
      accessor: "fromProperty" as keyof BookingData,
      render: (value: string, row: BookingData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.fromPropertyImage}
            alt={value}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">
              {row.fromPropertyAddress}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "To Property",
      accessor: "toProperty" as keyof BookingData,
      render: (value: string, row: BookingData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.toPropertyImage}
            alt={value}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">{row.toPropertyAddress}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status" as keyof BookingData,
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "action" as keyof BookingData,
      render: (value: string, row: BookingData) => (
        <TenantRequestDetails reqId={row.id} />
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">Transfer Requests</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput
                value={propertySearch}
                onChange={setPropertySearch}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={propertyStatus}
                onChange={setPropertyStatus}
                options={["In Review", "Approved", "Rejected"]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              {/* <DatePicker value={propertyDate} onChange={setPropertyDate} /> */}

              <SelectDropDown
                value={propertyType}
                onChange={setPropertyType}
                options={["Property", "Room"]}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={tenantColumns} data={bookingData} />
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={bookingData.length}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
}
