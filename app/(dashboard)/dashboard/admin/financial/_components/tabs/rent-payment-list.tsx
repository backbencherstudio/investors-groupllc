"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState, useEffect, useMemo } from "react";
import { DashboardDataTable, Column } from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import { useGetRentPaymentsQuery } from "@/redux/features/dashboard/dashboardApi";
import type {
    RentPaymentItem,
    RentPaymentsQueryParams,
} from "@/redux/features/dashboard/dashboardTypes";


// Transform API data to match table format
interface TenantData {
    id: string;
    displayId: string;
    paidDate: string;
    paymentStatus: string;
    recipient: string;
    recipientId: string;
    recipientPhone: string;
    recipientAvatar: string | null;
    property: string;
    propertyAddress: string;
    propertyImage: string;
    amount: string;
    dueDate: string;
    status: string;
    transactionId: string;
    transactionGateway: string;
    transactionStatus: string;
}

export default function TenantTable() {
    const [tenantStatus, setTenantStatus] = useState("");
    const [tenantSearch, setTenantSearch] = useState("");
    const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Build query params
    const queryParams = useMemo<RentPaymentsQueryParams>(() => ({
        page: currentPage,
        limit: itemsPerPage,
        search: tenantSearch,
        status: tenantStatus,
        dateFrom: tenantDate ? tenantDate.toISOString() : "",
        dateTo: "",
    }), [tenantStatus, tenantSearch, tenantDate, currentPage, itemsPerPage]);

    const { data: apiResponse, isLoading, isError, error } =
        useGetRentPaymentsQuery(queryParams);

    // Transform API data to table format
    const tenantData = useMemo(() => {
        if (!apiResponse?.data?.items) return [];

        return apiResponse.data.items.map((item: RentPaymentItem): TenantData => ({
            id: item.id,
            displayId: item.displayId,
            paidDate: item.paidDate ? new Date(item.paidDate).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
            }) : '-',
            paymentStatus: item.paymentStatus,
            recipient: item.recipient.name,
            recipientId: item.recipient.id,
            recipientPhone: item.recipient.phone,
            recipientAvatar: item.recipient.avatar,
            property: item.property.name,
            propertyAddress: item.property.address,
            propertyImage: item.property.imageUrl,
            amount: `$${item.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`,
            dueDate: new Date(item.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }),
            status: item.status,
            transactionId: item.transaction.id,
            transactionGateway: item.transaction.gateway,
            transactionStatus: item.transaction.status,
        }));
    }, [apiResponse]);

    const totalItems = apiResponse?.data?.pagination?.total || 0;
    const totalPages = apiResponse?.data?.pagination?.totalPages || 1;

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [tenantStatus, tenantSearch, tenantDate]);

    const tenantColumns: Column<TenantData>[] = [
        { header: "Paid Date", accessor: "paidDate" },
        {
            header: "Payment",
            accessor: "paymentStatus",
            render: (value) => <StatusBadge status={value ?? ""} />,
        },
        {
            header: "Recipient",
            accessor: "recipient",
            render: (value, row: TenantData) => (
                <div className="flex items-center gap-2">
                    {row.recipientAvatar && (
                        <Image
                            src={row.recipientAvatar}
                            alt={value ?? ""} width={32}
                            height={32}
                            className="rounded-full object-cover"
                        />
                    )}
                    <div>
                        <div className="font-semibold">{value}</div>
                        {row.recipientPhone && (
                            <div className="text-xs text-gray-500">{row.recipientPhone}</div>
                        )}
                    </div>
                </div>
            ),
        },
        { header: "ID", accessor: "displayId" },
        {
            header: "Property",
            accessor: "property",
            render: (value, row: TenantData) => (<div>
                <div className="font-medium">{value}</div>
                {row.propertyAddress && (
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">
                        {row.propertyAddress}
                    </div>
                )}
            </div>
            ),
        },
        {
            header: "Amount",
            accessor: "amount",
            render: (value) => (
                <span className="font-medium">{value}</span>
            )
        },
        { header: "Due date", accessor: "dueDate" },
        {
            header: "Status",
            accessor: "status",
            render: (value) => <StatusBadge status={value ?? ""} />,
        },
        {
            header: "Action",
            accessor: "id",
            render: (_value, row: TenantData) => (<button
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={() => console.log("View tenant:", row.id)}
            >
                <EyeIcon className="w-5 h-5" />
            </button>
            ),
        },
    ];

    // Loading state
    if (isLoading) {
        return (
            <Card className="w-full overflow-hidden p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </Card>
        );
    }

    // Error state
    if (isError) {
        return (
            <Card className="w-full overflow-hidden p-6">
                <div className="text-center text-red-500 py-8">
                    <p>Failed to load tenant payments</p>
                    <p className="text-sm text-gray-500 mt-2">
                        {error instanceof Error ? error.message : "Please try again later"}
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="">
            <Card className="w-full overflow-hidden p-6">
                <div className="">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                        <h2 className="text-2xl font-semibold">Tenant Rent Payment</h2>
                        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                            <div className="w-full md:w-auto">
                                <SearchInput
                                    value={tenantSearch}
                                    onChange={setTenantSearch}
                                    placeholder="Search tenants..."
                                />
                            </div>
                            <div className="w-[47.5%] md:w-auto">
                                <SelectDropDown
                                    value={tenantStatus}
                                    onChange={setTenantStatus}
                                    options={[
                                        { label: "All Status", value: "" },
                                        { label: "Paid", value: "Paid" },
                                        { label: "Due", value: "Due" },
                                        { label: "Overdue", value: "Overdue" },
                                        { label: "Pending", value: "Pending" },
                                    ]}
                                />
                            </div>
                            <div className="w-[47.5%] md:w-auto">
                                <DatePicker value={tenantDate} onChange={setTenantDate} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden mb-6">
                        <DashboardDataTable
                            columns={tenantColumns}
                            data={tenantData}
                        />
                    </div>

                    {/* Pagination */}
                    <TablePagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        totalResults={totalItems}
                        pageSize={itemsPerPage}
                    />
                </div>
            </Card>
        </div>
    );
}