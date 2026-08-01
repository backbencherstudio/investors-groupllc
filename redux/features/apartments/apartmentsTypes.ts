// --- Core Data Payload ---

export interface ApartmentStatsData {
  totalApartments: number;
  totalRentApartments: number;
  totalSoldApartments: number;
  totalInvestments: number;
}

// --- Main API Response Type ---

export interface FetchApartmentStatsResponse {
  success: boolean;
  message: string;
  data: ApartmentStatsData;
}


// --- Sub-types ---

export interface ApartmentImage {
  id: string;
  url: string;
  apartmentId: string;
  createdAt: string; // ISO Date String
  investmentApartmentId: string | null;
}

export type ListingType = "for_rent" | "for_sale" | string; // Adjust options as needed

export interface Apartment {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  builtYear: string; // ISO Date String
  price: number | null;
  securityDeposit: number | null;
  availabilityDate: string | null; // ISO Date String or null
  numberOffloors: number;
  description: string;
  utilitiesIncluded: string[];
  petFriendly: boolean;
  amenities: string[];
  country: string;
  video: string | null;
  tourVideo: string | null;
  isRented: boolean;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  landlordId: string;
  adminaproved: boolean;
  listingType: ListingType;
  isFeatured: boolean;
  images: ApartmentImage[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// --- Main API Response Type ---

export interface FetchApartmentsResponse {
  success: boolean;
  message: string;
  data: Apartment[];
  meta: PaginationMeta;
}



export interface GetApartmentsQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  listingType?: string;
}

export interface GetInvestmentApartmentsQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  investmentType?: string;
}


// API response-এর নতুন structure অনুযায়ী interface
export interface InvestorStatsResponse {
  totalProperty: number;
  totalInvestedProperty: number;
  totalActive: number;
  totalPassive: number;
}



// ====================
export interface ImageItem {
  id: string;
  url: string;
  apartmentId: string | null;
  createdAt: string;
  investmentApartmentId: string;
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

export interface InvestmentStrategy {
  id: string;
  apartmentId: string | null;
  title: string;
  description: string[];
  investmentApartmentId: string;
}

export interface ApartmentFAQ {
  id: string;
  name: string;
  description: string[];
  investmentApartmentId: string;
}

export interface AttachmentItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  type: string;
  size: number;
  file: string;
  file_alt: string;
  investmentApartmentId: string;
  apartmentId: string | null;
  messageId: string | null;
}

export interface InvestmentApartment {
  id: string;
  name: string;
  location: string;
  description: string;
  propertyAge: number;
  propertySize: number;
  numberOffloors: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  amenities: string[];
  investmentType: 'passive' | 'active' | string;
  petFriendly: boolean;
  video: string | null;
  isRented: boolean;
  createdAt: string;
  updatedAt: string;
  landlordId: string;
  adminaproved: boolean;
  investments: any[];
  images: ImageItem[];
  investmentDetails: InvestmentDetail[];
  investmentStrategies: InvestmentStrategy[];
  apartmentFAQs: ApartmentFAQ[];
  attachments: AttachmentItem[];
}

export interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetInvestmentApartmentsResponse {
  data: InvestmentApartment[];
  meta: MetaData;
}