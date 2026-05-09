import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { email: string; name: string };

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  requestReset: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const KEY = "gladiators.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        /* noop */
      }
    }
  }, []);

  const login = async (email: string, _password: string) => {
    const u: User = { email, name: email.split("@")[0] || "Atleta" };
    setUser(u);
    window.localStorage.setItem(KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(KEY);
  };

  const requestReset = async (_email: string) => {
    // Mock: pretend we sent an email
    await new Promise((r) => setTimeout(r, 600));
  };

  const resetPassword = async (_password: string) => {
    await new Promise((r) => setTimeout(r, 600));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, requestReset, resetPassword }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
