import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  photoUrl?: string;
};

type DbRow = {
  id: string;
  numero: number;
  nome: string;
  posicao: string | null;
  setor: string | null;
  ativo: boolean;
  email: string | null;
  telefone: string | null;
  data_nascimento: string | null;
  altura: number | null;
  peso_atual: number | null;
  foto_url: string | null;
};

const fromDb = (r: DbRow, presence = 0): Athlete => ({
  id: r.id,
  name: r.nome,
  jersey: r.numero,
  position: r.posicao ?? "",
  unit: r.setor ?? "Ataque",
  presence,
  status: r.ativo ? "ativo" : "inativo",
  email: r.email ?? "",
  phone: r.telefone ?? "",
  birthdate: r.data_nascimento ?? "",
  heightCm: r.altura ?? 0,
  weightKg: Number(r.peso_atual ?? 0),
  notes: "",
  photoUrl: r.foto_url ?? undefined,
});

const toDb = (a: Partial<Athlete>) => ({
  ...(a.name !== undefined && { nome: a.name }),
  ...(a.jersey !== undefined && { numero: a.jersey }),
  ...(a.position !== undefined && { posicao: a.position }),
  ...(a.unit !== undefined && { setor: a.unit }),
  ...(a.status !== undefined && { ativo: a.status === "ativo" }),
  ...(a.email !== undefined && { email: a.email }),
  ...(a.phone !== undefined && { telefone: a.phone }),
  ...(a.birthdate !== undefined && { data_nascimento: a.birthdate || null }),
  ...(a.heightCm !== undefined && { altura: a.heightCm }),
  ...(a.weightKg !== undefined && { peso_atual: a.weightKg }),
  ...(a.photoUrl !== undefined && { foto_url: a.photoUrl }),
});

type Ctx = {
  athletes: Athlete[];
  loading: boolean;
  update: (id: string, patch: Partial<Athlete>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  add: (a: Omit<Athlete, "id">) => Promise<void>;
  refresh: () => Promise<void>;
};

const AthletesContext = createContext<Ctx | null>(null);

export function AthletesProvider({ children }: { children: ReactNode }) {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const [{ data: rows, error }, { data: avals }] = await Promise.all([
      supabase.from("atletas").select("*").order("numero"),
      supabase.from("avaliacoes").select("atleta_id, presenca, data"),
    ]);
    if (error) {
      toast.error("Falha ao carregar atletas");
      setLoading(false);
      return;
    }
    // latest presence per athlete
    const presenceMap = new Map<string, { date: string; p: number }>();
    (avals ?? []).forEach((v) => {
      const cur = presenceMap.get(v.atleta_id);
      if (!cur || v.data > cur.date) presenceMap.set(v.atleta_id, { date: v.data, p: Number(v.presenca) });
    });
    setAthletes((rows as DbRow[]).map((r) => fromDb(r, presenceMap.get(r.id)?.p ?? 0)));
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const update: Ctx["update"] = async (id, patch) => {
    const { error } = await supabase.from("atletas").update(toDb(patch)).eq("id", id);
    if (error) {
      toast.error("Falha ao salvar");
      return;
    }
    setAthletes((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const remove: Ctx["remove"] = async (id) => {
    const { error } = await supabase.from("atletas").delete().eq("id", id);
    if (error) {
      toast.error("Falha ao remover");
      return;
    }
    setAthletes((prev) => prev.filter((a) => a.id !== id));
  };

  const add: Ctx["add"] = async (a) => {
    const { data, error } = await supabase
      .from("atletas")
      .insert(toDb(a) as never)
      .select()
      .single();
    if (error || !data) {
      toast.error("Falha ao cadastrar");
      return;
    }
    setAthletes((prev) => [...prev, fromDb(data as DbRow, a.presence)]);
  };

  return (
    <AthletesContext.Provider value={{ athletes, loading, update, remove, add, refresh }}>
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
