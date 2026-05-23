// VendorTask.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useGetVendorTasksQuery } from "@/redux/features/vendor-task/vendorTaskApi";

import TaskFilters from "./TaskFilters";
import TaskTable from "@/app/(dashboard)/dashboard/admin/vendor-task/_components/TaskTable";
import { TablePagination } from "@/components/common/TablePagination";
import { TaskStatsCards } from "./StatsCard";

interface TaskItem {
    taskId: string;
    requestId: string;
    issue: {
        title: string;
        priority: string;
    };
    requestedDate: string;
    status: string;
    statusRaw: string;
    requester: {
        id: string;
        name: string;
        role: string;
        email: string;
        avatar: string;
    };
    assignee: {
        id: string;
        name: string;
        role: string;
        email: string;
        avatar: string;
    } | null;
    property: {
        id: string;
        name: string;
        address: string;
        imageUrl: string;
    };
}

// Transform API data to table-friendly format
const transformTaskToTableData = (task: TaskItem) => ({
    id: task.taskId,
    name: task.requester.name,
    nameAvatar: task.requester.avatar,
    nameRole: task.requester.role,
    requestId: task.requestId,
    assignTo: task.assignee?.name || "Unassigned",
    assignToAvatar: task.assignee?.avatar || "/default-avatar.png",
    assignToRole: task.assignee?.role || "N/A",
    issue: task.issue.title,
    issueType: task.issue.priority,
    propertyName: task?.property?.name || "N/A",
    propertyImage: task?.property?.imageUrl || "/default-property.png",
    propertyAddress: task?.property?.address || "N/A",
    reqDate: new Date(task?.requestedDate).toLocaleDateString() || "N/A",
    status: task.status,
    statusRaw: task.statusRaw,
});

export default function VendorTask() {
    const [propertyStatus, setPropertyStatus] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [propertySearch, setPropertySearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data, isLoading, error } = useGetVendorTasksQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: propertySearch || undefined,
        status: propertyStatus || undefined,
        priority: propertyType || undefined,
    });

    const tasks = data?.items || [];
    const stats = data?.stats;
    const pagination = data?.pagination;

    const requestData = tasks.map(transformTaskToTableData);
    const totalPages = pagination?.totalPages || 1;

    const handleViewTask = useCallback((taskId: string) => {
        console.log("View task:", taskId);
        // Navigate to task details or open modal
    }, []);

    const handleAssingnVendor = useCallback((taskId: string) => {
        console.log("Assign vendor:", taskId);
        // Navigate to assign vendor or open modal
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
        return (
            <div className="p-6">
                {/* <StatsCards isLoading /> */}
                <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-neutral-500">Loading tasks...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg shadow-md">
                    <div className="text-red-500 text-center">
                        <p className="text-lg font-semibold mb-2">Error loading tasks</p>
                        <p>Please try again later or contact support.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <TaskStatsCards stats={stats} />

            <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-semibold">Task List</h2>
                    <TaskFilters
                        search={propertySearch}
                        onSearchChange={setPropertySearch}
                        status={propertyStatus}
                        onStatusChange={setPropertyStatus}
                        priority={propertyType}
                        onPriorityChange={setPropertyType}
                    />
                </div>

                <TaskTable data={requestData} onViewTask={handleViewTask} onAssignVendor={handleAssingnVendor} />

                {requestData.length > 0 && (
                    <TablePagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        totalResults={pagination?.total || requestData.length}
                        pageSize={itemsPerPage}
                    />
                )}

                {requestData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No tasks found</p>
                    </div>
                )}
            </div>
        </div>
    );
}