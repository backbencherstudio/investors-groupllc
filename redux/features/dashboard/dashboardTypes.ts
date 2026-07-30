// ============ SHARED QUERY PARAMS ============

export interface AnalyticsQueryParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export type RentPaymentsQueryParams = AnalyticsQueryParams;

export type InvestorTransactionsQueryParams = AnalyticsQueryParams;

export interface WithdrawalsQueryParams extends AnalyticsQueryParams {
  user_type?: string;
}

// ============ SHARED RESPONSE TYPES ============

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  from: number;
  to: number;
}

export interface Recipient {
  id: string;
  name: string;
  phone: string;
  avatar: string | null;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
}

export interface Transaction {
  id: string;
  gateway: string;
  status: string;
  transactionId: string;
}

// ============ TENANT RENT PAYMENTS ============

export interface RentPaymentItem {
  id: string;
  displayId: string;
  paidDate: string | null;
  paymentStatus: string;
  recipient: Recipient;
  property: Property;
  amount: number;
  dueDate: string;
  status: string;
  transaction: Transaction;
}

export interface RentPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    items: RentPaymentItem[];
    pagination: Pagination;
  };
}

// ============ INVESTOR TRANSACTIONS ============

export type InvestorPaymentStatus = "Pending" | "Success" | "Failed" | "Refunded";
export type InvestorStatus = "Pending" | "Active" | "Completed" | "Cancelled" | "Overdue";
export type InvestmentType = "active" | "passive" | "fixed";
export type RecordStatus = "pending" | "active" | "completed" | "cancelled";

export interface InvestorTransaction {
  id: string;
  displayId: string;
  paidDate: string | null;
  paymentStatus: InvestorPaymentStatus | string;
  recipient: Recipient;
  property: Property;
  amount: number;
  status: InvestorStatus | string;
  investmentType: InvestmentType | string;
  recordStatus: RecordStatus | string;
  createdAt: string;
}

export interface InvestorTransactionsResponse {
  success: boolean;
  message: string;
  data: {
    items: InvestorTransaction[];
    pagination: Pagination;
  };
}

// ============ WITHDRAWALS ============

export type WithdrawalStatus =
  | "PENDING"
  | "COMPLETED"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";
export type WithdrawalUserType = "Investor" | "Vendor" | "Landlord";
export type WithdrawalMethod = "Bank Transfer" | "PayPal" | "Zelle" | "Crypto" | "Check";
export type WithdrawalMethodRaw = "ACH" | "PAYPAL" | "ZELLE" | "CRYPTO" | "CHECK";

/** @deprecated Use WithdrawalsQueryParams instead */
export type WithdrawalParams = WithdrawalsQueryParams;

export interface WithdrawalItem {
  id: string;
  displayId: string;
  requestDate: string;
  name: string;
  phone: string;
  avatar: string | null;
  userType: WithdrawalUserType | string;
  amount: number;
  method: WithdrawalMethod | string;
  methodRaw: WithdrawalMethodRaw | string;
  status: WithdrawalStatus | string;
  statusLabel: string;
}

export interface WithdrawalResponse {
  success: boolean;
  message: string;
  data: {
    items: WithdrawalItem[];
    pagination: Pagination;
  };
}



// types/dashboard.types.ts or in your API file

export interface IncomeSeriesItem {
  month: string;
  rent: number;
  subscriptions: number;
  investments: number;
}

export interface IncomeChartData {
  period: "this_year" | "last_year" | "all_time" | string;
  total: number;
  changePercent: number;
  series: IncomeSeriesItem[];
}

export interface IncomeChartResponse {
  success: boolean;
  message: string;
  data: IncomeChartData;
}

// For your API query
export type GetOverAllIncomeResponse = IncomeChartResponse;