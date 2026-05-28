import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { C as Checkbox } from "./checkbox-Bd1q64ph.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { u as upcomingEvents } from "./mock-data-C0Mhohwc.js";
import { u as useRole } from "./role-context-j1oeL3ob.js";
import { Plus } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-checkbox";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "./router-BpKtBDtA.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@supabase/supabase-js";
const checklist = ["Aquecimento dinâmico (15 min)", "Drills de fundamentos por posição (25 min)", "Sessão tática — Ofensiva (30 min)", "Coletivo controlado (20 min)", "Volta à calma e mobilidade (10 min)"];
function TreinosPage() {
  const {
    role
  } = useRole();
  const isCoach = role === "treinador";
  const [done, setDone] = useState({});
  const treinos = upcomingEvents.filter((e) => e.type === "treino");
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Treinos" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Sessões e checklist" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isCoach ? "Planeje e acompanhe a execução das sessões." : "Acompanhe os blocos da sessão e marque o que concluiu." })
      ] }),
      isCoach && /* @__PURE__ */ jsxs(Button, { className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " Novo treino"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Próximas sessões" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "divide-y divide-border", children: treinos.map((t) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 py-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: t.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            new Date(t.date).toLocaleString("pt-BR", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }),
            " · ",
            t.location
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: t.confirmed })
      ] }, t.id)) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Checklist da sessão de hoje" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: checklist.map((item, i) => {
        const id = `c-${i}`;
        return /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 rounded-md border border-border bg-card p-3 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsx(Checkbox, { checked: !!done[id], onCheckedChange: (v) => setDone((d) => ({
            ...d,
            [id]: !!v
          })), "aria-label": item }),
          /* @__PURE__ */ jsx("span", { className: done[id] ? "text-sm text-muted-foreground line-through" : "text-sm", children: item })
        ] }, id);
      }) })
    ] })
  ] });
}
export {
  TreinosPage as component
};
