import { baseApi } from "@/redux/features/api/baseApi";

export interface UpdateBookingStatusPayload {
  id: string;
  status: "approved" | "rejected";
  reason: string;
}

export interface BookingRequestListItem {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tenant: {
    id: string;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    type: string;
    avatar_url: string | null;
  };
  apartment: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    first_image_url: string;
  };
}

export const propertyTourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET ALL Booking
    // ============================================
    getBooking: builder.query<BookingRequestListItem[], void>({
      query: () => ({
        url: `/landlord/request/apartment`,
        method: "GET",
      }),
      transformResponse: (res: { data: BookingRequestListItem[] }) => res.data,
      providesTags: (result) => [
        { type: "Request", id: "BOOKING_LIST" },
        ...(result?.map(({ id }) => ({ type: "Request" as const, id })) ?? []),
      ],
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
      providesTags: (_result, _error, id) => [{ type: "Request", id }],
    }),


    // ============================================
    // Approve or reject booking
    // ============================================
    updateBookingStatus: builder.mutation<
      unknown,
      UpdateBookingStatusPayload
    >({
      query: ({ id, status, reason }) => ({
        url: `/landlord/request/${id}/apartment`,
        method: "PATCH",
        body: {
          status,
          reason,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Request", id: "BOOKING_LIST" },
        { type: "Request", id },
      ],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetBookingQuery,
  useGetSingleBookingQuery,
  useUpdateBookingStatusMutation,
} = propertyTourApi;
