import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  Column,
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
// import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
// import { RentPaymentDetails } from "../../../user-manage/tenant/paid-history/_components/rent-payment-details";
import TenantRequestDetails from "../others/tenant-request-details";

interface BookingData {
  reqDate: string;
  name: string;
  id: string;
  property: string;
  amount: string;
  method: string;
  status: string;
  action: string;
  avatar: string;
  phone: string;
  propertyAddress: string;
}

const bookingData: BookingData[] = [
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#R-00123",
    property: "Murphy House",
    amount: "$300",
    method: "Bank Transfer",
    status: "Approved",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
    propertyAddress: "4140 Parker Rd. Allentown",
  },
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#R-00124",
    property: "Murphy House",
    amount: "$450",
    method: "Credit",
    status: "In Review",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
    propertyAddress: "4140 Parker Rd. Allentown",
  },
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#R-00126",
    property: "Murphy House",
    amount: "$450",
    method: "Credit",
    status: "Rejected",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
    propertyAddress: "4140 Parker Rd. Allentown",
  },
  // Additional data rows as needed...
];

export default function Booking() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const tenantColumns: Column<BookingData>[] = [
    { header: "Req date", accessor: "reqDate" as keyof BookingData },
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
      header: "Property Info",
      accessor: "property" as keyof BookingData,
      render: (value: string | undefined, row: BookingData) => (
        <div>
          <div className="font-semibold">{value}</div>
          {row.propertyAddress && (
            <div className="text-xs text-gray-500">{row.propertyAddress}</div>
          )}
        </div>
      ),
    },
    { header: "Amount", accessor: "amount" as keyof BookingData },
    { header: "Method", accessor: "method" as keyof BookingData },
    {
      header: "Status",
      accessor: "status" as keyof BookingData,
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    // {
    //   header: "Action",
    //   accessor: "action" as keyof BookingData,
    //   render: () => (
    //     <button className="text-gray-600 hover:text-primary">
    //       <EyeIcon />
    //     </button>
    //   ),
    // },
    {
      header: "Action",
      accessor: "action",
      render: (value: string | undefined, row: BookingData) => (
        <TenantRequestDetails reqId={row.id} />
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center ">
          <h2 className="text-2xl font-semibold">Investor Transaction</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={tenantSearch} onChange={setTenantSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={tenantStatus}
                onChange={setTenantStatus}
                options={["Approved", "In Review", "Rejected"]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <DatePicker value={tenantDate} onChange={setTenantDate} />
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
