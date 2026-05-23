interface Issue {
    title: string;
    priority: string; // or: 'Emergency' | 'High' | 'Medium' | 'Low'
  }
  
  interface Requester {
    id: string;
    name: string;
    role: string; // or: 'Tenant' | 'Owner' | 'Admin'
    email: string;
    avatar: string;
  }
  
  interface Property {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
  }

  export interface GetTasksQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
  }
  
  interface TaskItem {
    taskId: string;
    requestId: string;
    issue: Issue;
    requestedDate: string; // or Date
    status: string; // or: 'Pending' | 'InProgress' | 'InReview' | 'Completed'
    statusRaw: string; // or: 'pending' | 'in_progress' | 'in_review' | 'completed'
    requester: Requester;
    assignee: Requester | null;
    property: Property;
  }
  
  interface Stats {
    total: number;
    inProgress: number;
    inReview: number;
    completed: number;
  }
  
  interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    from: number;
    to: number;
  }
  
  export interface VendorTasksResponse {
    success: boolean;
    message: string;
    data: {
      stats: Stats;
      items: TaskItem[];
      pagination: Pagination;
    };
  }


  // types/vendor.types.ts

export interface Vendor {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar: string | null;
    serviceType: string | null;
    serviceTypeLabel: string | null;
    availability: string | null;
  }
  
  export interface VendorPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    from: number;
    to: number;
  }
  
  export interface VendorListData {
    items: Vendor[];
    pagination: VendorPagination;
  }
  
  export interface VendorListResponse {
    success: boolean;
    message: string;
    data: VendorListData;
  }
  
  // Optional: For query parameters
  export interface GetVendorsQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    availability?: string;
    serviceType?: string;
  }


  // types/maintenance.types.ts

export interface MaintenanceFile {
    id: string;
    fileName: string;
    filePath: string;
    fileType: string;
    maintenance_id: string;
    createdAt: string;
    url: string;
  }
  
  export interface MaintenanceUser {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    phone: string;
    avatar_url: string | null;
  }
  
  export interface MaintenanceProperty {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    image_url: string;
  }
  
  export interface MaintenanceUnit {
    id?: string;
    name?: string;
    unitNumber?: string;
  }
  
  export type MaintenancePriority = 'emergency' | 'high' | 'medium' | 'low';
  export type MaintenanceStatus = 'pending' | 'on_going' | 'in_review' | 'completed';
  export type MaintenanceCategory = 'PLUMBING' | 'ELECTRICAL' | 'PAINTING' | 'CARPENTRY' | 'CLEANING' | 'OTHER';
  
  export interface MaintenanceData {
    id: string;
    issue: string;
    description: string;
    location: string;
    category: MaintenanceCategory | string;
    priority: MaintenancePriority | string;
    status: MaintenanceStatus | string;
    requested_date: string;
    apartmentId: string;
    unitId: string | null;
    vendor_id: string | null;
    files: MaintenanceFile[];
    user: MaintenanceUser;
    requestId: string;
    property: MaintenanceProperty;
    unit: MaintenanceUnit | null;
  }
  
  export interface VendorDetailsResponse {
    success: boolean;
    message: string;
    data: MaintenanceData;
  }
  
  // For API query params
  export interface GetMaintenanceByIdParams {
    id: string;
  }
  
  // For updating maintenance status
  export interface UpdateMaintenanceStatusParams {
    id: string;
    status: MaintenanceStatus;
    vendorId?: string;
  }
  
  export interface UpdateMaintenanceStatusResponse {
    success: boolean;
    message: string;
    data: MaintenanceData;
  }
  
  // For assigning vendor to maintenance
  export interface AssignVendorToMaintenanceParams {
    maintenanceId: string;
    vendorId: string;
  }
  
  export interface AssignVendorToMaintenanceResponse {
    success: boolean;
    message: string;
    data: MaintenanceData;
  }