// UserTypes.ts

export type UserRole = "TENANT" | "VENDOR" | "INVESTOR" | "LANDLORD" | "ADMIN";

export interface User {
  id: string;
  avatar: string | null;
  name: string;
  role: UserRole;
  contact: string;
  email?: string;
  investCount?: number; // For INVESTOR
  totalInvested?: number; // For INVESTOR
  profit?: number; // For INVESTOR
  roiPercent?: number; // For INVESTOR
  investmentStatus?: "Active" | "Inactive" | "Pending"; // For INVESTOR
  propertyCount?: number; // For LANDLORD
  unitCount?: number; // For LANDLORD
  vendorType?: string; // For VENDOR
  serviceCount?: number; // For VENDOR
  leaseStart?: string; // For TENANT
  leaseEnd?: string; // For TENANT
  propertyName?: string; // For TENANT
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  data: {
    items: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      from: number;
      to: number;
    };
  };
}

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: UserRole;
  status?: string;
}