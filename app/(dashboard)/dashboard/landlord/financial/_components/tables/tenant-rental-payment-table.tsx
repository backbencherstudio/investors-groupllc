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
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import TenantRequestDetails from "../../../request/_components/others/tenant-request-details";

interface RentPaymentData {
  paidDate: string;
  payment: string;
  recipient: string;
  id: string;
  property: string;
  propertyImage: string;
  propertyAddress: string;
  amount: string;
  dueDate: string;
  status: string;
  action: string;
  avatar: string;
}

const rentPaymentData: RentPaymentData[] = [
  {
    paidDate: "10/28/25",
    payment: "Success",
    recipient: "Kathryn Murphy",
    id: "RP-3021",
    property: "Trade Winds Townhouses",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "123 Main St, Anytown, USA",
    amount: "$16,920",
    dueDate: "April 5",
    status: "Paid",
    action: "View",
    avatar: "/placeholder-avatar.png",
  },
  {
    paidDate: "-",
    payment: "-",
    recipient: "Guy Hawkins",
    id: "RP-3025",
    property: "Skylight Square Apartments",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "123 Main St, Anytown, USA",
    amount: "$2,200",
    dueDate: "April 5",
    status: "Due",
    action: "View",
    avatar: "/placeholder-avatar.png",
  },
  {
    paidDate: "7/11/25",
    payment: "Pending",
    recipient: "Jerome Bell",
    id: "RP-3039",
    property: "Prominence Park Residences",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "123 Main St, Anytown, USA",
    amount: "$16,920",
    dueDate: "April 5",
    status: "Due",
    action: "View",
    avatar: "/placeholder-avatar.png",
  },
  // Add more rows as needed
];

export default function RentPayment() {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(rentPaymentData.length / itemsPerPage);

  const rentPaymentColumns: Column<RentPaymentData>[] = [
    { header: "Paid Date", accessor: "paidDate" as keyof RentPaymentData },
    {
      header: "Payment",
      accessor: "payment" as keyof RentPaymentData,
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Recipient",
      accessor: "recipient" as keyof RentPaymentData,
      render: (value: string, row: RentPaymentData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={value}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>{value}</div>
        </div>
      ),
    },
    { header: "ID", accessor: "id" as keyof RentPaymentData },
    {
      header: "Property",
      accessor: "property" as keyof RentPaymentData,
      render: (value: string, row: RentPaymentData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.propertyImage}
            alt={value}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">{row.propertyAddress}</div>
          </div>
        </div>
      ),
    },

    { header: "Amount", accessor: "amount" as keyof RentPaymentData },
    { header: "Due Date", accessor: "dueDate" as keyof RentPaymentData },
    {
      header: "Status",
      accessor: "status" as keyof RentPaymentData,
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "action",
      render: (value: string | undefined, row: RentPaymentData) => (
        <TenantRequestDetails reqId={row.id} />
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center ">
          <h2 className="text-2xl font-semibold">Tenant Rent Payment</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={paymentSearch} onChange={setPaymentSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={paymentStatus}
                onChange={setPaymentStatus}
                options={["Paid", "Due", "Pending"]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <DatePicker value={paymentDate} onChange={setPaymentDate} />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable
            columns={rentPaymentColumns}
            data={rentPaymentData}
          />
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={rentPaymentData.length}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
}
