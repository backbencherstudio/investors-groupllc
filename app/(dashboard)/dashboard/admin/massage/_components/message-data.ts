export type ConversationRole = "Tenant" | "Vendor" | "Landlord" | "Investor";

export type Conversation = {
  id: string;
  name: string;
  role: ConversationRole;
  avatar: string;
  lastMessage: string;
  lastMessageAt: string;
  online: boolean;
  unread: number;
};

export type ChatMessage = {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

export const conversations: Conversation[] = [
  {
    id: "1",
    name: "John Whilham",
    role: "Tenant",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastMessage: "Can we schedule a maintenance visit today?",
    lastMessageAt: "Now",
    online: true,
    unread: 3,
  },
  {
    id: "2",
    name: "Esther Howard",
    role: "Vendor",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    lastMessage: "I have uploaded the repair invoice.",
    lastMessageAt: "5 min",
    online: true,
    unread: 0,
  },
  {
    id: "3",
    name: "Brooklyn Simmons",
    role: "Landlord",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    lastMessage: "Please review the tenant request.",
    lastMessageAt: "32 min",
    online: false,
    unread: 1,
  },
  {
    id: "4",
    name: "Mr. Joe",
    role: "Investor",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    lastMessage: "Perfect. Thank you so much.",
    lastMessageAt: "12 hr",
    online: true,
    unread: 0,
  },
  {
    id: "5",
    name: "Cameron Williamson",
    role: "Tenant",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    lastMessage: "The sink is still leaking again.",
    lastMessageAt: "1 day",
    online: false,
    unread: 0,
  },
  {
    id: "6",
    name: "Jenny Wilson",
    role: "Vendor",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    lastMessage: "I can reach the property by 3 PM.",
    lastMessageAt: "2 days",
    online: false,
    unread: 2,
  },
];

export const messagesByConversation: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "1-1",
      sender: "them",
      text: "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
      time: "06:20 PM",
    },
    {
      id: "1-2",
      sender: "me",
      text: "Sure, I can help with that. Is today afternoon okay for you?",
      time: "06:24 PM",
      status: "read",
    },
    {
      id: "1-3",
      sender: "them",
      text: "Yes, today afternoon works for me.",
      time: "06:30 PM",
    },
  ],
  "2": [
    {
      id: "2-1",
      sender: "them",
      text: "The repair has been completed and I have uploaded the invoice.",
      time: "04:12 PM",
    },
    {
      id: "2-2",
      sender: "me",
      text: "Thanks, I will review it shortly.",
      time: "04:18 PM",
      status: "delivered",
    },
  ],
  "3": [
    {
      id: "3-1",
      sender: "them",
      text: "Please review the tenant request before approving it.",
      time: "02:41 PM",
    },
  ],
  "4": [
    {
      id: "4-1",
      sender: "me",
      text: "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
      time: "06:30 PM",
      status: "read",
    },
    {
      id: "4-2",
      sender: "them",
      text: "Perfect. Thank you so much.",
      time: "06:34 PM",
    },
    {
      id: "4-3",
      sender: "me",
      text: "I will keep you updated once the vendor confirms the visit.",
      time: "06:40 PM",
      status: "sent",
    },
  ],
  "5": [
    {
      id: "5-1",
      sender: "them",
      text: "The sink is still leaking again. Can someone check this week?",
      time: "10:05 AM",
    },
  ],
  "6": [
    {
      id: "6-1",
      sender: "them",
      text: "I can reach the property by 3 PM.",
      time: "Yesterday",
    },
    {
      id: "6-2",
      sender: "me",
      text: "Great, I will notify the tenant.",
      time: "Yesterday",
      status: "delivered",
    },
  ],
};
