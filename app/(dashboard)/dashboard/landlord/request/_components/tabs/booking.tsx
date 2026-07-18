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
import TenantRequestDetails from "../others/tenant-request-details";
import {
  useGetBookingQuery,
  useGetSingleBookingQuery,
} from "@/redux/features/landlord/request/booking";

interface BookingData {
  reqDate: string;
  name: string;
  id: string;
  requestId: string;
  property: string;
  amount: string;
  method: string;
  status: string;
  action: string;
  avatar: string;
  phone: string;
  propertyAddress: string;
}

interface BookingApiData {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tenant: {
    id: string;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    type: string;
    avatar_url: string | null;
  };
  apartment: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    first_image_url: string;
  };
}

export default function Booking() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const itemsPerPage = 5;
  const { data } = useGetBookingQuery({});
  const bookings: BookingApiData[] = data ?? [];
  const { data: singleBooking } = useGetSingleBookingQuery(
    selectedBookingId ?? "",
    {
      skip: !selectedBookingId,
    },
  );

  console.log(singleBooking);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const capitalizeStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getUserName = (user: BookingApiData["tenant"]) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.username) return user.username;
    return "Unknown";
  };

  const bookingData: BookingData[] = (bookings || []).map(
    (booking: BookingApiData) => ({
      reqDate: formatDate(booking.createdAt),
      name: getUserName(booking.tenant),
      id: `#${booking.id.slice(0, 7).toUpperCase()}`,
      requestId: booking.id,
      property: booking.apartment?.name || "N/A",
      amount: "",
      method: "",
      status: capitalizeStatus(booking.status),
      action: "View",
      avatar: booking.tenant?.avatar_url || "/placeholder-avatar.png",
      phone: "",
      propertyAddress: `${booking.apartment?.address || ""}, ${booking.apartment?.city || ""}, ${booking.apartment?.state || ""}`,
    }),
  );

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
    // { header: "Amount", accessor: "amount" as keyof BookingData },
    // { header: "Method", accessor: "method" as keyof BookingData },
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
        <TenantRequestDetails
          data={singleBooking}
          onOpen={() => setSelectedBookingId(row.requestId)}
        />
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
                options={[
                  { label: "Approved", value: "Approved" },
                  { label: "In Review", value: "In Review" },
                  { label: "Rejected", value: "Rejected" },
                ]}
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
