import { baseApi } from "@/redux/features/api/baseApi";

export const vendorTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // ALL vendor task
    // ============================================
    getVendorTask: builder.query({
      query: (params?: { page?: number; limit?: number }) => ({
        url: `/landlord/vendor-task`,
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
export const { useGetVendorTaskQuery } = vendorTaskApi;
