import { baseApi } from "@/redux/features/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // Apartments Dashboard Stats
    // ============================================
    getApartmentsStats: builder.query({
      query: () => ({
        url: `/apartments/top-states`,
        method: "GET",
      }),
    }),
    // ============================================
    // Landlord Dashboard Stats
    // ============================================
    getLandlordStats: builder.query({
      query: () => ({
        url: `/investment/top-states`,
        method: "GET",
      }),
    }),
    // ============================================
    // Landlord Dashboard Stats
    // ============================================
    getInvestmentMyStatistics: builder.query({
      query: () => ({
        url: `/investment/my-statistics`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApartmentsStatsQuery,
  useGetLandlordStatsQuery,
  useGetInvestmentMyStatisticsQuery,
} = dashboardApi;
