"use client";
import { useState } from "react";
import {
  Column,
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import { useDeleteTeamMemberMutation, useGetTeamMembersQuery } from "@/redux/features/team-permission/TeamPermissionApi";
import type { TeamMember } from "@/redux/features/team-permission/TeamPermissionTypes";
import { format } from "date-fns";
import { toast } from "sonner";
import AddTeamMemberModal from "./add-team-modal";

export default function TeamTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetTeamMembersQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm,
  });

  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteTeamMember(id).unwrap();
      toast.success(`Successfully deleted "${name}"`);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete team member");
    }
  };

  const handleEdit = (row: TeamMember) => {
    setEditingMember(row);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingMember(null);
    refetch();
  };

  const TeamTableCol: Column<TeamMember>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "font-semibold",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
            {row.firstName?.charAt(0)}{row.lastName?.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-xs text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      render: (value) => <span className="text-gray-600">{value as string}</span>,
    },
    {
      header: "Role",
      accessor: "role",
      render: (value) => (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
          {(value as { label: string })?.label}
        </span>
      ),
    },
    {
      header: "Joined",
      accessor: "createdAt",
      render: (value) => (
        <span className="text-sm text-gray-500">
          {format(new Date(value as string), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            disabled={isDeleting}
            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit member"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(row.id, row.name)}
            disabled={isDeleting}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete member"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600">
          Error loading team members: {(error as any)?.message || "Unknown error"}
        </div>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {data?.items?.length || 0} of {data?.pagination?.total || 0} members
        </div>
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
        />
      </div>
      <DashboardDataTable
        columns={TeamTableCol}
        data={data?.items || []}
      />
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {data.pagination.totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(data.pagination.totalPages, p + 1))}
            disabled={currentPage === data.pagination.totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <AddTeamMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMember(null);
        }}
        onSuccess={handleEditSuccess}
        editData={editingMember || undefined}
        mode="edit"
      />
    </div>
  );
}