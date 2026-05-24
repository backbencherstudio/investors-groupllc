"use client";

import { toast } from "sonner";

// DeleteConfirmToast.tsx
interface DeleteConfirmToastProps {
    toastId: string | number;
    planName: string;
    onConfirm: () => void;
  }
  
  export const DeleteConfirmToast = ({ toastId, planName, onConfirm }: DeleteConfirmToastProps) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm mx-4">
      <h3 className="font-semibold mb-2">Confirm Deletion</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Are you sure you want to delete "{planName}"? This action cannot be undone.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => toast.dismiss(toastId)}
          className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(toastId);
            toast.success("Subscription deleted successfully");
          }}
          className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );