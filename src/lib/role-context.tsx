import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "treinador" | "atleta";

interface RoleContextValue {
  role: Role;
  setRole: (r: Role) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("atleta");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("gladiators.role") : null;
    if (saved === "treinador" || saved === "atleta") setRoleState(saved);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") window.localStorage.setItem("gladiators.role", r);
  };

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
