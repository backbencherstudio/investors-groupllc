import { baseApi } from "@/redux/features/api/baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // ALL conversations
    // ============================================
    getAllConversations: builder.query({
      query: () => ({
        url: `/dashboard/messages/conversations`,
        method: "GET",
      }),
    }),
    // ============================================
    // Create conversations
    // ============================================
    createConversations: builder.mutation({
      query: (body) => ({
        url: `/dashboard/messages/conversations`,
        method: "POST",
        body,
      }),
    }),
    // ============================================
    // All Messages
    // ============================================
    getAllMessag: builder.query({
      query: (id) => ({
        url: `/dashboard/messages/conversations/${id}/messages`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// ============================================
// EXPORT HOOKS
// ============================================
export const {
  useGetAllConversationsQuery,
  useCreateConversationsMutation,
  useGetAllMessagQuery,
} = messageApi;
