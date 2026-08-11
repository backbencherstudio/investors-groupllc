"use client";

import { useState } from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import DatePicker from "@/components/common/DatePicker";
import StatusBadge from "@/components/common/StatusBadges";
import { TablePagination } from "@/components/common/TablePagination";
import {
    DashboardDataTable,
    Column,
} from "@/components/common/DashboardDataTable";

import { useGetApartmentRequestsQuery } from "@/redux/features/request/RequestApi";
import { ApartmentRequestItem } from "@/redux/features/request/RequestTypes";
import ApartmentRequestDetails from "./ApartmentRequestDetails";

// You'll need to create this component

export default function ApartmentRequest() {
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const { data, isLoading, isFetching } = useGetApartmentRequestsQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: search,
        status: status,
        // date: date, // Uncomment if your API supports date filtering
    });

    console.log("Apartment requests data:", data);

    const apartmentColumns: Column<ApartmentRequestItem>[] = [
        {
            header: "Request ID",
            accessor: "requestId",
            render: (_, row) => (
                <div className="flex items-center gap-2 shrink-0">
                    <Image
                        src={row.requester.avatar || "/placeholder-avatar.png"}
                        alt={row.requester.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div>
                        <div className="font-semibold">{row.requester.name}</div>
                        <div className="text-xs text-gray-500">{row.requestId}</div>
                    </div>
                </div>
            ),
        },
        {
            header: "Tour Type",
            accessor: "tourTypeLabel",
            render: (value: any) => (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {value}
                </span>
            ),
        },
        {
            header: "Property Info",
            accessor: "property",
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    {row.property.imageUrl ? (
                        <Image
                            src={row.property.imageUrl}
                            alt={row.property.name}
                            width={32}
                            height={32}
                            className="rounded-md object-cover w-8 h-8"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gray-500">No img</span>
                        </div>
                    )}
                    <div>
                        <div className="font-semibold">{row.property.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[150px]">
                            {row.property.address}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            header: "Unit",
            accessor: "unit",
            render: (_, row) => (
                <span className="font-medium text-gray-700">
                    {row.unit.unitNumber}
                </span>
            ),
        },
        {
            header: "Tour Date",
            accessor: "tourDate",
            render: (value: any, row) => (
                <div>
                    <div className="font-medium">
                        {new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </div>
                    <div className="text-xs text-gray-500">{row.tourTime}</div>
                </div>
            ),
        },
        {
            header: "Requested At",
            accessor: "requestedAt",
            render: (value: any) =>
                new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
        },
        {
            header: "Status",
            accessor: "status",
            render: (value: any) => <StatusBadge status={value} />,
        },

        {
            header: "Action",
            accessor: "id",
            render: (_, row) => <ApartmentRequestDetails reqId={row.id} />,
        },
    ];

    if (isLoading || isFetching) {
        return (
            <Card className="p-6">
                <div className="text-center py-10">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-gray-500">Loading apartment requests...</p>
                </div>
            </Card>
        );
    }

    return (
        <div>
            <Card className="w-full overflow-hidden p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <h2 className="text-2xl font-semibold">Apartment Requests</h2>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full md:w-auto">
                            <SearchInput
                                value={search}
                                onChange={setSearch}
                                placeholder="Search requests..."
                            />
                        </div>

                        <div className="w-[47.5%] md:w-auto">
                            <SelectDropDown
                                value={status}
                                onChange={setStatus}
                                options={[
                                    { label: "All Status", value: "" },
                                    { label: "Pending", value: "pending" },
                                    { label: "Approved", value: "approved" },
                                    { label: "Rejected", value: "rejected" },
                                    { label: "Canceled", value: "canceled" },
                                ]}
                            />
                        </div>

                        <div className="w-[47.5%] md:w-auto">
                            <DatePicker
                                value={date}
                                onChange={setDate}
                                placeholderText="Filter by date"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-hidden mt-6">
                    {data?.items && data.items.length > 0 ? (
                        <DashboardDataTable
                            columns={apartmentColumns}
                            data={data.items}
                        />
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg">No apartment requests found</p>
                            <p className="text-sm">Try adjusting your filters</p>
                        </div>
                    )}
                </div>

                {data?.pagination && data.pagination.total > 0 && (
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={data.pagination.totalPages ?? 1}
                        totalResults={data.pagination.total ?? 0}
                        pageSize={itemsPerPage}
                        onPageChange={setCurrentPage}
                    // showPageSizeOptions={true}
                    // pageSizeOptions={[5, 10, 20, 50]}
                    />
                )}
            </Card>
        </div>
    );
}