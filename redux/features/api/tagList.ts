export const TAG_TYPES = ["User", "Auth", "Subscription"] as const;

export type TagType = (typeof TAG_TYPES)[number];
