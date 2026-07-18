import { baseApi } from "@/redux/features/api/baseApi";
import type {
  Subscription,
  CreateSubscriptionDto,
  SubscriptionResponse,
  SubscriptionStats,
  SubscriptionStatsResponse,
  SubscriptionListQueryParams,
  PaginatedSubscriptionListResponse,
} from "./SubscriptionTypes";

function normalizeSubscriptionPlansPayload(res: unknown): Subscription[] {
  if (Array.isArray(res)) return res;
  if (!res || typeof res !== "object") return [];
  const data = (res as { data?: unknown }).data;
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    const items = (data as { items?: unknown }).items;
    if (Array.isArray(items)) return items;
  }
  return [];
}

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get subscription stats
    getSubscriptionStats: builder.query<SubscriptionStats, void>({
      query: () => ({ url: "/admin/subscription-plan/stats", method: "GET" }),
      transformResponse: (res: SubscriptionStatsResponse) => res.data,
      providesTags: ["Subscription"],
    }),
    getSubscriptionList: builder.query<
      PaginatedSubscriptionListResponse["data"],
      SubscriptionListQueryParams
    >({
      query: (params) => ({
        url: "/admin/subscription-plan/list",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          search: params?.search,
          status: params?.status,
          period: params?.period,
        },
      }),
      transformResponse: (res: PaginatedSubscriptionListResponse) => res.data,
      providesTags: ["Subscription"],
    }),

    getAllSubscriptions: builder.query<Subscription[], void>({
      query: () => ({
        url: "/admin/subscription-plan?includeInactive=true",
        method: "GET",
      }),
      transformResponse: (res: unknown) =>
        normalizeSubscriptionPlansPayload(res),
      providesTags: ["Subscription"],
    }),

    getSubscriptionById: builder.query<Subscription, string>({
      query: (id) => ({
        url: "/subscriptions/${id}",
        method: "GET",
      }),
      transformResponse: (res: SubscriptionResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Subscription", id }],
    }),

    createSubscription: builder.mutation<Subscription, CreateSubscriptionDto>({
      query: (body) => ({
        url: "/admin/subscription-plan",
        method: "POST",
        body,
      }),
      transformResponse: (res: SubscriptionResponse) => res.data,
      invalidatesTags: ["Subscription"],
    }),
    // Update subscription (PATCH)
    updateSubscription: builder.mutation<
      Subscription,
      { id: string } & Partial<CreateSubscriptionDto>
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/subscription-plan/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Subscription", id },
        "Subscription",
      ],
    }),

    deleteSubscription: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/subscription-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
  // overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetSubscriptionStatsQuery,
  useGetSubscriptionListQuery,
} = subscriptionApi;
