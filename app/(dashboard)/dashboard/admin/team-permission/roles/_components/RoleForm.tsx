"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ModulePermission, CreateRoleData } from '@/redux/features/team-permission/TeamPermissionTypes';

const EMPTY_INITIAL_DATA = {
  title: '',
  name: '',
  permissionIds: [] as string[],
};

interface IndeterminateCheckboxProps {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

function IndeterminateCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled = false,
  className,
}: IndeterminateCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={className}
    />
  );
}
interface RoleFormProps {
  initialData?: {
    title: string;
    name: string;
    permissionIds: string[];
  };
  modules: ModulePermission[];
  onSubmit: (data: CreateRoleData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

export const RoleForm: React.FC<RoleFormProps> = ({
  initialData,
  modules,
  onSubmit,
  onCancel,
  isLoading = false,
  isEdit = false,
}) => {
  const resolvedInitialData = initialData ?? EMPTY_INITIAL_DATA;

  const [formData, setFormData] = useState({
    title: resolvedInitialData.title,
    name: resolvedInitialData.name,
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    resolvedInitialData.permissionIds
  );  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.map((m) => m.key))
  );

  const initialPermissionIdsKey = resolvedInitialData.permissionIds.join(',');

  useEffect(() => {
    if (!isEdit) return;

    setFormData({
      title: resolvedInitialData.title,
      name: resolvedInitialData.name,
    });
    setSelectedPermissions(resolvedInitialData.permissionIds);
  }, [
    isEdit,
    resolvedInitialData.title,
    resolvedInitialData.name,
    initialPermissionIdsKey,
  ]);

  useEffect(() => {
    if (modules.length === 0) return;

    setExpandedModules((prev) => {
      if (prev.size > 0) return prev;
      return new Set(modules.map((m) => m.key));
    });
  }, [modules]);
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Role title is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    } else if (!/^[a-z_]+$/.test(formData.name)) {
      newErrors.name = 'Use lowercase letters and underscores only';
    }

    if (selectedPermissions.length === 0) {
      newErrors.permissions = 'Select at least one permission';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setTouched({ title: true, name: true });
      return;
    }

    onSubmit({
      title: formData.title,
      name: formData.name,
      permissionIds: selectedPermissions,
    });
  };
  const handleFieldChange = (field: 'title' | 'name', value: string) => {
    if (field === 'name') {
      value = value.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: '' }));
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const selectAllModulePermissions = (moduleKey: string) => {
    const module = modules.find((m) => m.key === moduleKey);
    if (module) {
      const permissionIds = module.scopes.map(s => s.permissionId);
      const allSelected = permissionIds.every(id => selectedPermissions.includes(id));
      
      if (allSelected) {
        setSelectedPermissions(prev => 
          prev.filter(id => !permissionIds.includes(id))
        );
      } else {
        setSelectedPermissions(prev => {
          const newSet = new Set(prev);
          permissionIds.forEach(id => newSet.add(id));
          return Array.from(newSet);
        });
      }
    }
  };

  const filteredModules = modules.filter(
    (module) =>
      module.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.scopes.some(
        (scope) =>
          scope.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scope.action.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const getPermissionCount = (moduleKey: string) => {
    const module = modules.find((m) => m.key === moduleKey);
    if (!module) return { total: 0, selected: 0 };
    const total = module.scopes.length;
    const selected = module.scopes.filter(s => 
      selectedPermissions.includes(s.permissionId)
    ).length;
    return { total, selected };
  };

  const isModuleFullySelected = (moduleKey: string) => {
    const module = modules.find((m) => m.key === moduleKey);
    if (!module) return false;
    return module.scopes.every(s => selectedPermissions.includes(s.permissionId));
  };

  const isModulePartiallySelected = (moduleKey: string) => {
    const module = modules.find((m) => m.key === moduleKey);
    if (!module) return false;
    const selected = module.scopes.filter(s => 
      selectedPermissions.includes(s.permissionId)
    ).length;
    return selected > 0 && selected < module.scopes.length;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Role' : 'Create New Role'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure role details and assign permissions
          </p>
        </div>

        {/* Basic Information */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="roleTitle" className="block text-sm font-medium text-gray-700 mb-1.5">
                Role Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="roleTitle"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="e.g., Financial Manager"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    errors.title && touched.title 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.title && touched.title && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Role Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="roleName"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="e.g., financial_manager"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    errors.name && touched.name 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300'
                  }`}
                  disabled={isLoading || isEdit}
                />
                {errors.name && touched.name && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                )}
                {!isEdit && (
                  <p className="mt-1.5 text-xs text-gray-500">
                    Lowercase letters and underscores only (e.g., financial_manager)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Permissions
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedPermissions.length} permission{selectedPermissions.length !== 1 ? 's' : ''} selected
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                />
                <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {errors.permissions && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.permissions}</p>
            </div>
          )}

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-8 px-4 py-3">
                    <span className="sr-only">Expand</span>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Module
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permission
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModules.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                      No permissions found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredModules.map((module) => {
                    const { total, selected } = getPermissionCount(module.key);
                    const isExpanded = expandedModules.has(module.key);
                    const fullySelected = isModuleFullySelected(module.key);
                    const partiallySelected = isModulePartiallySelected(module.key);

                    return (
                      <React.Fragment key={module.key}>
                        {/* Module Row */}
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => toggleModule(module.key)}
                              className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                            >
                              <svg
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <IndeterminateCheckbox
                                  checked={fullySelected}
                                  indeterminate={partiallySelected}
                                  onChange={() => selectAllModulePermissions(module.key)}
                                  disabled={isLoading}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                              </div>                              <span className="text-sm font-medium text-gray-900">{module.label}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {selected}/{total}
                              </span>
                            </div>
                          </td>
                          <td colSpan={2} className="px-4 py-3 text-sm text-gray-500">
                            {module.subject || `${total} permission${total !== 1 ? 's' : ''}`}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => toggleModule(module.key)}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              {isExpanded ? 'Hide' : 'View'}
                            </button>
                          </td>
                        </tr>

                        {/* Permission Rows */}
                        {isExpanded && module.scopes.map((scope) => (
                          <tr key={scope.permissionId} className="hover:bg-gray-50 transition-colors bg-gray-50/30">
                            <td className="px-4 py-2.5"></td>
                            <td className="px-4 py-2.5 text-sm text-gray-500 pl-12">
                              <span className="text-xs">└─</span>
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedPermissions.includes(scope.permissionId)}
                                  onChange={() => handlePermissionToggle(scope.permissionId)}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  disabled={isLoading}
                                />
                                <span className="text-sm text-gray-700">{scope.title}</span>
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {scope.action}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              {selectedPermissions.includes(scope.permissionId) && (
                                <svg className="w-4 h-4 text-indigo-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              isEdit ? 'Update Role' : 'Create Role'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};