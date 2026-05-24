// UserApi.ts
import { baseApi } from "@/redux/features/api/baseApi";
import type {
  User,
  UserListResponse,
  GetUsersQueryParams,
  UserRole,
} from "./UserTypes";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // getAllUsers: builder.query<UserListResponse['data'], GetUsersQueryParams>({
    //   query: (params) => {
    //     const queryParams = new URLSearchParams();
    //     if (params?.page) queryParams.append('page', params.page.toString());
    //     if (params?.limit) queryParams.append('limit', params.limit.toString());
    //     if (params?.search) queryParams.append('search', params.search);
    //     if (params?.type) queryParams.append('type', params.type);
    //     if (params?.status) queryParams.append('status', params.status);

    //     return {
    //       url: `/dashboard/users?${queryParams.toString()}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (res: UserListResponse) => res.data,
    //   providesTags: ["User"],
    // }),
    getAllUsers: builder.query<UserListResponse['data'], GetUsersQueryParams>({
      query: (params) => ({
        url: `/dashboard/users`,
        method: "GET",
        params,
      }),
      transformResponse: (res: UserListResponse) => res.data,
      providesTags: ["User"],
    }),


    getUserById: builder.query<any, string>({
      query: (id) => ({ url: `/dashboard/users/${id}`, method: "GET" }),
      transformResponse: (res: any) => res.data,
      providesTags: (_result, _err, id) => [{ type: "User", id }],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} = userApi;


// https://gueloprboy.anikstudio.com/api/dashboard/users/cmne8o4b60003m0ag6up8h9k4?