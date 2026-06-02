// redux/features/message/MessageApi.ts
import { baseApi } from "@/redux/features/api/baseApi";
import type {
  ContactsApiResponse,
  ConversationsResponse,
  CreateConversationRequest,
  CreateConversationResponse,
  MessagesResponse,
  SendMessageRequest,
  SendMessageResponse,
} from "./MessageTypes";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<ContactsApiResponse, void>({
      query: () => ({
        url: "/dashboard/messages/contacts",
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    getConversations: builder.query<ConversationsResponse, void>({
      query: () => ({
        url: "/dashboard/messages/conversations",
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    createConversation: builder.mutation<
      CreateConversationResponse,
      CreateConversationRequest
    >({
      query: (body) => ({
        url: "/dashboard/messages/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),

    getMessages: builder.query<MessagesResponse, string>({
      query: (conversationId) => ({
        url: `/dashboard/messages/conversations/${conversationId}/messages`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: ({ conversationId, formData }) => ({
        url: `/dashboard/messages/conversations/${conversationId}/messages`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Message"],
    }),
    // /dashboard/messages/conversations/cmptfick70001tj9o7t4wcwgx/read
    markMessageAsRead: builder.mutation<any, { conversationId: string }>({
      query: ({ conversationId }) => ({
        url: `/dashboard/messages/conversations/${conversationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),

    // dashboard/messages/conversations/cmptfick70001tj9o7t4wcwgx
    deleteConversation: builder.mutation<any, string>({
      query: (conversationId) => ({
        url: `/dashboard/messages/conversations/${conversationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
  overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useGetContactsQuery,
  useGetConversationsQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkMessageAsReadMutation,
  useDeleteConversationMutation,
} = messageApi;