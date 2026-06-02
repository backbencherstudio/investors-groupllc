export interface ContactsApiResponse {
  success: boolean;
  message: string;
  data: {
    items: Contact[];
    pagination: Pagination;
  };
}
  
export interface Contact {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  onlineStatus: OnlineStatus;
  conversationId: string | null;
  lastMessage: string | null;
}
  
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}

export type OnlineStatus = "online" | "offline" | "away" | "busy";

//   conversation types

export interface ConversationsResponse {
  success: boolean;
  message: string;
  data: {
    items: Conversation[];
    pagination: Pagination;
  };
}
  
export interface Conversation {
  id: string;
  participant: Participant;
  lastMessage: LastMessage | null;
  unreadCount: number;
  updatedAt: string;
  createdAt: string;
}
  
export interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  onlineStatus: OnlineStatus;
}
  
export interface LastMessage {
  id: string;
  text: string;
  attachmentType: string | null;
  createdAt: string;
  senderId: string;
}

export interface CreateConversationRequest {
  participantId: string;
}

export interface CreateConversationResponse {
  success: boolean;
  message: string;
  data: Conversation;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  sender: Participant;
  receiver: Participant;
  text: string;
  attachment: MessageAttachment | null;
  status: "SENT" | "DELIVERED" | "READ" | string;
  createdAt: string;
  isMine: boolean;
  senderId?: string;
}

export interface MessagesResponse {
  success: boolean;
  message: string;
  data: {
    items: MessageItem[];
    pagination?: MessagesPagination;
  };
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface MessagesPagination {
  limit: number;
  nextCursor: string | null;
}

export interface SendMessageRequest {
  conversationId: string;
  formData: FormData;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: MessageItem;
}
