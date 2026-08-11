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
} from "./RequestTypes";

export const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getBookingRequests: builder.query<BookingRequestsData, GetBookingRequestsQueryParams>({
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

    getMaintenanceRequests: builder.query<MaintenanceRequestsData, GetMaintenanceRequestsQueryParams>({
      query: (params) => ({
        url: "/dashboard/a/tenant-requests/maintenance",
        method: "GET",
        params,
      }),
      transformResponse: (res: MaintenanceRequestsResponse) => res.data,
      providesTags: ["Request"],
    }),

    getMaintenanceRequestById: builder.query<MaintenanceRequestDetails, string>({
      query: (id) => ({
        url: `/dashboard/a/tenant-requests/maintenance/${id}`,
        method: "GET",
      }),
      transformResponse: (res: MaintenanceRequestDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Request", id }],
    }),

    getPropertyTourRequests: builder.query<PropertyTourRequestsData, GetPropertyTourRequestsQueryParams>({
      query: (params) => ({
        url: "/dashboard/a/tenant-requests/property-tour",
        method: "GET",
        params,
      }),
      transformResponse: (res: PropertyTourRequestsResponse) => res.data,
      providesTags: ["Request"],
    }),

    getPropertyTourRequestById: builder.query<PropertyTourRequestDetails, string>({
      query: (id) => ({
        url: `/dashboard/a/tenant-requests/property-tour/${id}`,
        method: "GET",
      }),
      transformResponse: (res: PropertyTourRequestDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Request", id }],
    }),

    // Get all investment applications with pagination and filtering
    getInvestmentApplications: builder.query<InvestmentApplicationsData, GetInvestmentApplicationsQueryParams>({
      query: (params) => ({
        url: "/dashboard/a/investment-applications",
        method: "GET",
        params,
      }),
      transformResponse: (res: InvestmentApplicationsResponse) => res.data,
      providesTags: ["InvestmentApplication"],
    }),

    // Get investment application by ID
    getInvestmentApplicationById: builder.query<InvestmentApplicationDetails, string>({
      query: (id) => ({
        url: `/dashboard/a/investment-applications/${id}`,
        method: "GET",
      }),
      transformResponse: (res: InvestmentApplicationDetailsResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "InvestmentApplication", id }],
    }),

    // Update investment application status
    updateInvestmentApplicationStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: 'pending' | 'active' | 'cancelled' }
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
    getApartmentRequests: builder.query<ApartmentRequestsData, GetApartmentRequestsQueryParams>({
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
  useGetInvestmentApplicationsQuery,
  useGetInvestmentApplicationByIdQuery,
  useUpdateInvestmentApplicationStatusMutation,
  // New exports for apartment requests
  useGetApartmentRequestsQuery,
  useGetApartmentRequestByIdQuery,
  // useUpdateApartmentRequestStatusMutation,
} = requestApi;