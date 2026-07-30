import { baseApi } from "@/redux/features/api/baseApi";

export const teamPermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET ALL PERMISSIONS
    // ============================================
    getViewSubscriptionPlans: builder.query({
      query: () => ({
        url: `/landlord/subscription/plans`,
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
export const {
  useGetViewSubscriptionPlansQuery,
  useSubscriptionCreateMutation,
} = teamPermissionApi;
