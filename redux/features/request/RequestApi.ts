// bookingRequestApi.ts
import { baseApi } from "@/redux/features/api/baseApi";
import type {
  BookingRequestsResponse,
  BookingRequestsData,
  GetBookingRequestsQueryParams,
  BookingRequestDetailsResponse,
  BookingRequestDetails,
  MaintenanceRequestsData,
  GetMaintenanceRequestsQueryParams,
  MaintenanceRequestsResponse,
  MaintenanceRequestDetails,
  MaintenanceRequestDetailsResponse,
  PropertyTourRequestsData,
  GetPropertyTourRequestsQueryParams,
  PropertyTourRequestsResponse,
  PropertyTourRequestDetails,
  PropertyTourRequestDetailsResponse,
  InvestmentApplicationDetailsResponse,
  InvestmentApplicationDetails,
  InvestmentApplicationsResponse,
  InvestmentApplicationsData,
  GetInvestmentApplicationsQueryParams,
  // Import new types for apartment requests
  ApartmentRequestsData,
  GetApartmentRequestsQueryParams,
  ApartmentRequestsResponse,
  ApartmentRequestDetails,
  ApartmentRequestDetailsResponse,
  // Apartment stats types
  ApartmentStats,
  ApartmentStatsResponse,
  // Property listing request stats types
  PropertyListingRequestStats,
  PropertyListingRequestStatsResponse,
  // Admin all apartments types
  AdminAllApartment,
  AdminAllApartmentsResponse,
  GetAllAdminApartmentsQueryParams,
  // Admin apartment details types
  AdminApartmentDetails,
  AdminApartmentDetailsResponse,
} from "./RequestTypes";

