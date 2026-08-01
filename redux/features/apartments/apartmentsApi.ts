import { baseApi } from "../api/baseApi";
import { FetchApartmentsResponse, FetchApartmentStatsResponse, GetApartmentsQueryParams } from "./apartmentsTypes";

export const apartmentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getApartmentsStats: builder.query<FetchApartmentStatsResponse, void>({
            query: () => ({
                url: "/apartments/admin-apartments-stats",
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

    })
})

export const { useGetApartmentsStatsQuery, useGetRentalPropertiesListQuery } = apartmentsApi;   