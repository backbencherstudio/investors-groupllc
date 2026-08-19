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

// ============================================================================
// Single rental property detail (admin property request)

export interface RentalPropertyRequestLandlord {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  phone: string;
  email: string;
}

export interface RentalPropertySummary {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  viewDetailsPath: string;
}

export interface RentalPropertyInformation {
  currentAddress: string | null;
  requestType: string;
  listingType: ListingType;
  description: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  priceRange: string;
  amenities: string[];
  utilitiesIncluded: string[];
  petFriendly: boolean;
  availabilityDate: string | null;
  requestId: string;
  status: string;
  statusRaw: string;
  requestDate: string;
  rejectReason: string | null;
}

export interface RentalPropertyAction {
  label: string;
  method: string;
  url: string;
  enabled: boolean;
}

export interface RentalPropertyActions {
  accept: RentalPropertyAction;
  reject: RentalPropertyAction;
}

export interface RentalPropertyUnit {
  id: string;
  unitNumber: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

export interface RentalPropertyDetail {
  id: string;
  title: string;
  requestId: string;
  landlord: RentalPropertyRequestLandlord;
  property: RentalPropertySummary;
  information: RentalPropertyInformation;
  attachments: unknown[];
  units: RentalPropertyUnit[];
  actions: RentalPropertyActions;
}

export interface RentalPropertyResponse {
  success: boolean;
  message: string;
  data: RentalPropertyDetail;
}

// Legacy flat apartment detail (kept for reference / other endpoints)
export interface ApartmentData {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  builtYear: string; // ISO date string
  price: number | null;
  securityDeposit: number | null;
  availabilityDate: string | null; // ISO date string
  numberOffloors: number;
  description: string;
  utilitiesIncluded: string[];
  petFriendly: boolean;
  amenities: string[];
  country: string;
  video: string | null;
  tourVideo: string;
  isRented: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  landlordId: string;
  adminaproved: boolean;
  listingType: 'for_rent' | 'for_sale'; // assuming possible values
  isFeatured: boolean;
  units: Unit[];
  images: Image[];
  landlord: Landlord;
  wishlisted: boolean;
  hasAvailabilityNow: boolean;
  availability: 'available' | 'rented' | 'unavailable'; // assuming possible values
  otherPropertiesByLandlord: any[]; // define if structure is known
  property?: {
    imageUrl: string;
  };
}

export interface Unit {
  id: string;
  apartmentId: string;
  unitNumber: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  price: number;
  securityDeposit: number | null;
  availabilityDate: string | null; // ISO date string
  amenities: string[];
  leaseTerm: string;
  isRented: boolean;
  rentalLock: boolean;
  rentedById: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  availableNow: boolean;
  availableFrom: string | null; // ISO date string
}

export interface Image {
  id: string;
  url: string;
  apartmentId: string;
  createdAt: string; // ISO date string
  investmentApartmentId: string | null;
}

export interface Landlord {
  id: string;
  name: string;
  avatar: string | null;
}

//=================create ====================
