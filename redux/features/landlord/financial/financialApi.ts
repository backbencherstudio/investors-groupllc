import { baseApi } from "@/redux/features/api/baseApi";

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
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const { useGetRentPaymentQuery, useGetWithdrawalMyQuery } = financialApi;
