import { jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext, createContext } from "react";
import { u as useAuth } from "./router-BpKtBDtA.js";
const RoleContext = createContext(null);
function RoleProvider({ children }) {
  const { role: supabaseRole } = useAuth();
  const [role, setRoleState] = useState(null);
  useEffect(() => {
    if (supabaseRole === null) return;
    if (supabaseRole === "admin") {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem("gladiators.role") : null;
      setRoleState(saved ?? "treinador");
    } else {
      setRoleState("atleta");
    }
  }, [supabaseRole]);
  const setRole = (r) => {
    setRoleState(r);
    if (typeof window !== "undefined") window.localStorage.setItem("gladiators.role", r);
  };
  if (role === null) return null;
  return /* @__PURE__ */ jsx(RoleContext.Provider, { value: { role, setRole }, children });
}
function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
export {
  RoleProvider as R,
  useRole as u
};
