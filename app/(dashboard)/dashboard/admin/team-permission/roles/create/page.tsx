"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { RoleForm } from '../_components/RoleForm';
import { useGetPermissionsQuery, useCreateRoleMutation } from '@/redux/features/team-permission/TeamPermissionApi';

export default function CreateRolePage() {
  const router = useRouter();
  const { data: permissionsData, isLoading: permissionsLoading } = useGetPermissionsQuery();
  const [createRole, { isLoading: creating }] = useCreateRoleMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createRole(data).unwrap();
      router.push('/dashboard/team-permission/roles');
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };

  if (permissionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">Loading permissions...</p>
      </div>
    );
  }

  const { modules } = permissionsData || { modules: [] };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create New Role</h1>
          <p className="text-sm text-gray-500 mt-1">Define a new role and assign permissions</p>
        </div>
      </div>

      {/* Form */}
      <RoleForm
        modules={modules}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isLoading={creating}
      />
    </div>
  );
}