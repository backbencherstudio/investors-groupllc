import { baseApi } from "@/redux/features/api/baseApi";

export const teamPermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // ALL Apartments
    // ============================================
    getApartments: builder.query({
      query: () => ({
        url: `/apartments/my-apartments`,
        method: "GET",
      }),
    }),
    subscriptionCreate: builder.mutation({
      query: (data) => ({
        url: `/landlord/subscription/create`,
        method: "POST",
        body: data,
      }),
      //   transformResponse: (res) => res.data,
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const { useGetApartmentsQuery, useSubscriptionCreateMutation } =
  teamPermissionApi;
