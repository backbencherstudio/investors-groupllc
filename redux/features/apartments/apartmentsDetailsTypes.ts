// Investor interface (for the investments array)
export interface Investor {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    investmentAmount?: string;
    investedAt?: string;
  }
  
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
    totalFoundGoal: string;        // Present in API
    autoRenue: boolean;             // Note: API uses "autoRenue" (typo)
    maximumInvest: string;          // Present in API
    minimumInvest: string;          // Present in API
    annualReturnRate: string;       // Present in API
    investmentAmount: string;       // Present in API
    aquisitionCost: string;         // Note: API uses "aquisitionCost" (typo)
    profitShare: string;            // Present in API
    lockInPeriod: string;           // Present in API
    doccument: string;              // Note: API uses "doccument" (typo)
    sold: boolean;                  // Present in API
    renovationCost: string;         // Present in API
    totalProjectCost: string;       // Present in API
    projectSellPrice: string;       // Present in API
    profit: string;                 // Present in API
    firstLineHolder: boolean;       // Present in API
    startDate: string;              // Present in API
    completionDate: string;         // Present in API
    investmentApartmentId: string;  // Present in API
  }
  
  export interface InvestmentStrategy {
    id: string;
    apartmentId: string | null;
    title: string;
    description: string[];          // Array of strings as shown in API
    investmentApartmentId: string;
  }
  
  export interface ApartmentFAQ {
    id: string;
    name: string;
    description: string[];          // Array of strings as shown in API
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
  
  export interface InvestmentApartmentItem {
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
    adminaproved: boolean;          // Note: API uses "adminaproved" (typo)
    investments: Investor[];        // Empty array in this case, but could have investors
    images: ImageItem[];
    investmentDetails: InvestmentDetail[];  // Array with one item
    investmentStrategies: InvestmentStrategy[];
    apartmentFAQs: ApartmentFAQ[];
    attachments: AttachmentItem[];
  }
  
  // API Response wrapper
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: number;
    success?: boolean;
  }

  // =========================================
  