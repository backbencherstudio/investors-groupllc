import RoleGuard from "@/components/provider/RoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>;
}
