import { baseApi } from "@/redux/features/api/baseApi";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // ALL investment
    // ============================================
    getInvestmentProperty: builder.query({
      query: () => ({
        url: `/investment/apartment-checkout`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const { useGetInvestmentPropertyQuery } = propertyApi;
