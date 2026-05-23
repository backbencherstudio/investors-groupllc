export const TAG_TYPES = ["User", "Auth", "Subscription", "VendorTasks"] as const;

export type TagType = (typeof TAG_TYPES)[number];
