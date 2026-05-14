import { createContext, useContext, useState, type ReactNode } from "react";
import { athletes as seed } from "./mock-data";

export type AthleteStatus = "ativo" | "lesionado" | "suspenso" | "inativo";

export type Athlete = {
  id: string;
  name: string;
  jersey: number;
  position: string;
  unit: string;
  presence: number;
  status: AthleteStatus;
  email: string;
  phone: string;
  birthdate: string;
  heightCm: number;
  weightKg: number;
  notes: string;
};

const extend = (a: (typeof seed)[number]): Athlete => ({
  ...a,
  status: "ativo",
  email: `${a.name.toLowerCase().replace(/\s+/g, ".").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@gladiators.com.br`,
  phone: "(11) 9 0000-0000",
  birthdate: "2000-01-01",
  heightCm: 180,
  weightKg: 85,
  notes: "",
});

type Ctx = {
  athletes: Athlete[];
  update: (id: string, patch: Partial<Athlete>) => void;
  remove: (id: string) => void;
  add: (a: Omit<Athlete, "id">) => void;
};

const AthletesContext = createContext<Ctx | null>(null);

export function AthletesProvider({ children }: { children: ReactNode }) {
  const [athletes, setAthletes] = useState<Athlete[]>(() => seed.map(extend));

  const update: Ctx["update"] = (id, patch) =>
    setAthletes((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const remove: Ctx["remove"] = (id) =>
    setAthletes((prev) => prev.filter((a) => a.id !== id));
  const add: Ctx["add"] = (a) =>
    setAthletes((prev) => [...prev, { ...a, id: `a-${Date.now().toString(36)}` }]);

  return (
    <AthletesContext.Provider value={{ athletes, update, remove, add }}>
      {children}
    </AthletesContext.Provider>
  );
}

export function useAthletes() {
  const ctx = useContext(AthletesContext);
  if (!ctx) throw new Error("useAthletes must be used within AthletesProvider");
  return ctx;
}

export function presenceTone(p: number): { bar: string; text: string; label: string } {
  if (p < 40) return { bar: "bg-red-500", text: "text-red-500", label: "Crítica" };
  if (p < 60) return { bar: "bg-yellow-400", text: "text-yellow-500", label: "Atenção" };
  if (p < 70) return { bar: "bg-green-500", text: "text-green-500", label: "Regular" };
  return { bar: "bg-blue-500", text: "text-blue-500", label: "Ótima" };
}
