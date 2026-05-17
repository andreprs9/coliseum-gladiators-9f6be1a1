import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";

export type Role = "treinador" | "atleta";

interface RoleContextValue {
  role: Role;
  setRole: (r: Role) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { role: supabaseRole } = useAuth();
  const [role, setRoleState] = useState<Role | null>(null);

  useEffect(() => {
    if (supabaseRole === null) return;
    if (supabaseRole === "admin") {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem("gladiators.role") : null;
      setRoleState((saved as Role) ?? "treinador");
    } else {
      setRoleState("atleta");
    }
  }, [supabaseRole]);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") window.localStorage.setItem("gladiators.role", r);
  };

  if (role === null) return null;

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
