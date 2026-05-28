import { jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext, createContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
function createSupabaseClient() {
  const SUPABASE_URL = "https://ljimokpvbktoexgipbeh.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqaW1va3B2Ymt0b2V4Z2lwYmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5ODM5ODAsImV4cCI6MjA5NDU1OTk4MH0.2y2qC--ZtiGdrHN6fZMsoxHOl2qm37G_2cM1YPVbjIM";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const fromDb = (r, presence = 0) => ({
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
  photoUrl: r.foto_url ?? void 0
});
const toDb = (a) => ({
  ...a.name !== void 0 && { nome: a.name },
  ...a.jersey !== void 0 && { numero: a.jersey },
  ...a.position !== void 0 && { posicao: a.position },
  ...a.unit !== void 0 && { setor: a.unit },
  ...a.status !== void 0 && { ativo: a.status === "ativo" },
  ...a.email !== void 0 && { email: a.email },
  ...a.phone !== void 0 && { telefone: a.phone },
  ...a.birthdate !== void 0 && { data_nascimento: a.birthdate || null },
  ...a.heightCm !== void 0 && { altura: a.heightCm },
  ...a.weightKg !== void 0 && { peso_atual: a.weightKg },
  ...a.photoUrl !== void 0 && { foto_url: a.photoUrl }
});
const AthletesContext = createContext(null);
function AthletesProvider({ children }) {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const [{ data: rows, error }, { data: avals }] = await Promise.all([
      supabase.from("atletas").select("*").order("numero"),
      supabase.from("avaliacoes").select("atleta_id, presenca, data")
    ]);
    if (error) {
      toast.error("Falha ao carregar atletas");
      setLoading(false);
      return;
    }
    const presenceMap = /* @__PURE__ */ new Map();
    (avals ?? []).forEach((v) => {
      const cur = presenceMap.get(v.atleta_id);
      if (!cur || v.data > cur.date) presenceMap.set(v.atleta_id, { date: v.data, p: Number(v.presenca) });
    });
    setAthletes(rows.map((r) => fromDb(r, presenceMap.get(r.id)?.p ?? 0)));
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, []);
  const update = async (id, patch) => {
    const prevAth = athletes.find((a) => a.id === id);
    const { error } = await supabase.from("atletas").update(toDb(patch)).eq("id", id);
    if (error) {
      toast.error("Falha ao salvar");
      return;
    }
    if (patch.weightKg !== void 0 && patch.weightKg !== prevAth?.weightKg) {
      await supabase.from("historico_peso").insert({ atleta_id: id, peso: patch.weightKg });
    }
    setAthletes((prev) => prev.map((a) => a.id === id ? { ...a, ...patch } : a));
  };
  const remove = async (id) => {
    const { error } = await supabase.from("atletas").delete().eq("id", id);
    if (error) {
      toast.error("Falha ao remover");
      return;
    }
    setAthletes((prev) => prev.filter((a) => a.id !== id));
  };
  const add = async (a) => {
    const { data, error } = await supabase.from("atletas").insert(toDb(a)).select().single();
    if (error || !data) {
      toast.error("Falha ao cadastrar");
      return;
    }
    if (a.weightKg) {
      await supabase.from("historico_peso").insert({ atleta_id: data.id, peso: a.weightKg });
    }
    setAthletes((prev) => [...prev, fromDb(data, a.presence)]);
  };
  return /* @__PURE__ */ jsx(AthletesContext.Provider, { value: { athletes, loading, update, remove, add, refresh }, children });
}
function useAthletes() {
  const ctx = useContext(AthletesContext);
  if (!ctx) throw new Error("useAthletes must be used within AthletesProvider");
  return ctx;
}
function presenceTone(p) {
  if (p < 40) return { bar: "bg-red-500", text: "text-red-500", label: "Crítica" };
  if (p < 60) return { bar: "bg-yellow-400", text: "text-yellow-500", label: "Atenção" };
  if (p < 70) return { bar: "bg-green-500", text: "text-green-500", label: "Regular" };
  return { bar: "bg-blue-500", text: "text-blue-500", label: "Ótima" };
}
export {
  AthletesProvider as A,
  presenceTone as p,
  useAthletes as u
};
