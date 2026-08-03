import { baseApi } from "../api/baseApi";
import { ApiResponse, InvestmentApartmentItem } from "./apartmentsDetailsTypes";
import { FetchApartmentsResponse, FetchApartmentStatsResponse, GetApartmentsQueryParams, GetInvestmentApartmentsQueryParams, GetInvestmentApartmentsResponse, InvestorStatsResponse, RentalPropertyResponse } from "./apartmentsTypes";

export const apartmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getApartmentsStats: builder.query<FetchApartmentStatsResponse, void>({
      query: () => ({
        url: "/apartments/admin-apartments-stats",
        method: "GET",
      }),
    }),

    getInvestorsApartmentsStats: builder.query<InvestorStatsResponse, void>({
      query: () => ({
        url: "/dashboard/a/investment-properties/overview",
        method: "GET",
      }),
    }),

    getRentalPropertiesList: builder.query<FetchApartmentsResponse, GetApartmentsQueryParams | void>({
      query: (params) => ({
        url: "/apartments/admin-all-apartments",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.searchTerm && { searchTerm: params.searchTerm }),
          ...(params?.listingType && { listingType: params.listingType }),
        },
      }),
      providesTags: ["Apartments"], // Optional: add if you handle cache invalidation
    }),

    getInvestmentPropertiesList: builder.query<GetInvestmentApartmentsResponse, GetInvestmentApartmentsQueryParams | void>({
      query: (params) => ({
        url: "/apartments/admin-all-apartments",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.searchTerm && { searchTerm: params.searchTerm }),
          ...(params?.investmentType && { investmentType: params.investmentType }),
        },
      }),
      providesTags: ["Apartments"], // Optional: add if you handle cache invalidation
    }),

    // ====================   Get single rental property    =============

    getSingleRentalProperty: builder.query<
    RentalPropertyResponse,
      string
    >({
      query: (id: string) => ({
        url: `/apartments/admin-all-apartments/details/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'InvestmentApartment', id }],

    })

    ,
    // ==================  Get single investment property =============

    getSingleInvestmentProperty: builder.query<
      InvestmentApartmentItem,
      string
    >({
      query: (id: string) => ({
        url: `/dashboard/a/investment-properties/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'InvestmentApartment', id }],
      transformResponse: (response: ApiResponse<InvestmentApartmentItem>) =>
        response.data,
    }),
  }),

})


export const { useGetApartmentsStatsQuery, useGetRentalPropertiesListQuery, useGetInvestorsApartmentsStatsQuery, useGetInvestmentPropertiesListQuery, useGetSingleInvestmentPropertyQuery, useGetSingleRentalPropertyQuery } = apartmentsApi;   