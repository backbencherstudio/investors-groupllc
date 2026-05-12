import { baseApi } from "@/redux/features/api/baseApi";
import type {
  Subscription,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionListResponse,
  SubscriptionResponse,
} from "./SubscriptionTypes";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSubscriptions: builder.query<Subscription[], void>({
      query: () => ({ url: "/admin/subscription-plan", method: "GET" }),
      transformResponse: (res: SubscriptionListResponse) => res.data,
      providesTags: ["Subscription"],
    }),

    getSubscriptionById: builder.query<Subscription, string>({
      query: (id) => ({ url: "/subscriptions/${id}", method: "GET" }),
      transformResponse: (res: SubscriptionResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Subscription", id }],
    }),

    createSubscription: builder.mutation<Subscription, CreateSubscriptionDto>({
      query: (body) => ({ url: "/admin/subscription-plan", method: "POST", body }),
      transformResponse: (res: SubscriptionResponse) => res.data,
      invalidatesTags: ["Subscription"],
    }),
    // Update subscription (PATCH)
    updateSubscription: builder.mutation<Subscription, { id: string } & Partial<CreateSubscriptionDto>>({
      query: ({ id, ...body }) => ({
        url: `/admin/subscription-plan/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Subscription', id }, 'Subscription'],
    }),

    deleteSubscription: builder.mutation<void, string>({
      query: (id) => ({ url: "/subscriptions/${id}", method: "DELETE" }),
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
} = subscriptionApi;
