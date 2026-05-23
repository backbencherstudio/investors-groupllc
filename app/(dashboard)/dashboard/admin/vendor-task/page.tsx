// page.tsx (or VendorTask.tsx)
"use client";

import React, { useState, useCallback } from "react";
import { useGetVendorTasksQuery } from "@/redux/features/vendor-task/vendorTaskApi";
import { TaskStatsCards } from "./_components/StatsCard";
import TaskFilters from "./_components/TaskFilters";
import TaskTable from "./_components/TaskTable";
import AssignVendorModal from "./_components/AssignVendorModal";
import { TablePagination } from "@/components/common/TablePagination";
import { StatsCardsSkeleton } from "@/components/common/Loader";
import { useTablePagination } from "@/hooks/table/useTablePagination";

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
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { currentPage, setCurrentPage, itemsPerPage } = useTablePagination();
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
  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);

  const handleViewTask = useCallback((taskId: string) => {
    console.log("View task:", taskId);
    // Navigate to task details or open modal
  }, []);

  const handleAssignVendor = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
  }, []);

  const handleCloseAssignModal = useCallback(() => {
    setSelectedTaskId(null);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <StatsCardsSkeleton />
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

        <TaskTable data={requestData} onViewTask={handleViewTask}
          onAssignVendor={handleAssignVendor}
        />

        <div className="mt-6">
          {requestData.length > 0 && (
            <TablePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalResults={pagination?.total || requestData.length}

            />
          )}
        </div>

        {requestData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}

        {selectedTask && (
          <AssignVendorModal
            key={selectedTask.taskId}
            isOpen={Boolean(selectedTask)}
            onClose={handleCloseAssignModal}
            taskId={selectedTask.taskId}
            taskTitle={selectedTask.issue.title}
            currentAssignee={selectedTask.assignee?.id}
            onAssignSuccess={handleCloseAssignModal}
          />
        )}
      </div>
    </div>
  );
}