// UserApi.ts
import { baseApi } from "@/redux/features/api/baseApi";
import { GetTasksQueryParams, GetVendorsQueryParams, MaintenanceData, VendorDetailsResponse, VendorListData, VendorListResponse, VendorTasksResponse } from "./vendorTaskTypes";



export const vendorTaskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getVendorTasks: builder.query<VendorTasksResponse['data'], GetTasksQueryParams>({
            query: (params) => {
                return {
                    url: `/a/dashboard/maintenance/vendor-tasks`,
                    method: "GET",
                    params: params,
                };
            },
            transformResponse: (res: VendorTasksResponse) => res.data,
            providesTags: ["VendorTasks"],

        }),

        getAllVendors: builder.query<VendorListData, GetVendorsQueryParams>({
            query: (params) => ({
                url: `/a/dashboard/maintenance/vendors`,
                method: "GET",
                params: params,
            }),
            transformResponse: (res: VendorListResponse) => res.data,
            providesTags: ["VendorTasks"],
        }),
        // /a/dashboard/maintenance/cmoy697ic0001m0qol19hkjue/assign-vendor
        assignTaskToVendor: builder.mutation({
            query: ({ taskId, vendorId }: { taskId: string; vendorId: string }) => ({
                url: `/a/dashboard/maintenance/${taskId}/assign-vendor`,
                method: "PATCH",
                body: { vendorId },
            }),
            invalidatesTags: ["VendorTasks"],
        }),

        getVendorDetailsById: builder.query<VendorDetailsResponse, { id: string }>({
            query: ({ id }) => ({
                url: `a/dashboard/maintenance/${id}`,
                method: "GET",
            }),
       
            providesTags: ["VendorTasks"],
        }),

    }),
    overrideExisting: false,
});

export const {
    useGetVendorTasksQuery,
    useGetAllVendorsQuery,
    useAssignTaskToVendorMutation,
    useGetVendorDetailsByIdQuery,
} = vendorTaskApi;