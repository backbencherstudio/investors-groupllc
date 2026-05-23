// _components/AssignVendorModal.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, CheckCircle, Loader2 } from "lucide-react";
import { useGetAllVendorsQuery, useAssignTaskToVendorMutation } from "@/redux/features/vendor-task/vendorTaskApi";

import { toast } from "sonner"; // or your toast library

interface AssignVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  currentAssignee?: string;
  onAssignSuccess?: () => void;
}

export default function AssignVendorModal({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  currentAssignee,
  onAssignSuccess,
}: AssignVendorModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [assignTask, { isLoading: isAssigning }] = useAssignTaskToVendorMutation();
  
  const { data: vendorsData, isLoading: isLoadingVendors } = useGetAllVendorsQuery({
    page: 1,
    limit: 50,
    search: searchTerm || undefined,
  });
  
  const vendors = vendorsData?.items || [];

  const handleAssign = async () => {
    if (!selectedVendorId) {
      toast.error("Please select a vendor");
      return;
    }

    try {
      await assignTask({ taskId, vendorId: selectedVendorId }).unwrap();
      toast.success("Task assigned successfully");
      onAssignSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to assign task");
      console.error("Assign error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Assign Vendor</h2>
              <p className="text-sm text-gray-500 mt-1">Task: {taskTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors by name, email, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Vendors List */}
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            {isLoadingVendors ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              </div>
            ) : vendors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No vendors found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    isSelected={selectedVendorId === vendor.id}
                    onSelect={() => setSelectedVendorId(vendor.id)}
                    isCurrentAssignee={currentAssignee === vendor.id}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedVendorId || isAssigning}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAssigning && <Loader2 className="w-4 h-4 animate-spin" />}
              {isAssigning ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Vendor Card Component
interface VendorCardProps {
  vendor: any;
  isSelected: boolean;
  onSelect: () => void;
  isCurrentAssignee: boolean;
}

function VendorCard({ vendor, isSelected, onSelect, isCurrentAssignee }: VendorCardProps) {
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Available</span>;
      case "Busy":
        return <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Busy</span>;
      case "Offline":
        return <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Offline</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? "bg-orange-50 border-l-4 border-l-orange-500" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <Image
            src={vendor.avatar || "/default-avatar.png"}
            alt={vendor.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          {isSelected && (
            <div className="absolute -top-1 -right-1">
              <CheckCircle className="w-5 h-5 text-orange-500 bg-white rounded-full" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
              {getAvailabilityBadge(vendor.availabilityStatus)}
            </div>
            {isCurrentAssignee && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                Current Assignee
              </span>
            )}
          </div>
          
          <div className="space-y-1 text-sm">
            <p className="text-gray-500">{vendor.email}</p>
            <p className="text-gray-500">{vendor.phone}</p>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">
                <span className="font-medium">Service:</span> {vendor.serviceType}
              </span>
              <span className="text-gray-600">
                <span className="font-medium">Jobs:</span> {vendor.totalJobsCompleted}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}