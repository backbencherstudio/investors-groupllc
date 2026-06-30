import React, { useState } from 'react';
import { ModulePermission } from '@/redux/features/team-permission/TeamPermissionTypes'; 

interface PermissionSelectorProps {
  modules: ModulePermission[];
  selectedPermissions: string[];
  onToggle: (permissionId: string) => void;
  disabled?: boolean;
}

export const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  modules,
  selectedPermissions,
  onToggle,
  disabled = false,
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    modules.map(m => m.key)
  );

  const toggleModule = (moduleKey: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleKey)
        ? prev.filter(k => k !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const toggleAllInModule = (module: ModulePermission, select: boolean) => {
    const ids = module.scopes.map(s => s.permissionId);
    ids.forEach(id => {
      const isSelected = selectedPermissions.includes(id);
      if (select && !isSelected) {
        onToggle(id);
      } else if (!select && isSelected) {
        onToggle(id);
      }
    });
  };

  const getModuleSelectionStatus = (module: ModulePermission) => {
    const ids = module.scopes.map(s => s.permissionId);
    const selected = ids.filter(id => selectedPermissions.includes(id));
    
    if (selected.length === 0) return 'none';
    if (selected.length === ids.length) return 'all';
    return 'partial';
  };

  const getActionBadgeClass = (action: string) => {
    const classes: Record<string, string> = {
      'Read': 'bg-blue-100 text-blue-800',
      'Create': 'bg-green-100 text-green-800',
      'Update': 'bg-orange-100 text-orange-800',
      'Delete': 'bg-red-100 text-red-800',
      'Assign': 'bg-purple-100 text-purple-800',
    };
    return classes[action] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700">Permissions</h4>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-gray-900">
            {selectedPermissions.length} selected
          </span>
          <span className="text-gray-500">
            of {modules.reduce((acc, m) => acc + m.scopes.length, 0)} total
          </span>
        </div>
      </div>

      {/* Modules */}
      <div className="max-h-[500px] overflow-y-auto">
        {modules.map(module => {
          const status = getModuleSelectionStatus(module);
          const isExpanded = expandedModules.includes(module.key);

          return (
            <div key={module.key} className="border-b border-gray-100 last:border-b-0">
              {/* Module Header */}
              <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleModule(module.key)}
                    disabled={disabled}
                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                  <span className="text-lg">📦</span>
                  <span className="font-medium text-gray-900">{module.label}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {module.subject}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={status === 'all'}
                      ref={(el) => {
                        if (el) el.indeterminate = status === 'partial';
                      }}
                      onChange={(e) => toggleAllInModule(module, e.target.checked)}
                      disabled={disabled}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                    />
                    <span>Select All</span>
                  </label>
                  <span className="text-xs text-gray-500 font-medium">
                    {module.scopes.filter(s => selectedPermissions.includes(s.permissionId)).length}
                    /{module.scopes.length}
                  </span>
                </div>
              </div>

              {/* Scopes */}
              {isExpanded && (
                <div className="px-4 pb-3 pl-12 bg-gray-50/50">
                  {module.scopes.map(scope => (
                    <label
                      key={scope.permissionId}
                      className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(scope.permissionId)}
                        onChange={() => onToggle(scope.permissionId)}
                        disabled={disabled}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                      />
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${getActionBadgeClass(scope.action)}`}>
                        {scope.action}
                      </span>
                      <span className="text-sm text-gray-900">{scope.title}</span>
                      <span className="text-xs text-gray-500">{scope.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};