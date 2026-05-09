import RoleGuard from "@/components/provider/RoleGuard";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["landlord"]}>{children}</RoleGuard>;
}
