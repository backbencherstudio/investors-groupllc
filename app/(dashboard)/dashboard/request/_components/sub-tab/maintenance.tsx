import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
// import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import TenantRequestDetails from "../others/tenant-request-details";
import Image from "next/image";

interface MaintenanceData {
  reqDate: string;
  name: string;
  id: string;
  maintenanceId: string;
  issueType: string;
  property: string;
  status: string;
  action: string;
  avatar: string;
  phone: string;
  propertyAddress: string;
  requestId: string;
}

const maintenanceData: MaintenanceData[] = [
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#M-00123",
    maintenanceId: "#M-00123",
    issueType: "Plumbing",
    property: "Murphy House",
    status: "Pending",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
    propertyAddress: "4140 Parker Rd. Allentown",
    requestId: "#R-00123",
  },
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#M-00124",
    maintenanceId: "#M-00124",
    issueType: "Plumbing",
    property: "Murphy House",
    status: "Assigned",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
    propertyAddress: "4140 Parker Rd. Allentown",
    requestId: "#R-00124",
  },
  {
    reqDate: "Apr 10, 2025",
    name: "Audry hawq",
    id: "#M-00125",
    maintenanceId: "#M-00125",
    issueType: "Plumbing",
    property: "Murphy House",
    status: "Assigned",
    action: "View",
    avatar: "/placeholder-avatar.png",
    phone: "+231 06-758207...",
    propertyAddress: "4140 Parker Rd. Allentown",
    requestId: "#R-00125",
  },
];

export default function MaintenanceRequests() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(maintenanceData.length / itemsPerPage);

  const tenantColumns: Column<MaintenanceData>[] = [
    {
        header: "Request ID",
        accessor: "name" as keyof MaintenanceData,
        render: (value: string, row: MaintenanceData) => (
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
              <div className="text-xs text-gray-500">{row.requestId}</div>
            </div>
          </div>
        ),
      },
    {
      header: "Maintenance ID",
      accessor: "maintenanceId" as keyof MaintenanceData,
    },
    { header: "Issue Type", accessor: "issueType" as keyof MaintenanceData },
    {
      header: "Property Info",
      accessor: "property" as keyof MaintenanceData,
      render: (value: string | undefined, row: MaintenanceData) => (
        <div>
          <div className="font-semibold">{value}</div>
          {row.propertyAddress && (
            <div className="text-xs text-gray-500">{row.propertyAddress}</div>
          )}
        </div>
      ),
    },
    { header: "Req Date", accessor: "reqDate" as keyof MaintenanceData },
    {
      header: "Status",
      accessor: "status" as keyof MaintenanceData,
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "action" as keyof MaintenanceData,
      render: (value: string | undefined, row: MaintenanceData) => (
        <TenantRequestDetails reqId={row.id} />
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">Maintenance Requests</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={tenantSearch} onChange={setTenantSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={tenantStatus}
                onChange={setTenantStatus}
                options={["Pending", "Assigned", "Completed"]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <DatePicker value={tenantDate} onChange={setTenantDate} />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={tenantColumns} data={maintenanceData} />
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={maintenanceData.length}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
}
