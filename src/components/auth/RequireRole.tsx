import { ReactNode } from "react";
import { useUserRoles, UserRole } from "@/lib/hooks/useUserRoles";
import { useRouter } from "next/navigation";

interface RequireRoleProps {
  requiredRoles: UserRole[];
  children: ReactNode;
}

export function RequireRole({ requiredRoles, children }: RequireRoleProps) {
  const { roles, loading } = useUserRoles();
  const router = useRouter();

  if (loading) return null; // Możesz tu dodać spinner
  if (!roles || !roles.some(role => requiredRoles.includes(role))) {
    router.replace("/unauthorized");
    return null;
  }
  return <>{children}</>;
}
