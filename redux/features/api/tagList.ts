export const TAG_TYPES = ["User", "Auth", "Subscription", "VendorTasks", "Settings", "Request", "Message", "Permission", "Role", "TeamMember"] as const;

export type TagType = (typeof TAG_TYPES)[number];
