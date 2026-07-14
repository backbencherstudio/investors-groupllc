import { baseApi } from "@/redux/features/api/baseApi";

export const apartmentsApi = baseApi.injectEndpoints({
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
    createApartments: builder.mutation({
      query: (data) => ({
        url: `/apartments`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const { useGetApartmentsQuery, useCreateApartmentsMutation } =
  apartmentsApi;
