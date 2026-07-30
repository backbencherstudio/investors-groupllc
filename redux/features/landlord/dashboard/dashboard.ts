import { baseApi } from "@/redux/features/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // Landlord Dashboard Stats
    // ============================================
    getLandlordStats: builder.query({
      query: () => ({
        url: `/apartments/top-states`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetLandlordStatsQuery } = dashboardApi;
