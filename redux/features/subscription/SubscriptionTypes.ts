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
