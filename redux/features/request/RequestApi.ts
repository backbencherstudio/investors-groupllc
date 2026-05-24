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
} = requestApi;