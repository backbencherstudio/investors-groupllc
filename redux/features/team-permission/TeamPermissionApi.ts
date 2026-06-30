import { baseApi } from "@/redux/features/api/baseApi";
import type {
  PermissionResponse,
  Role,
  RolesListResponse,
  CreateRoleData,
  UpdateRoleData,
  GetRolesQueryParams,
} from "./TeamPermissionTypes";

export const teamPermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ============================================
    // GET ALL PERMISSIONS
    // ============================================
    getPermissions: builder.query<PermissionResponse['data'], void>({
      query: () => ({
        url: `/dashboard/team-permission/permissions`,
        method: "GET",
      }),
      transformResponse: (res: PermissionResponse) => res.data,
      providesTags: ["Permission"],
    }),

    // ============================================
    // GET ALL ROLES
    // ============================================
    getRoles: builder.query<RolesListResponse['data'], GetRolesQueryParams>({
      query: (params) => ({
        url: `/dashboard/team-permission/roles`,
        method: "GET",
        params,
      }),
      transformResponse: (res: RolesListResponse) => res.data,
      providesTags: ["Role"],
    }),

    // ============================================
    // CREATE ROLE
    // ============================================
    createRole: builder.mutation<Role, CreateRoleData>({
      query: (data) => ({
        url: `/dashboard/team-permission/roles`,
        method: "POST",
        body: data,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["Role"],
    }),

    // ============================================
    // UPDATE ROLE
    // ============================================
    updateRole: builder.mutation<Role, { id: string; data: UpdateRoleData }>({
      query: ({ id, data }) => ({
        url: `/dashboard/team-permission/roles/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Role", id },
        "Role",
      ],
    }),

    // ============================================
    // DELETE ROLE
    // ============================================
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/dashboard/team-permission/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: "Role", id },
        "Role",
      ],
    }),

  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const {
  useGetPermissionsQuery,
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = teamPermissionApi;