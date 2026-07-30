import { baseApi } from "@/redux/features/api/baseApi";

export const propertyTourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET ALL Booking
    // ============================================
    getBooking: builder.query({
      query: () => ({
        url: `/landlord/request/apartment`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    // ============================================
    // GET Single Booking
    // ============================================
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/landlord/request/${id}/apartment`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
  }),
  overrideExisting: false,
});
export const { useGetBookingQuery, useGetSingleBookingQuery } = propertyTourApi;
