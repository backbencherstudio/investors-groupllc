// UserTable.tsx
"use client";
import {
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import { Card } from "@/components/ui/card";
import React, { useMemo, useEffect } from "react";
import { useGetAllUsersQuery } from "@/redux/features/user/UserApi";
import { TableSkeleton } from "@/components/common/Loader";
import { useTableSearch } from "@/hooks/table/useTableSearch";
import { useTableFilters } from "@/hooks/table/useTableFilters";
import { useTablePagination } from "@/hooks/table/useTablePagination";
import { getUserColumns, UserTableData } from "./userTableCol";
import { UserRole } from "@/redux/features/user/UserTypes";

interface UserTableProps {
  userType: UserRole;
  title?: string;
}

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Pending", value: "PENDING" },
];

// Transform API data to table data
function transformToTableData(users: any[]): UserTableData[] {
  return users.map((user) => ({
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    role: user.role,
    contact: user.contact,
    email: user.email,
    status: user.status || user.rentStatus,


    // Tenant specific
    leaseStart: user.leaseStart,
    leaseEnd: user.leaseEnd,
    propertyName: user.propertyName,
    propertyImage: user.propertyImage,
    propertyAddress: user.propertyAddress,
    
    // Investor specific
    investCount: user.investCount,
    totalInvested: user.totalInvested,
    profit: user.profit,
    roiPercent: user.roiPercent,
    investmentStatus: user.investmentStatus,
    // Landlord specific
    propertyCount: user.propertyCount,
    unitCount: user.unitCount,
    // Vendor specific
    vendorType: user.vendorType,
    serviceCount: user.serviceCount,
    
  }));
}

// {
//     "id": "cmnl61jzj000am0lc8qa6tp7m",
//     "avatar": null,
//     "name": "Fahim",
//     "role": "Tenant",
//     "email": "dev4@gmail.com",
//     "contact": "+18974564654",
//     "propertyImage": null,
//     "propertyName": null,
//     "propertyAddress": null,
//     "rentStatus": "Inactive"
// },

export function UserTable({ userType, title }: UserTableProps) {
  const { search, setSearch } = useTableSearch();
  
  const { filters, setFilter } = useTableFilters<{
    search?: string;
    status?: string;
  }>();
  
  const { currentPage, setCurrentPage, itemsPerPage } = useTablePagination();

  const { data: apiData, isLoading, isError } = useGetAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: search || undefined,
    type: userType,
    status: filters.status || undefined,
  });

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters.status, setCurrentPage]);

  const tableData = useMemo(() => {
    if (!apiData?.items?.length) return [];
    return transformToTableData(apiData.items);
  }, [apiData]);

  const columns = useMemo(() => getUserColumns(userType), [userType]);
  const pagination = apiData?.pagination;

  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden ">
        <div className="px-6">
          <div className="flex justify-center items-center h-64">
            <TableSkeleton rows={5} columns={6} />
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex justify-center items-center h-64 text-red-400">
            Failed to load {userType.toLowerCase()} users. Please try again.
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden ">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">
            {title || `${userType.charAt(0) + userType.slice(1).toLowerCase()}s`}
          </h2>

          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-64">
              <SearchInput 
                value={search} 
                onChange={setSearch}
                placeholder="Search by name or contact..."
              />
            </div>

            <div className="w-full md:w-36">
              <SelectDropDown
                value={filters.status || ""}
                onChange={(val) => setFilter("status", val || undefined)}
                options={STATUS_OPTIONS}
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <DashboardDataTable 
            columns={columns} 
            data={tableData}
          />
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6">
            <TablePagination
              pagination={{
                ...pagination,
                total: pagination.total,
                totalPages: pagination.totalPages,
              }}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </Card>
  );
}