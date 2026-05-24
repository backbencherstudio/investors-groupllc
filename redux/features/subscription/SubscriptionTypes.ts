// Subscription types

export interface Subscription {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  amount: number;
  currency: string;
  interval: string;
  trialDays: number | null;
  benefits: string[];
  discountPercentage: number;
  stripeProductId: string;
  stripePriceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionDto {
  name: string;
  description: string;
  isActive: boolean;
  amount: number;
  currency: string;
  interval: string;
  trialDays: number | null;
  benefits: string[];
  discountPercentage: number;
}

export interface UpdateSubscriptionDto extends Partial<CreateSubscriptionDto> {}

export interface SubscriptionListResponse {
  success: boolean;
  message: string;
  data: Subscription[];
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: Subscription;
}


// types/subscription.types.ts

export interface SubscriptionStats {
  totalSubs: number;
  monthlyPlan: number;
  yearlyPlan: number;
  revenue: {
    activeSubscriptions: number;
    totalPlanAmount: number;
  };
}

export interface SubscriptionStatsResponse {
  success: boolean;
  message: string;
  data: SubscriptionStats;
}

/** Paginated list of user/property subscription rows (distinct from plan list). */
export interface PaginatedSubscriptionListResponse {
  success: boolean;
  message: string;
  data: {
    items: SubscriptionListItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SubscriptionListItem {
  id: string;
  user: {
    name: string | null;
    avatar: string | null;
    role: string;
  };
  property: {
    name: string;
    address: string;
    thumbnailUrl: string | null;
  } | null;
  plan: {
    name: string;
  };
  startDate: string;
  expiryDate: string | null;
}

export interface SubscriptionListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "pending" | "active" | "past_due" | "canceled";
  period?: string; // format: "YYYY-MM"
}