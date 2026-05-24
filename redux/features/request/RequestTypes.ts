
// BookingRequestTypes.ts

export interface Requester {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string | null;
}

export interface BookingRequest {
  id: string;
  requestId: string;
  requester: Requester;
  property: Property;
  requestedAt: string;
  status: string;
  statusRaw: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}

export interface BookingRequestsData {
  items: BookingRequest[];
  pagination: Pagination;
}

export interface BookingRequestsResponse {
  success: boolean;
  message: string;
  data: BookingRequestsData;
}

export interface GetBookingRequestsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
}

// BookingRequestDetailsTypes.ts

export interface Applicant {
  name: string;
  email: string;
  phone: string;
  employerName: string;
  jobTitle: string;
  annualSalaryRange: string;
  creditCheckAuthorized: boolean;
}

export interface Requester {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Landlord {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string | null;
}

export interface Unit {
  id: string;
  unitNumber: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

export interface BookingRequestDetails {
  id: string;
  requestId: string;
  referenceCode: string;
  status: string;
  statusRaw: string;
  rejectReason: string | null;
  requestedAt: string;
  leaseStartDate: string;
  leaseEndDate: string;
  applicant: Applicant;
  requester: Requester;
  landlord: Landlord;
  property: Property;
  unit: Unit;
  idVerificationDocUrl: string;
  financialDocUrl: string;
  rentalOrder: any | null;
}

export interface BookingRequestDetailsResponse {
  success: boolean;
  message: string;
  data: BookingRequestDetails;
}

// MaintenanceRequestTypes.ts

// Common types
export interface Requester {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}

// List response types
export interface MaintenanceRequest {
  id: string;
  requestId: string;
  requester: Requester;
  property: Property;
  requestedAt: string;
  status: string;
  statusRaw: string;
}

export interface MaintenanceRequestsData {
  items: MaintenanceRequest[];
  pagination: Pagination;
}

export interface MaintenanceRequestsResponse {
  success: boolean;
  message: string;
  data: MaintenanceRequestsData;
}

// Details types
export interface Cost {
  estimatedPartsFee: number | null;
  serviceFee: number | null;
  actualCost: number | null;
}

export interface File {
  id: string;
  fileName: string;
  fileType: string;
  createdAt: string;
  url: string;
}

export interface MaintenanceRequestDetails {
  id: string;
  requestId: string;
  issue: string;
  description: string;
  location: string;
  position: string;
  category: string;
  priority: string;
  status: string;
  statusRaw: string;
  requestedAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  requester: Requester;
  landlord: Requester | null;
  assignee: Requester | null;
  requestedBy: Requester;
  property: Property;
  unit: any | null;
  cost: Cost;
  files: File[];
}

export interface MaintenanceRequestDetailsResponse {
  success: boolean;
  message: string;
  data: MaintenanceRequestDetails;
}

// Query params
export interface GetMaintenanceRequestsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
}


// PropertyTourTypes.ts

// Common types
export interface Requester {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string | null;
    }

export interface Unit {
  id: string;
  unitNumber: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}

// List response types
export interface PropertyTourRequest {
  id: string;
  requestId: string;
  requester: Requester;
  property: Property;
  requestedAt: string;
  status: string;
  statusRaw: string;
}

export interface PropertyTourRequestsData {
  items: PropertyTourRequest[];
  pagination: Pagination;
}

export interface PropertyTourRequestsResponse {
  success: boolean;
  message: string;
  data: PropertyTourRequestsData;
}

// Details types
export interface PropertyTourRequestDetails {
  id: string;
  requestId: string;
  status: string;
  statusRaw: string;
  tourType: string;
  tourDate: string;
  tourTime: string;
  description: string | null;
  virtualMeetingLink: string | null;
  rejectTitle: string | null;
  rejectDescription: string | null;
  requestedAt: string;
  requester: Requester;
  property: Property;
  unit: Unit;
}

export interface PropertyTourRequestDetailsResponse {
  success: boolean;
  message: string;
  data: PropertyTourRequestDetails;
}

// Query params
export interface GetPropertyTourRequestsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
}