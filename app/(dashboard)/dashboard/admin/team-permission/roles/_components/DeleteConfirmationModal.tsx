import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  roleName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  roleName,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen overflow-x-hidden overflow-y-auto">
      {/* Background overlay with modern blur */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in" 
        onClick={!isLoading ? onCancel : undefined} 
      />

      {/* Modal panel container */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden transform transition-all animate-scale-in"
      >
        {/* Main content body */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4">
            {/* Soft, professional warning icon housing */}
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-rose-50 border border-rose-100 rounded-full text-rose-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Typography core */}
            <div className="space-y-2 flex-1">
              <h3 className="text-lg font-bold text-slate-900">
                Deprovision System Role
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Are you sure you want to permanently delete <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">"{roleName}"</span>? This configuration cannot be undone.
              </p>
            </div>
          </div>

          {/* High-contrast side-effect callout box */}
          <div className="mt-5 p-4 bg-amber-50/60 border border-amber-200/70 rounded-lg hidden">
            <div className="flex gap-2.5">
              <span className="text-sm select-none" role="img" aria-label="warning">⚠️</span>
              <p className="text-xs font-medium text-amber-800 leading-normal">
                Critical Side-Effect: Any personnel or API clients mapped to this token key will lose access contexts immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Modal explicit execution footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-2.5">
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all disabled:opacity-50"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-rose-600 border border-transparent rounded-lg shadow-xs hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Destroying...
              </>
            ) : (
              'Confirm Destruction'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};