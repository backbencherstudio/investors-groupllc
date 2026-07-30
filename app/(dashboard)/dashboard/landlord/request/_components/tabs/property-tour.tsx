import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import TenantRequestDetails from "../others/tenant-request-details";
import Image from "next/image";
import {
  useGetPropertyTourQuery,
  useGetSinglePropertyTourQuery,
} from "@/redux/features/landlord/request/propertyTour";

interface PropertyTourData {
  id: string;
  reqDate: string;
  name: string;
  tourId: string;
  property: string;
  status: string;
  action: string;
  avatar: string;
  propertyAddress: string;
  requestId: string;
  tourDate: string;
  tourTime: string;
  tourType: string;
  description: string | null;
  virtualMeetingLink: string | null;
  user: {
    id: string;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    type: string;
    avatar_url: string;
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

export default function PropertyTour() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  const { data: singleProperty } =
    useGetSinglePropertyTourQuery(selectedPropertyId);

  const itemsPerPage = 5;

  const { data } = useGetPropertyTourQuery({});
  const tours: any[] = data ?? [];

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

  const getUserName = (user: PropertyTourData["user"]) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.username) return user.username;
    return "Unknown";
  };

  const propertyTourData: PropertyTourData[] = (tours || []).map(
    (tour: any, index: number) => ({
      id: tour.tour_id || `tour-${index}`,
      reqDate: formatDate(tour.tour_date),
      name: getUserName(tour.user),
      tourId: tour.tour_id,
      property: tour.apartment?.name || "N/A",
      status: capitalizeStatus(tour.status),
      action: "View",
      avatar: tour.user?.avatar_url || "/placeholder-avatar.png",
      propertyAddress: `${tour.apartment?.address || ""}, ${tour.apartment?.city || ""}, ${tour.apartment?.state || ""}`,
      requestId: tour.tour_id,
      tourDate: tour.tour_date,
      tourTime: tour.tour_time,
      tourType: tour.tourType,
      description: tour.description,
      virtualMeetingLink: tour.virtualMeetingLink,
      user: tour.user,
      apartment: tour.apartment,
    }),
  );

  const totalPages = Math.ceil(propertyTourData.length / itemsPerPage);

  const tenantColumns: Column<PropertyTourData>[] = [
    {
      header: "Request ID",
      accessor: "name" as keyof PropertyTourData,
      render: (
        value: PropertyTourData[keyof PropertyTourData],
        row: PropertyTourData,
      ) => (
        <div className="flex items-center gap-2">
          {/* <Image
            src={row?.avatar}
            alt={String(value)}
            width={32}
            height={32}
            className="rounded-full"
          /> */}
          <div>
            {/* <div className="font-semibold">{String(value)}</div> */}
            <div className="text-xs0">{row.requestId}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Tour ID",
      accessor: "tourId" as keyof PropertyTourData,
    },
    {
      header: "Property Info",
      accessor: "property" as keyof PropertyTourData,
      render: (
        value: PropertyTourData[keyof PropertyTourData],
        row: PropertyTourData,
      ) => (
        <div className="flex items-center gap-2">
          <Image
            src={row?.apartment?.first_image_url}
            alt={"image"}
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
    { header: "Req Date", accessor: "reqDate" as keyof PropertyTourData },
    {
      header: "Status",
      accessor: "status" as keyof PropertyTourData,
      render: (value: PropertyTourData[keyof PropertyTourData]) => (
        <StatusBadge status={String(value || "")} />
      ),
    },
    {
      header: "Action",
      accessor: "action" as keyof PropertyTourData,
      render: (
        value: PropertyTourData[keyof PropertyTourData],
        row: PropertyTourData,
      ) => (
        <TenantRequestDetails
          data={singleProperty}
          onOpen={() => setSelectedPropertyId(row.requestId)}
        />
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="text-2xl font-semibold">Property Tour Requests</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={tenantSearch} onChange={setTenantSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={tenantStatus}
                onChange={setTenantStatus}
                options={[
                  { label: "Pending", value: "Pending" },
                  { label: "Assigned", value: "Assigned" },
                  { label: "Completed", value: "Completed" },
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
          <DashboardDataTable columns={tenantColumns} data={propertyTourData} />
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={propertyTourData.length}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
}
