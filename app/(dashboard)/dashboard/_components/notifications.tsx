"use client";

import { useState } from "react";
import { Bell, Check, Mail, MoreVertical, User, X } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "message" | "mention" | "follow";
}

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New message from Sarah",
      description: "Hey, can we schedule a meeting tomorrow?",
      time: "2 min ago",
      read: false,
      type: "message",
    },
    {
      id: "2",
      title: "John mentioned you",
      description: "in the Marketing campaign discussion",
      time: "1 hour ago",
      read: false,
      type: "mention",
    },
    {
      id: "3",
      title: "New follower",
      description: "Michael started following your updates",
      time: "3 hours ago",
      read: false,
      type: "follow",
    },
    {
      id: "4",
      title: "Design team update",
      description: "The team shared 3 new files",
      time: "Yesterday",
      read: true,
      type: "message",
    },
  ]);

  // const unreadCount = notifications.filter(
  //   (notification) => !notification.read
  // ).length;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <Mail className="h-6 w-6   " />;
      case "mention":
        return <User className="h-6 w-6  " />;
      case "follow":
        return <User className="h-6 w-6 " />;
      default:
        return <Mail className="h-6 w-6 " />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )} */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="md:w-[440px] min-w-auto ml-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100">
              <Mail className="h-5 w-5 text-amber-500" />
            </div>
            <span className="text-lg font-medium">Inbox</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-[#D80] hover:text-amber-600 hover:bg-transparent"
            onClick={markAllAsRead}
          >
            <Check className="mr-1 h-4 w-4" />
            Mark as read
          </Button>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[370px]  overflow-y-hidden space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 p-3 hover:bg-gray-50",
                  !notification.read && "bg-[#FCF1E6]"
                )}
              >
                <div
                  className={cn(
                    "mt-1.5  p-2 text-amber-500 rounded-md border border-[#FCF1E6] bg-amber-100/50",
                    !notification.read && "bg-[#D80] text-white"
                  )}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        !notification.read && "font-semibold"
                      )}
                    >
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as read
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Mail className="h-10 w-10 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">No notifications</p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button className="text-sm  mx-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-white shadow-none cursor-pointer">
            View more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.69149 7.09327C3.91613 6.83119 4.31069 6.80084 4.57277 7.02548L9.99936 11.6768L15.4259 7.02548C15.688 6.80084 16.0826 6.83119 16.3072 7.09327C16.5319 7.35535 16.5015 7.74991 16.2394 7.97455L10.4061 12.9745C10.172 13.1752 9.82667 13.1752 9.59261 12.9745L3.75928 7.97455C3.4972 7.74991 3.46685 7.35535 3.69149 7.09327Z"
                fill="#170A00"
              />
            </svg>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
