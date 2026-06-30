"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown, Plus, Mail, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamInput from "./TeamInput";
import { 
  useCreateTeamMemberMutation, 
  useUpdateTeamMemberMutation,
  useGetRolesQuery 
} from "@/redux/features/team-permission/TeamPermissionApi";
import type { 
  CreateTeamMemberData, 
  UpdateTeamMemberData,
  TeamMember 
} from "@/redux/features/team-permission/TeamPermissionTypes";
import { toast } from "sonner";

interface AddTeamMemberModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  editData?: TeamMember;
  mode?: "create" | "edit";
}

const AddTeamMemberModal = ({ 
  isOpen: controlledIsOpen,
  onClose,
  onSuccess, 
  trigger,
  editData,
  mode = "create"
}: AddTeamMemberModalProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [createTeamMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();
  const { data: rolesData, isLoading: isLoadingRoles } = useGetRolesQuery({});

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const isSubmitting = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load edit data when in edit mode
  useEffect(() => {
    if (mode === "edit" && editData) {
      setFormData({
        firstName: editData.firstName || "",
        lastName: editData.lastName || "",
        email: editData.email || "",
        password: "", // Don't pre-fill password for security
        roleId: editData.role?.id || "",
      });
    } else if (mode === "create" && isOpen) {
      // Reset form when modal opens in create mode
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: "",
      });
      setErrors({});
    }
  }, [editData, mode, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Only validate password for create mode
    if (mode === "create") {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    }

    if (!formData.roleId) {
      newErrors.roleId = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      if (mode === "edit" && editData) {
        // Update existing member
        const payload: UpdateTeamMemberData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          roleId: formData.roleId,
        };

        // Only include password if it's provided (for password change)
        if (formData.password) {
          payload.password = formData.password;
        }

        await updateTeamMember({ id: editData.id, data: payload }).unwrap();
        toast.success(`Team member updated successfully!`);
      } else {
        // Create new member
        const payload: CreateTeamMemberData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          roleId: formData.roleId,
        };

        await createTeamMember(payload).unwrap();
        toast.success(`Team member added successfully!`);
      }

      // Close modal and reset form
      handleClose();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || `Failed to ${mode === "edit" ? "update" : "add"} team member. Please try again.`);
    }
  };

  const handleClose = () => {
    if (controlledIsOpen !== undefined && onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
    setErrors({});
  };

  const handleOpen = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(true);
    }
  };

  const roles = rolesData || [];

  // If controlled by parent
  if (controlledIsOpen !== undefined) {
    if (!isOpen) return null;
  }

  return (
    <div className="">
      {/* Trigger Button */}
      {trigger && (
        <div className="max-w-md">
          <div onClick={handleOpen}>{trigger}</div>
        </div>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === "edit" ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-6">
                {mode === "edit" 
                  ? "Update the team member's information." 
                  : "Add a new team member to your organization. They'll receive access to the dashboard."}
              </p>

              <div className="space-y-4">
                {/* First and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TeamInput
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    error={errors.firstName}
                    required
                    disabled={isSubmitting}
                    icon={<User size={18} />}
                  />

                  <TeamInput
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    error={errors.lastName}
                    required
                    disabled={isSubmitting}
                    icon={<User size={18} />}
                  />
                </div>

                {/* Email */}
                <TeamInput
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  error={errors.email}
                  required
                  disabled={isSubmitting}
                  icon={<Mail size={18} />}
                />

                {/* Password - Optional in edit mode */}
                <TeamInput
                  id="password"
                  name="password"
                  label={mode === "edit" ? "New Password (optional)" : "Password"}
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={mode === "edit" ? "Enter new password (leave blank to keep current)" : "Enter password (min 8 characters)"}
                  error={errors.password}
                  required={mode === "create"}
                  disabled={isSubmitting}
                  icon={<Lock size={18} />}
                />

                {/* Role Dropdown */}
                <div>
                  <label
                    htmlFor="roleId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="roleId"
                      name="roleId"
                      value={formData.roleId}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
                        errors.roleId ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting || isLoadingRoles}
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                  {errors.roleId && (
                    <p className="mt-1 text-sm text-red-600">{errors.roleId}</p>
                  )}
                  {isLoadingRoles && (
                    <p className="mt-1 text-sm text-gray-500">Loading roles...</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#D80] hover:bg-[#d70] disabled:bg-orange-300 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-6 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {mode === "edit" ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    mode === "edit" ? "Update Team Member" : "Add Team Member"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeamMemberModal;