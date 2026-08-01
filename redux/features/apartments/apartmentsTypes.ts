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