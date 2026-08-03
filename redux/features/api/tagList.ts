export const TAG_TYPES = [
  "User",
  "Auth",
  "Subscription",
  "VendorTasks",
  "Settings",
  "Request",
  "Message",
  "Permission",
  "Role",
  "TeamMember",
  "SubscriptionPlans",
  "Apartment",
  "InvestmentApartment"
] as const;

export type TagType = (typeof TAG_TYPES)[number];