export const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookingRequests: builder.query<
      BookingRequestsData,
      GetBookingRequestsQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/a/tenant-requests/booking",
        method: "GET",
        params,
      }),
      transformResponse: (res: BookingRequestsResponse) => res.data,
      providesTags: ["Request"],
    }),

    getBookingRequestById: builder.query<BookingRequestDetails, string>({
      query: (id) => ({
        url: `/dashboard/a/tenant-requests/booking/${id}`,
        method: "GET",
      }),
      transformResponse: (res: BookingRequestDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Request", id }],
    }),

    getMaintenanceRequests: builder.query<
      MaintenanceRequestsData,
      GetMaintenanceRequestsQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/a/tenant-requests/maintenance",
        method: "GET",
        params,
      }),
      transformResponse: (res: MaintenanceRequestsResponse) => res.data,
      providesTags: ["Request"],
    }),

    getMaintenanceRequestById: builder.query<MaintenanceRequestDetails, string>(
      {
        query: (id) => ({
          url: `/dashboard/a/tenant-requests/maintenance/${id}`,
          method: "GET",
        }),
        transformResponse: (res: MaintenanceRequestDetailsResponse) => res.data,
        providesTags: (_result, _err, id) => [{ type: "Request", id }],
      },
    ),

    getPropertyTourRequests: builder.query<
      PropertyTourRequestsData,
      GetPropertyTourRequestsQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/a/tenant-requests/property-tour",
        method: "GET",
        params,
      }),
      transformResponse: (res: PropertyTourRequestsResponse) => res.data,
      providesTags: ["Request"],
    }),

    getPropertyTourRequestById: builder.query<
      PropertyTourRequestDetails,
      string
    >({
      query: (id) => ({
        url: `/dashboard/a/tenant-requests/property-tour/${id}`,
        method: "GET",
      }),
      transformResponse: (res: PropertyTourRequestDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Request", id }],
    }),

    updatePropertyTourRequestStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: "approved" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/dashboard/a/tenant-requests/property-tour/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Request", id },
        "Request",
      ],
    }),

    // Get all investment applications with pagination and filtering
    getInvestmentApplications: builder.query<
      InvestmentApplicationsData,
      GetInvestmentApplicationsQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/a/investment-applications",
        method: "GET",
        params,
      }),
      transformResponse: (res: InvestmentApplicationsResponse) => res.data,
      providesTags: ["InvestmentApplication"],
    }),

    // Get investment application by ID
    getInvestmentApplicationById: builder.query<
      InvestmentApplicationDetails,
      string
    >({
      query: (id) => ({
        url: `/dashboard/a/investment-applications/${id}`,
        method: "GET",
      }),
      transformResponse: (res: InvestmentApplicationDetailsResponse) =>
        res.data,
      providesTags: (_result, _err, id) => [
        { type: "InvestmentApplication", id },
      ],
    }),

    // Update investment application status
    updateInvestmentApplicationStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: "pending" | "active" | "cancelled" }
    >({
      query: ({ id, status }) => ({
        url: `/dashboard/a/investment-applications/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "InvestmentApplication", id },
        "InvestmentApplication",
      ],
    }),

    // ============================================
    // NEW: Apartment Request Endpoints
    // ============================================

    // Get all apartment requests with pagination and filtering
    getApartmentRequests: builder.query<
      ApartmentRequestsData,
      GetApartmentRequestsQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/a/tenant-requests/apartment-request",
        method: "GET",
        params,
      }),
      transformResponse: (res: ApartmentRequestsResponse) => res.data,
      providesTags: ["Request"],
    }),

    // Get apartment request by ID
    getApartmentRequestById: builder.query<ApartmentRequestDetails, string>({
      query: (id) => ({
        url: `/dashboard/a/tenant-requests/apartment-request/${id}`,
        // url: `/dashboard/a/tenant-requests/apartment-request/${id}`,
        method: "GET",
      }),
      transformResponse: (res: ApartmentRequestDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Request", id }],
    }),

    // Get apartment stats
    getApartmentStats: builder.query<ApartmentStats, void>({
      query: () => ({
        url: "/apartments/admin-apartments-stats",
        method: "GET",
      }),
      transformResponse: (res: ApartmentStatsResponse) => res.data,
      providesTags: ["Request"],
    }),

    // Get property listing request stats
    getPropertyListingRequestStats: builder.query<
      PropertyListingRequestStats,
      void
    >({
      query: () => ({
        url: "/apartments/admin-stats",
        method: "GET",
      }),
      transformResponse: (res: PropertyListingRequestStatsResponse) => res.data,
      providesTags: ["Request"],
    }),

    // Get all admin apartments
    getAllAdminApartments: builder.query<
      AdminAllApartment[],
      GetAllAdminApartmentsQueryParams
    >({
      query: (params) => ({
        url: "/apartments/admin-all-apartments",
        method: "GET",
        params,
      }),
      transformResponse: (res: AdminAllApartmentsResponse) => res.data,
      providesTags: ["Request"],
    }),

    getPropertyListingRequestDetails: builder.query<AdminApartmentDetails, string>({
      query: (id) => ({
        url: `/apartments/admin-all-apartments/details/${id}`,
        method: "GET",
      }),
      transformResponse: (res: AdminApartmentDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Request", id }],
    }),

    updatePropertyListingRequestStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: "approved" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/apartments/${id}/approve`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Request", id },
        "Request",
      ],
    }),

    // Update apartment request status (if applicable)
    // updateApartmentRequestStatus: builder.mutation<
    //   { success: boolean; message: string },
    //   { id: string; status: 'pending' | 'approved' | 'rejected' | 'canceled' }
    // >({
    //   query: ({ id, status }) => ({
    //     url: `/dashboard/a/tenant-requests/apartment-request/${id}/status`,
    //     method: "PATCH",
    //     body: { status },
    //   }),
    //   invalidatesTags: (_result, _err, { id }) => [
    //     { type: "Request", id },
    //     "Request",
    //   ],
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookingRequestsQuery,
  useGetBookingRequestByIdQuery,
  useGetMaintenanceRequestsQuery,
  useGetMaintenanceRequestByIdQuery,
  useGetPropertyTourRequestsQuery,
  useGetPropertyTourRequestByIdQuery,
  useUpdatePropertyTourRequestStatusMutation,
  useGetInvestmentApplicationsQuery,
  useGetInvestmentApplicationByIdQuery,
  useUpdateInvestmentApplicationStatusMutation,
  // New exports for apartment requests
  useGetApartmentRequestsQuery,
  useGetApartmentRequestByIdQuery,
  useGetApartmentStatsQuery,
  useGetPropertyListingRequestStatsQuery,
  useGetAllAdminApartmentsQuery,
  useGetPropertyListingRequestDetailsQuery,
  useUpdatePropertyListingRequestStatusMutation,
  // useUpdateApartmentRequestStatusMutation,
} = requestApi;
