export const TAG_TYPES = ["User", "Auth", "Subscription", "VendorTasks", "Settings", "Request"] as const;

export type TagType = (typeof TAG_TYPES)[number];
