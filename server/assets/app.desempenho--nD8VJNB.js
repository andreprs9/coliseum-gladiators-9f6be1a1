import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { P as Progress } from "./progress-BRG1z6ZI.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { S as Separator } from "./separator-DGgIueqr.js";
import { Activity, Scale, FileText, MessageSquare, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { c as currentAthlete, b as myImprovements } from "./mock-data-C0Mhohwc.js";
import { u as useAthletes, p as presenceTone } from "./athletes-store-Cpak_uko.js";
import { u as useMonitoring, s as summarizeAthlete } from "./monitoring-store-Dp4DLu2x.js";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-progress";
import "class-variance-authority";
import "@radix-ui/react-separator";
import "@supabase/supabase-js";
import "sonner";
import "./playbook-data-DgQPGQYH.js";
function DesempenhoPage() {
  const {
    athletes
  } = useAthletes();
  const monitoring = useMonitoring();
  const me = athletes.find((a) => a.id === currentAthlete.id) ?? null;
  const summary = useMemo(() => summarizeAthlete(monitoring.state, currentAthlete.id), [monitoring.state]);
  const presence = me?.presence ?? 0;
  const tone = presenceTone(presence);
  const bmi = me && me.heightCm > 0 ? (me.weightKg / Math.pow(me.heightCm / 100, 2)).toFixed(1) : "—";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Atleta" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Meu desempenho" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          currentAthlete.name,
          " · #",
          currentAthlete.jersey,
          " · ",
          currentAthlete.position
        ] })
      ] }),
      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs uppercase tracking-wider", children: currentAthlete.unit })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Avaliação geral", value: `${summary.overall}/100`, icon: /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsx(Progress, { value: summary.overall, className: "h-1.5" }) }),
      /* @__PURE__ */ jsx(StatCard, { label: "Presença", value: `${presence}% · ${tone.label}`, icon: /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full rounded bg-muted", children: /* @__PURE__ */ jsx("div", { className: `h-1.5 rounded ${tone.bar}`, style: {
        width: `${presence}%`
      } }) }) }),
      /* @__PURE__ */ jsx(StatCard, { label: "Peso atual", value: summary.currentWeight ? `${summary.currentWeight.toFixed(1)} kg` : `${me?.weightKg ?? "—"} kg`, icon: /* @__PURE__ */ jsx(Scale, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsx(DeltaLabel, { delta: summary.weightDelta }) }),
      /* @__PURE__ */ jsx(StatCard, { label: "IMC", value: bmi, icon: /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
        "Altura: ",
        me?.heightCm ?? "—",
        " cm"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Minha curva de evolução" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-64", children: summary.timeline.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Ainda sem avaliações registradas." }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: summary.timeline, children: [
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
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Evolução de peso" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-64", children: summary.weights.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem registros de peso." }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: summary.weights, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "date", fontSize: 11 }),
          /* @__PURE__ */ jsx(YAxis, { domain: ["auto", "auto"], fontSize: 11 }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "weightKg", stroke: "hsl(var(--accent))", name: "Peso (kg)" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-base", children: "Médias por métrica" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-3 md:grid-cols-2", children: [
        summary.byMetric.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem dados." }),
        summary.byMetric.map((b) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsx("span", { children: b.metric }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              Math.round(b.avg),
              "/100 · última ",
              b.last
            ] })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: b.avg, className: "mt-1 h-1.5" })
        ] }, b.metric))
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }),
        " Avaliações do treinador"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
        summary.metrics.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhuma avaliação registrada." }),
        summary.metrics.map((e) => /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: e.metric }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(e.date).toLocaleDateString("pt-BR") })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-sm", children: [
              e.score,
              "/100"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: e.score, className: "mt-2 h-1.5" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: e.notes })
        ] }, e.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
        " Notas técnicas"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
        summary.techNotes.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem notas técnicas." }),
        summary.techNotes.map((n) => /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: n.skill }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(n.date).toLocaleDateString("pt-BR") })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs", children: [
              n.rating,
              "/10"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: n.note })
        ] }, n.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        " Observações do treinador"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
        summary.generalNotes.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem observações." }),
        summary.generalNotes.map((n) => /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border p-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(n.date).toLocaleDateString("pt-BR") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: n.note })
        ] }, n.id))
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Oportunidades de melhoria" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-5", children: myImprovements.map((i) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: i.area }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-sm", children: [
            i.score,
            "/100"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: i.score, className: "mt-2 h-1.5" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Recomendação: " }),
          i.recommendation
        ] })
      ] }, i.id)) })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon,
  children
}) {
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 space-y-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
      icon,
      label
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "font-display text-xl", children: value }),
    children
  ] }) });
}
function DeltaLabel({
  delta
}) {
  if (delta > 0) return /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[11px] text-yellow-500", children: [
    /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }),
    " +",
    delta.toFixed(1),
    " kg no período"
  ] });
  if (delta < 0) return /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[11px] text-green-500", children: [
    /* @__PURE__ */ jsx(TrendingDown, { className: "h-3 w-3" }),
    " ",
    delta.toFixed(1),
    " kg no período"
  ] });
  return /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", children: [
    /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }),
    " estável"
  ] });
}
export {
  DesempenhoPage as component
};
