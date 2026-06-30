import { baseApi } from "@/redux/features/api/baseApi";
import type {
  PermissionResponse,
  Role,
  RolesListResponse,
  CreateRoleData,
  UpdateRoleData,
  GetRolesQueryParams,
  TeamMembersResponse,
  TeamMemberResponse,
  CreateTeamMemberData,
  UpdateTeamMemberData,
  DeleteTeamMemberResponse,
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
      query: () => ({
        url: `/dashboard/team-permission/roles`,
        method: "GET",
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

    // ============================================
    // GET ALL TEAM MEMBERS
    // ============================================
    getTeamMembers: builder.query<
      TeamMembersResponse['data'],
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) {
          params.append('search', search);
        }
        return {
          url: `/dashboard/team-permission?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (res: TeamMembersResponse) => res.data,
      providesTags: ["TeamMember"],
    }),

    // ============================================
    // GET TEAM MEMBER BY ID
    // ============================================
    getTeamMemberById: builder.query<TeamMemberResponse['data'], string>({
      query: (id) => ({
        url: `/dashboard/team-permission/${id}`,
        method: "GET",
      }),
      transformResponse: (res: TeamMemberResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "TeamMember", id }],
    }),

    // ============================================
    // CREATE TEAM MEMBER
    // ============================================
    createTeamMember: builder.mutation<TeamMemberResponse['data'], CreateTeamMemberData>({
      query: (data) => ({
        url: `/dashboard/team-permission`,
        method: "POST",
        body: data,
      }),
      transformResponse: (res: TeamMemberResponse) => res.data,
      invalidatesTags: ["TeamMember"],
    }),

    // ============================================
    // UPDATE TEAM MEMBER
    // ============================================
    updateTeamMember: builder.mutation<
      TeamMemberResponse['data'],
      { id: string; data: UpdateTeamMemberData }
    >({
      query: ({ id, data }) => ({
        url: `/dashboard/team-permission/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (res: TeamMemberResponse) => res.data,
      invalidatesTags: (_result, _err, { id }) => [
        { type: "TeamMember", id },
        "TeamMember",
      ],
    }),

    // ============================================
    // DELETE TEAM MEMBER
    // ============================================
    deleteTeamMember: builder.mutation<DeleteTeamMemberResponse, string>({
      query: (id) => ({
        url: `/dashboard/team-permission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: "TeamMember", id },
        "TeamMember",
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
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamPermissionApi;