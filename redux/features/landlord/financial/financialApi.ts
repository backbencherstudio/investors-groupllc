import { baseApi } from "@/redux/features/api/baseApi";

export interface TenantRentPaymentDetail {
  id: string;
  displayId: string;
  paidDate: string | null;
  paymentStatus: string;
  status: string;
  amount: number;
  method: string;
  dueDate: string;
  recipient: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string | null;
  };
  property: {
    id: string;
    name: string;
    address: string;
    imageUrl: string | null;
  };
  order: {
    id: string;
    status: string;
    paymentStatus: string;
    months: number;
    monthlyRent: number;
    serviceCharge: number;
    tax: number;
    discount: number;
    total: number;
    unitNumber: string;
  };
  transactions: Array<{
    id: string;
    paymentId: string;
    gateway: string;
    transactionId: string;
    currency: string;
    amount: number;
    status: string;
    responseData: unknown;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface TenantRentPaymentDetailResponse {
  success: boolean;
  message: string;
  data: TenantRentPaymentDetail;
}

export interface InvestorTransactionDetail {
  id: string;
  displayId: string;
  investor: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string | null;
    viewProfilePath: string;
  };
  investmentInformation: {
    property: {
      id: string;
      name: string;
      address: string;
      imageUrl: string | null;
      viewDetailsPath: string;
    };
    transactionId: string;
    paymentStatus: string;
    paymentStatusRaw: string;
    paidAt: string | null;
    paidAtLabel: string | null;
    method: string;
    methodRaw: string;
  };
  transactionSummary: {
    amount: number;
    taxRate: number;
    taxLabel: string;
    tax: number;
    total: number;
  };
  actions: {
    sendInvoice: {
      label: string;
      method: string;
      url: string;
      enabled: boolean;
    };
    download: {
      label: string;
      method: string;
      url: string;
      enabled: boolean;
    };
  };
  recipient: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string | null;
  };
  property: {
    id: string;
    name: string;
    location: string;
    address: string;
    imageUrl: string | null;
    images: string[];
  };
  paidDate: string | null;
  paymentStatus: string;
  status: string;
  amount: number;
  type: string;
  recordStatus: string;
  autoRenew: boolean;
  createdAt: string;
  fundingOverview: {
    totalFunded: number;
    totalFoundGoal: number;
    fundedPercentage: number;
    investorCount: number;
    annualReturnRate: number;
    lockInPeriod: string;
  };
  payment: {
    id: string;
    amount: number;
    method: string;
    status: string;
    paymentDate: string;
  };
  transactions: Array<{
    id: string;
    paymentId: string;
    gateway: string;
    transactionId: string;
    currency: string;
    amount: number;
    status: string;
    responseData: unknown;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface InvestorTransactionDetailResponse {
  success: boolean;
  message: string;
  data: InvestorTransactionDetail;
}

export interface WithdrawalDetail {
  id: string;
  displayId: string;
  detailType: string;
  title: string;
  user: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string | null;
    role: string;
    viewProfilePath: string;
  };
  information: {
    transactionId: string;
    task: unknown | null;
    property: unknown | null;
    requestStatus: string | null;
    requestStatusRaw: string | null;
    requestDate: string | null;
    requestDateLabel: string | null;
    serviceType: string | null;
    withdrawStatus: string;
    withdrawStatusRaw: string;
    paidAt: string | null;
    paidDateLabel: string | null;
    method: string;
    methodRaw: string;
  };
  maintenanceFee: number | null;
  transactionSummary: {
    amount: number;
    taxRate: number;
    taxLabel: string;
    tax: number;
    total: number;
  };
  withdrawalTimeline: Array<{
    key: string;
    title: string;
    subtitle: string;
    at: string | null;
    atLabel: string | null;
    isCompleted: boolean;
  }>;
  sections: {
    showTask: boolean;
    showProperty: boolean;
    showMaintenanceFee: boolean;
    showTransactionSummary: boolean;
  };
  amount: number;
  status: string;
  statusLabel: string;
  note: string | null;
  adminNote: string | null;
  approvedAt: string | null;
  completedAt: string | null;
  rejectedAt: string | null;
  platformFee: number | null;
  paid: unknown | null;
  transactionReference: string | null;
}

interface WithdrawalDetailResponse {
  success: boolean;
  message: string;
  data: WithdrawalDetail;
}

export const financialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // ALL Rent Payment
    // ============================================
    getRentPayment: builder.query({
      query: (params?: { page?: number; limit?: number }) => ({
        url: `/landlord/rent-payment`,
        method: "GET",
        params,
      }),
    }),
    // ============================================
    // ALL Withdrawal My
    // ============================================
    getWithdrawalMy: builder.query({
      query: (params?: { page?: number; limit?: number }) => ({
        url: `/withdrawal/my`,
        method: "GET",
        params,
      }),
    }),
    // ============================================
    // Tenant Rent Payment Details
    // ============================================
    getTenantRentPaymentDetails: builder.query<
      TenantRentPaymentDetail,
      string
    >({
      query: (id) => ({
        url: `/dashboard/analytics/tenant-rent-payments/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TenantRentPaymentDetailResponse) =>
        response.data,
    }),
    // ============================================
    // Investor Transaction Details
    // ============================================
    getInvestorTransactionDetails: builder.query<
      InvestorTransactionDetail,
      string
    >({
      query: (id) => ({
        url: `/dashboard/analytics/investor-transactions/${id}`,
        method: "GET",
      }),
      transformResponse: (response: InvestorTransactionDetailResponse) =>
        response.data,
    }),
    // ============================================
    // Withdrawal Details
    // ============================================
    getWithdrawalDetails: builder.query<WithdrawalDetail, string>({
      query: (id) => ({
        url: `/dashboard/analytics/withdrawals/${id}`,
        method: "GET",
      }),
      transformResponse: (response: WithdrawalDetailResponse) => response.data,
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const {
  useGetRentPaymentQuery,
  useGetWithdrawalMyQuery,
  useGetTenantRentPaymentDetailsQuery,
  useGetInvestorTransactionDetailsQuery,
  useGetWithdrawalDetailsQuery,
} = financialApi;
