import { useEffect, useState } from "react";
import apiClient from "@/lib/api/client";

export type UserRole = "Admin" | "Trainer" | "User";

export interface UserRolesResponse {
  userId: string;
  email: string;
  roles: UserRole[];
}

export function useUserRoles() {
  const [roles, setRoles] = useState<UserRole[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get<UserRolesResponse>(
          "/api/identity/role"
        );
        setRoles(res.data.roles);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        setRoles(null);
      } finally {
        setLoading(false);
      }
    }
    fetchRoles();
  }, []);

  return { roles, loading, error };
}
