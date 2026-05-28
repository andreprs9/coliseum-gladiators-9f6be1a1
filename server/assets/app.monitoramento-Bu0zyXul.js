import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-bUfKKQGp.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { P as Progress } from "./progress-BRG1z6ZI.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { c as cn } from "./utils-H80jjgLf.js";
import { S as Separator } from "./separator-DGgIueqr.js";
import { Activity, Scale, FileText, MessageSquare, TrendingUp, TrendingDown, Minus, Plus, Trash2 } from "lucide-react";
import { u as useAthletes, p as presenceTone } from "./athletes-store-Cpak_uko.js";
import { u as useMonitoring, s as summarizeAthlete } from "./monitoring-store-Dp4DLu2x.js";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-progress";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "@supabase/supabase-js";
import "sonner";
import "./playbook-data-DgQPGQYH.js";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const metricOptions = ["Velocidade", "Força", "Resistência", "Técnica", "Mental", "Avaliação geral"];
function todayISO() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function MonitoramentoPage() {
  const {
    athletes
  } = useAthletes();
  const monitoring = useMonitoring();
  const [athleteId, setAthleteId] = useState(athletes[0]?.id ?? "");
  const athlete = athletes.find((a) => a.id === athleteId);
  const summary = useMemo(() => athlete ? summarizeAthlete(monitoring.state, athlete.id) : null, [monitoring.state, athlete]);
  if (!athlete || !summary) return null;
  const tone = presenceTone(athlete.presence);
  const bmi = athlete.heightCm > 0 ? (athlete.weightKg / Math.pow(athlete.heightCm / 100, 2)).toFixed(1) : "—";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Treinador" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Monitoramento de atletas" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perfil completo, evolução, peso, avaliações técnicas e observações por atleta." })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-[1fr_auto]", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx(Label, { children: "Atleta" }),
      /* @__PURE__ */ jsxs(Select, { value: athleteId, onValueChange: setAthleteId, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: athletes.map((a) => /* @__PURE__ */ jsxs(SelectItem, { value: a.id, children: [
          "#",
          a.jersey,
          " ",
          a.name,
          " — ",
          a.position,
          " (",
          a.unit,
          ")"
        ] }, a.id)) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs(Card, { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Perfil" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-accent-foreground", children: athlete.jersey }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-display text-lg", children: athlete.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                athlete.position,
                " · ",
                athlete.unit,
                " · ",
                athlete.status
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(Grid, { label: "E-mail", value: athlete.email }),
          /* @__PURE__ */ jsx(Grid, { label: "Telefone", value: athlete.phone }),
          /* @__PURE__ */ jsx(Grid, { label: "Nascimento", value: new Date(athlete.birthdate).toLocaleDateString("pt-BR") }),
          /* @__PURE__ */ jsx(Grid, { label: "Altura", value: `${athlete.heightCm} cm` }),
          /* @__PURE__ */ jsx(Grid, { label: "Peso atual", value: summary.currentWeight ? `${summary.currentWeight} kg` : `${athlete.weightKg} kg` }),
          /* @__PURE__ */ jsx(Grid, { label: "IMC", value: bmi })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Indicadores" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx(Indicator, { icon: /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }), label: "Avaliação geral", value: `${summary.overall}/100`, children: /* @__PURE__ */ jsx(Progress, { value: summary.overall, className: "h-1.5" }) }),
          /* @__PURE__ */ jsx(Indicator, { icon: /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }), label: "Presença", value: `${athlete.presence}% · ${tone.label}`, children: /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full rounded bg-muted", children: /* @__PURE__ */ jsx("div", { className: `h-1.5 rounded ${tone.bar}`, style: {
            width: `${athlete.presence}%`
          } }) }) }),
          /* @__PURE__ */ jsx(Indicator, { icon: /* @__PURE__ */ jsx(Scale, { className: "h-4 w-4" }), label: "Variação de peso", value: summary.weightDelta === 0 ? "estável" : `${summary.weightDelta > 0 ? "+" : ""}${summary.weightDelta.toFixed(1)} kg`, children: /* @__PURE__ */ jsx(DeltaIcon, { delta: summary.weightDelta }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Médias por métrica" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 text-sm", children: [
          summary.byMetric.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Sem avaliações." }),
          summary.byMetric.map((b) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { children: b.metric }),
              /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
                Math.round(b.avg),
                "/100"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Progress, { value: b.avg, className: "mt-1 h-1.5" })
          ] }, b.metric))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Curva de evolução (avaliações)" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-64", children: summary.timeline.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem dados ainda." }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: summary.timeline, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "date", fontSize: 11 }),
          /* @__PURE__ */ jsx(YAxis, { domain: [0, 100], fontSize: 11 }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "score", stroke: "hsl(var(--accent))", name: "Nota" }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "rolling", stroke: "hsl(var(--primary))", strokeDasharray: "4 4", name: "Média móvel" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Histórico de peso" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-64", children: summary.weights.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem registros de peso." }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: summary.weights, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "date", fontSize: 11 }),
          /* @__PURE__ */ jsx(YAxis, { domain: ["auto", "auto"], fontSize: 11 }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "weightKg", stroke: "hsl(var(--accent))", name: "Peso (kg)" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "metric", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "metric", children: [
          /* @__PURE__ */ jsx(Activity, { className: "mr-1 h-4 w-4" }),
          " Avaliações"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "weight", children: [
          /* @__PURE__ */ jsx(Scale, { className: "mr-1 h-4 w-4" }),
          " Peso"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "tech", children: [
          /* @__PURE__ */ jsx(FileText, { className: "mr-1 h-4 w-4" }),
          " Técnica"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "general", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "mr-1 h-4 w-4" }),
          " Observações"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "metric", children: /* @__PURE__ */ jsx(MetricTab, { athleteId: athlete.id }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "weight", children: /* @__PURE__ */ jsx(WeightTab, { athleteId: athlete.id }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "tech", children: /* @__PURE__ */ jsx(TechTab, { athleteId: athlete.id }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "general", children: /* @__PURE__ */ jsx(GeneralTab, { athleteId: athlete.id }) })
    ] })
  ] });
}
function Grid({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-3 text-xs", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-right", children: value })
  ] });
}
function Indicator({
  icon,
  label,
  value,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
        icon,
        label
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-mono", children: value })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-1", children })
  ] });
}
function DeltaIcon({
  delta
}) {
  if (delta > 0) return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-yellow-500", children: [
    /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }),
    " ganho"
  ] });
  if (delta < 0) return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-green-500", children: [
    /* @__PURE__ */ jsx(TrendingDown, { className: "h-3 w-3" }),
    " perda"
  ] });
  return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }),
    " estável"
  ] });
}
function MetricTab({
  athleteId
}) {
  const {
    state,
    addMetric,
    removeMetric
  } = useMonitoring();
  const [metric, setMetric] = useState("Avaliação geral");
  const [score, setScore] = useState(80);
  const [notes, setNotes] = useState("");
  const list = state.metrics.filter((m) => m.athleteId === athleteId);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Avaliações por métrica" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-4", children: [
          /* @__PURE__ */ jsx(Label, { children: "Métrica" }),
          /* @__PURE__ */ jsxs(Select, { value: metric, onValueChange: (v) => setMetric(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: metricOptions.map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m, children: m }, m)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Nota (0–100)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: 0, max: 100, value: score, onChange: (e) => setScore(Number(e.target.value)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-6", children: [
          /* @__PURE__ */ jsx(Label, { children: "Observações" }),
          /* @__PURE__ */ jsx(Input, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Contexto da avaliação…" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-12", children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
          if (!notes.trim()) return;
          addMetric({
            athleteId,
            metric,
            score: Math.max(0, Math.min(100, score)),
            notes: notes.trim(),
            date: todayISO()
          });
          setNotes("");
        }, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Adicionar avaliação"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        list.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem avaliações." }),
        list.map((e) => /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: e.metric }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(e.date).toLocaleDateString("pt-BR") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs", children: [
                e.score,
                "/100"
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeMetric(e.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: e.score, className: "mt-2 h-1.5" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: e.notes })
        ] }, e.id))
      ] })
    ] })
  ] });
}
function WeightTab({
  athleteId
}) {
  const {
    state,
    addWeight,
    removeWeight
  } = useMonitoring();
  const [weight, setWeight] = useState(85);
  const [date, setDate] = useState(todayISO());
  const list = state.weights.filter((w) => w.athleteId === athleteId).sort((a, b) => b.date.localeCompare(a.date));
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Acompanhamento de peso" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-3", children: [
          /* @__PURE__ */ jsx(Label, { children: "Data" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-3", children: [
          /* @__PURE__ */ jsx(Label, { children: "Peso (kg)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", step: "0.1", value: weight, onChange: (e) => setWeight(Number(e.target.value)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-6 flex items-end", children: /* @__PURE__ */ jsxs(Button, { onClick: () => addWeight({
          athleteId,
          date,
          weightKg: weight
        }), className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Registrar peso"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        list.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem registros." }),
        list.map((w) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-md border border-border p-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: new Date(w.date).toLocaleDateString("pt-BR") }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
            w.weightKg.toFixed(1),
            " kg"
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeWeight(w.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] }, w.id))
      ] })
    ] })
  ] });
}
function TechTab({
  athleteId
}) {
  const {
    state,
    addTechNote,
    removeTechNote
  } = useMonitoring();
  const [skill, setSkill] = useState("");
  const [rating, setRating] = useState(7);
  const [note, setNote] = useState("");
  const list = state.techNotes.filter((n) => n.athleteId === athleteId);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Notas de avaliação técnica" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Habilidade" }),
          /* @__PURE__ */ jsx(Input, { value: skill, onChange: (e) => setSkill(e.target.value), placeholder: "Ex: Leitura de cobertura" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Nota (0–10)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: 0, max: 10, value: rating, onChange: (e) => setRating(Number(e.target.value)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-12", children: [
          /* @__PURE__ */ jsx(Label, { children: "Observação técnica" }),
          /* @__PURE__ */ jsx(Textarea, { rows: 2, value: note, onChange: (e) => setNote(e.target.value) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-12", children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
          if (!skill.trim() || !note.trim()) return;
          addTechNote({
            athleteId,
            date: todayISO(),
            skill: skill.trim(),
            rating: Math.max(0, Math.min(10, rating)),
            note: note.trim()
          });
          setSkill("");
          setNote("");
        }, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Adicionar nota técnica"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        list.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem notas técnicas." }),
        list.map((n) => /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: n.skill }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(n.date).toLocaleDateString("pt-BR") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs", children: [
                n.rating,
                "/10"
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeTechNote(n.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: n.note })
        ] }, n.id))
      ] })
    ] })
  ] });
}
function GeneralTab({
  athleteId
}) {
  const {
    state,
    addGeneralNote,
    removeGeneralNote
  } = useMonitoring();
  const [note, setNote] = useState("");
  const list = state.generalNotes.filter((n) => n.athleteId === athleteId);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Observações gerais" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Textarea, { rows: 3, value: note, onChange: (e) => setNote(e.target.value), placeholder: "Comportamento, postura, contexto pessoal, lesões, recados…" }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => {
        if (!note.trim()) return;
        addGeneralNote({
          athleteId,
          date: todayISO(),
          note: note.trim()
        });
        setNote("");
      }, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " Adicionar observação"
      ] }),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        list.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem observações." }),
        list.map((n) => /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(n.date).toLocaleDateString("pt-BR") }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeGeneralNote(n.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: n.note })
        ] }, n.id))
      ] })
    ] })
  ] });
}
export {
  MonitoramentoPage as component
};
