
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
  [key: string]: any;
}


// =================================================================


// Base types
export interface Requester {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
}

export interface InvestmentDetail {
  id: string;
  apartmentId: string | null;
  totalFoundGoal: string;
  autoRenue: boolean;
  maximumInvest: string;
  minimumInvest: string;
  annualReturnRate: string;
  investmentAmount: string;
  aquisitionCost: string;
  profitShare: string;
  lockInPeriod: string;
  doccument: string;
  sold: boolean;
  renovationCost: string;
  totalProjectCost: string;
  projectSellPrice: string;
  profit: string;
  firstLineHolder: boolean;
  startDate: string;
  completionDate: string;
  investmentApartmentId: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  description?: string;
  imageUrl: string | null;
  images?: PropertyImage[];
  investmentDetails?: InvestmentDetail[];
}

// Stats
export interface InvestmentStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

// Investment Application List Item
export interface InvestmentApplicationItem {
  id: string;
  requestId: string;
  requester: Requester;
  property: Property;
  amount: number;
  requestedAt: string;
  status: string;
  statusRaw: string;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}

// Investment Application List Response
export interface InvestmentApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    stats: InvestmentStats;
    items: InvestmentApplicationItem[];
    pagination: Pagination;
  };
}

export interface InvestmentApplicationsData {
  stats: InvestmentStats;
  items: InvestmentApplicationItem[];
  pagination: Pagination;
}

// Investment Application Details
export interface InvestmentApplicationDetails {
  id: string;
  requestId: string;
  amount: number;
  type: string;
  autoRenew: boolean;
  stripeSessionId: string;
  subscriptionId: string | null;
  status: string;
  statusRaw: string;
  requestedAt: string;
  updatedAt: string;
  requester: Requester;
  property: Property;
  subscription: any | null;
}

export interface InvestmentApplicationDetailsResponse {
  success: boolean;
  message: string;
  data: InvestmentApplicationDetails;
}

// Query Params
export interface GetInvestmentApplicationsQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Investment application status types
export type InvestmentApplicationStatus = 'pending' | 'active' | 'cancelled';

// Status update request
export interface UpdateInvestmentStatusRequest {
  status: InvestmentApplicationStatus;
  notes?: string;
}

// Status update response
export interface UpdateInvestmentStatusResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    status: InvestmentApplicationStatus;
    updatedAt: string;
  };
}

// Query params for filtering by status
export interface GetInvestmentApplicationsQueryParams {
  page?: number;
  limit?: number;
  status?: 'all' | 'pending' | 'active' | 'cancelled' | undefined | string;
  search?: string;
}


// RequestTypes.ts - Add these types

// ============================================
// APARTMENT REQUEST TYPES
// ============================================

// Requester information
export interface Requester {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// Property information
export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string | null;
}

// Unit information
export interface Unit {
  id: string;
  unitNumber: string;
}

// Individual apartment request item
export interface ApartmentRequestItem {
  id: string;
  requestId: string;
  requester: Requester;
  tourType: string;
  tourTypeLabel: string;
  tourDate: string;
  tourTime: string;
  property: Property;
  unit: Unit;
  requestedAt: string;
  status: string;
  statusRaw: string;
  detailPath: string;
}

// Apartment request details (for single request view)
// ApartmentRequestDetails type - complete standalone definition

export interface ApartmentRequestDetails {
  id: string;
  requestId: string;
  status: string;
  statusRaw: string;
  tourType: string;
  tourTypeLabel: string;
  tourDate: string;
  tourTime: string;
  description: string | null;
  virtualMeetingLink: string | null;
  rejectTitle: string | null;
  rejectDescription: string | null;
  requestedAt: string;
  updatedAt: string;
  requester: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    email: string;
    phone: string;
  };
  property: {
    id: string;
    name: string;
    address: string;
    imageUrl: string | null;
  };
  unit: {
    id: string;
    unitNumber: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
  };
}
// Apartment requests data container
export interface ApartmentRequestsData {
  items: ApartmentRequestItem[];
  pagination: Pagination;
}

// API Response for list
export interface ApartmentRequestsResponse {
  success: boolean;
  message: string;
  data: ApartmentRequestsData;
}

// API Response for single item
export interface ApartmentRequestDetailsResponse {
  success: boolean;
  message: string;
  data: ApartmentRequestDetails;
}

// Query parameters for listing
export interface GetApartmentRequestsQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  fromDate?: string;
  toDate?: string;
}

// Pagination (reuse from your existing types)
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}