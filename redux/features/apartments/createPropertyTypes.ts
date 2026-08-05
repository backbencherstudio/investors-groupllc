// types/investment-property.ts

export interface CreateInvestmentApartmentItem {
    id: string;
    name: string;
    location: string;
    description: string;
    investmentType: 'active' | 'passive';
    propertyAge: number;
    propertySize: number;
    numberOffloors: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    petFriendly: boolean;
    isRented: boolean;
    images: string[];
    amenities: string[];
    investmentDetails: InvestmentDetail[];
    investmentStrategies: InvestmentStrategy[];
    apartmentFAQs: ApartmentFAQ[];
    detailsDocument: string;
    document: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface InvestmentDetail {
    totalFoundGoal: number;
    annualReturnRate: number;
    autoRenue: boolean;
    maximumInvest: number;
    minimumInvest: number;
    investmentAmount: number;
    aquisitionCost: number;
    profitShare: number;
    lockInPeriod: string;
    sold: boolean;
    renovationCost: number;
    totalProjectCost: number;
    projectSellPrice: number;
    profit: number;
    firstLineHolder: boolean;
    startDate: string;
    completionDate: string;
  }
  
  export interface InvestmentStrategy {
    title: string;
    description: string[];
  }
  
  export interface ApartmentFAQ {
    name: string;
    description: string[];
  }
  
  export interface CreateInvestmentPropertyRequest {
    name: string;
    location: string;
    description: string;
    investmentType: 'active' | 'passive';
    propertyAge: number;
    propertySize: number;
    numberOffloors: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    petFriendly: boolean;
    isRented: boolean;
    images: File[];
    amenities: string[];
    investmentDetails: InvestmentDetail[];
    investmentStrategies: InvestmentStrategy[];
    apartmentFAQs: ApartmentFAQ[];
    detailsDocument: File;
    document: File[];
  }
  
  export interface CreateApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }