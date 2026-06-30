// ============================================
// PERMISSION TYPES
// ============================================

export interface Permission {
    id: string;
    title: string;
    action: string;
    subject: string;
    label: string;
  }
  
  export interface ScopePermission {
    key: string;
    label: string;
    permissionId: string;
    title: string;
    action: string;
    subject: string;
  }
  
  export interface ModulePermission {
    key: string;
    label: string;
    subject: string;
    scopes: ScopePermission[];
  }
  
  export interface PermissionData {
    modules: ModulePermission[];
    flat: Permission[];
  }
  
  export interface PermissionResponse {
    success: boolean;
    message: string;
    data: PermissionData;
  }
  
  // ============================================
  // ROLE TYPES
  // ============================================
  
  export interface Role {
    id: string;
    name: string;
    title: string;
    label: string;
    memberCount: number;
    createdAt: string;
    permissions: Permission[];
    permissionIds: string[];
  }
  
  export interface CreateRoleData {
    title: string;
    name: string;
    permissionIds: string[];
  }
  
  export interface UpdateRoleData {
    title?: string;
    name?: string;
    permissionIds?: string[];
  }
  
  export interface RolesListResponse {
    success: boolean;
    message: string;
    data: Role[];
  }
  
  export interface GetRolesQueryParams {
    // Add any query params if needed
  }