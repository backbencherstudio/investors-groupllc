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
    // ============================================
    // Single apartments
    // ============================================
    getSingleApartments: builder.query({
      query: (id) => ({
        url: `/apartments/details/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const { useGetInvestmentPropertyQuery, useGetSingleApartmentsQuery } =
  propertyApi;
