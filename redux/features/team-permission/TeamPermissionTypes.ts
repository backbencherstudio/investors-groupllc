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

// ============================================
// TEAM MEMBER TYPES
// ============================================

export interface TeamMember {
id: string;
name: string;
firstName: string;
lastName: string;
email: string;
contact: string | null;
phone: string | null;
avatar: string | null;
role: {
  id: string;
  name: string;
  label: string;
};
approvedAt: string;
createdAt: string;
}

export interface Pagination {
page: number;
limit: number;
total: number;
totalPages: number;
from: number;
to: number;
}

export interface TeamMembersResponse {
success: boolean;
message: string;
data: {
  items: TeamMember[];
  pagination: Pagination;
};
}

export interface TeamMemberResponse {
success: boolean;
message: string;
data: TeamMember;
}

export interface CreateTeamMemberData {
firstName: string;
lastName: string;
email: string;
password: string;
roleId: string;
}

export interface UpdateTeamMemberData {
firstName: string;
lastName: string;
email: string;
password?: string;
roleId: string;
}

export interface DeleteTeamMemberResponse {
success: boolean;
message: string;
}

// ============================================
// API RESPONSE WRAPPER
// ============================================

export interface ApiResponse<T = any> {
success: boolean;
message: string;
data: T;
}