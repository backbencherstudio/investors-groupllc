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
      providesTags: [{ type: "Request", id: "LANDLORD_TOURS" }],
    }),
    // ============================================
    // GET Single Property Tour
    // ============================================
    getSinglePropertyTour: builder.query({
      query: (id) => ({
        url: `landlord/request/${id}/tour`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_result, _error, id) => [{ type: "Request", id }],
    }),
    // ============================================
    // Post Property Tour
    // ============================================
    subscriptionCreate: builder.mutation({
      query: (data) => ({
        url: `/landlord/subscription/create`,
        method: "POST",
        body: data,
      }),
      //   transformResponse: (res) => res.data,
    }),
    // ============================================
    // Confirm Property Tour
    // ============================================
    updateLandlordPropertyTourStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: "confirmed" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/tour/confirmed-tour/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Request", id: "LANDLORD_TOURS" },
        { type: "Request", id },
      ],
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const {
  useGetPropertyTourQuery,
  useGetSinglePropertyTourQuery,
  useSubscriptionCreateMutation,
  useUpdateLandlordPropertyTourStatusMutation,
} = propertyTourApi;
