"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoleTable } from './_components/RoleTable';
import { DeleteConfirmationModal } from './_components/DeleteConfirmationModal';
import { useGetRolesQuery, useDeleteRoleMutation } from '@/redux/features/team-permission/TeamPermissionApi';

export default function RolesPage() {
  const router = useRouter();
  const { data: roles, isLoading, refetch } = useGetRolesQuery({});
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    roleId: '',
    roleName: '',
  });

  const handleEdit = (id: string) => {
    router.push(`/dashboard/team-permission/roles/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    const role = roles?.find(r => r.id === id);
    if (role) {
      setDeleteModal({
        isOpen: true,
        roleId: id,
        roleName: role.title,
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRole(deleteModal.roleId).unwrap();
      setDeleteModal({ isOpen: false, roleId: '', roleName: '' });
      refetch();
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Team Roles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage roles and permissions for your team members</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/admin/team-permission/roles/create')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          <span className="text-lg">➕</span>
          Create Role
        </button>
      </div>

      {/* Table */}
      <RoleTable
        roles={roles || []}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        roleName={deleteModal.roleName}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, roleId: '', roleName: '' })}
        isLoading={isDeleting}
      />
    </div>
  );
}