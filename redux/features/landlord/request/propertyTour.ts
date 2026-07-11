import { baseApi } from "@/redux/features/api/baseApi";

export const propertyTourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET ALL Property Tour
    // ============================================
    getPropertyTour: builder.query({
      query: () => ({
        url: `/landlord/request/tour`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["SubscriptionPlans"],
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
export const { useGetPropertyTourQuery, useSubscriptionCreateMutation } =
  propertyTourApi;
