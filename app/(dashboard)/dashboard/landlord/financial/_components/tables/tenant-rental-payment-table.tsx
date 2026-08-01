import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState, useMemo } from "react";
import {
  Column,
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import TenantRequestDetails from "../../../request/_components/others/tenant-request-details";
import { useGetRentPaymentQuery } from "@/redux/features/landlord/financial/financialApi";

// ----- Types -----

interface ApiRentPayment {
  paymentId: string;
  amount: number;
  method: string;
  status: string;
  paymentDate: string;
  monthsCovered: number;
  apartment: {
    id: string;
    name: string;
    address: string;
    image: string;
  };
  unit: {
    id: string;
    unitNumber: string;
  };
  tenant: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
  };
}

interface ApiPaginatedResponse {
  data: ApiRentPayment[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

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
  unitNumber: string;
  phone: string;
  monthsCovered: number;
  method: string;
  tenantName: string;
  tenantAvatar: string;
  tenantPhone: string;
  apartmentName: string;
  apartmentAddress: string;
  apartmentImage: string;
  paymentDate: string;
}

// ----- Helpers -----

function formatDate(isoString: string): string {
  if (!isoString) return "-";
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${day}/${year}`;
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function capitalizeStatus(status: string): string {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function getPaymentLabel(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "success" || lower === "paid") return "Success";
  if (lower === "failed" || lower === "due") return "Due";
  if (lower === "pending") return "Pending";
  return capitalizeStatus(status);
}

// ----- Component -----

export default function RentPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: apiResponse, isLoading } = useGetRentPaymentQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const response = apiResponse as ApiPaginatedResponse | undefined;
  const apiData = response?.data ?? [];
  const pagination = response?.pagination;

  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);

  // Map API data to table rows
  const tableData: RentPaymentData[] = useMemo(() => {
    return apiData.map((item: ApiRentPayment) => ({
      paidDate: formatDate(item.paymentDate),
      payment: getPaymentLabel(item.status),
      recipient: item.tenant?.name || "Unknown",
      id: item.paymentId,
      property: item.apartment?.name || "Unknown",
      propertyImage: item.apartment?.image || "/placeholder-avatar.png",
      propertyAddress: item.apartment?.address || "",
      amount: formatCurrency(item.amount),
      dueDate: `${item.monthsCovered} mo`,
      status: capitalizeStatus(item.status),
      action: "View",
      avatar: item.tenant?.avatar || "/placeholder-avatar.png",
      unitNumber: item.unit?.unitNumber || "",
      phone: item.tenant?.phone || "",
      monthsCovered: item.monthsCovered,
      method: item.method,
      tenantName: item.tenant?.name || "",
      tenantAvatar: item.tenant?.avatar || "",
      tenantPhone: item.tenant?.phone || "",
      apartmentName: item.apartment?.name || "",
      apartmentAddress: item.apartment?.address || "",
      apartmentImage: item.apartment?.image || "",
      paymentDate: item.paymentDate,
    }));
  }, [apiData]);

  // Client-side filtering (keeps existing filter UX)
  const filteredData = useMemo(() => {
    let result = tableData;

    if (paymentSearch) {
      const search = paymentSearch.toLowerCase();
      result = result.filter(
        (row) =>
          row.recipient.toLowerCase().includes(search) ||
          row.id.toLowerCase().includes(search) ||
          row.property.toLowerCase().includes(search),
      );
    }

    if (paymentStatus) {
      result = result.filter(
        (row) => row.status.toLowerCase() === paymentStatus.toLowerCase(),
      );
    }

    if (paymentDate) {
      result = result.filter((row) => {
        const rowDate = new Date(row.paymentDate);
        return (
          rowDate.getDate() === paymentDate.getDate() &&
          rowDate.getMonth() === paymentDate.getMonth() &&
          rowDate.getFullYear() === paymentDate.getFullYear()
        );
      });
    }

    return result;
  }, [tableData, paymentSearch, paymentStatus, paymentDate]);

  const totalResults = pagination?.total ?? filteredData.length;
  const totalPages =
    pagination?.totalPages ?? Math.ceil(filteredData.length / itemsPerPage);

  const rentPaymentColumns: Column<RentPaymentData>[] = [
    { header: "Paid Date", accessor: "paidDate" as keyof RentPaymentData },
    {
      header: "Payment",
      accessor: "payment" as keyof RentPaymentData,
      render: (value: string | number, row: RentPaymentData) => (
        <StatusBadge status={String(value) || ""} />
      ),
    },
    {
      header: "Recipient",
      accessor: "recipient" as keyof RentPaymentData,
      render: (value: string | number, row: RentPaymentData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={String(value)}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>{String(value)}</div>
        </div>
      ),
    },
    { header: "ID", accessor: "id" as keyof RentPaymentData },
    {
      header: "Property",
      accessor: "property" as keyof RentPaymentData,
      render: (value: string | number, row: RentPaymentData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.propertyImage}
            alt={String(value)}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{String(value)}</div>
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
      render: (value: string | number, row: RentPaymentData) => (
        <StatusBadge status={String(value) || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "action",
      render: (value: string | number, row: RentPaymentData) => (
        <TenantRequestDetails data={row} />
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Tenant Rent Payment
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 w-full md:w-auto">
            <div className="w-full sm:w-auto">
              <SearchInput value={paymentSearch} onChange={setPaymentSearch} />
            </div>
            <div className="w-full sm:w-auto">
              <SelectDropDown
                value={paymentStatus}
                onChange={setPaymentStatus}
                options={[
                  { label: "Paid", value: "Paid" },
                  { label: "Due", value: "Due" },
                  { label: "Pending", value: "Pending" },
                  { label: "Failed", value: "Failed" },
                ]}
              />
            </div>
            <div className="w-full sm:w-auto">
              <DatePicker value={paymentDate} onChange={setPaymentDate} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {/* Data Table */}
            <div className="w-full overflow-hidden">
              <DashboardDataTable
                columns={rentPaymentColumns}
                data={filteredData}
              />
            </div>

            {/* Pagination */}
            <TablePagination
              pagination={
                pagination
                  ? {
                      page: pagination.page,
                      limit: pagination.limit,
                      total: pagination.total,
                      totalPages: pagination.totalPages,
                    }
                  : undefined
              }
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalResults={totalResults}
              pageSize={itemsPerPage}
            />
          </>
        )}
      </Card>
    </div>
  );
}
