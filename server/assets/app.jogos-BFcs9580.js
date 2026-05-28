import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { C as Card, a as CardContent } from "./card-bUfKKQGp.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { u as upcomingEvents } from "./mock-data-C0Mhohwc.js";
import { u as useRole } from "./role-context-j1oeL3ob.js";
import { Check, X } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "./router-BpKtBDtA.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@supabase/supabase-js";
function JogosPage() {
  const {
    role
  } = useRole();
  const isCoach = role === "treinador";
  const [events, setEvents] = useState(upcomingEvents);
  const setConfirm = (id, value) => {
    setEvents((es) => es.map((e) => e.id === id ? {
      ...e,
      confirmed: value
    } : e));
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Agenda" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Treinos e jogos" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isCoach ? "Acompanhe convocações e confirmações do elenco." : "Confirme sua presença em cada compromisso." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: events.map((e) => {
      const isGame = e.type === "jogo";
      return /* @__PURE__ */ jsx(Card, { className: isGame ? "border-accent/40" : void 0, children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-wrap items-center justify-between gap-4 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Badge, { className: isGame ? "bg-accent text-accent-foreground" : "bg-muted text-foreground", children: isGame ? "Jogo" : "Treino" }),
            /* @__PURE__ */ jsx("p", { className: "truncate font-display text-lg font-semibold", children: e.title })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            new Date(e.date).toLocaleString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }),
            " · ",
            e.location
          ] })
        ] }),
        isCoach ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "12 confirmados" }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "3 ausentes" }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: e.confirmed === "pendente" ? "Pendentes: 8" : "Pendentes: 0" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: e.confirmed === "sim" ? "default" : "outline", onClick: () => setConfirm(e.id, "sim"), children: [
            /* @__PURE__ */ jsx(Check, { className: "mr-1 h-4 w-4" }),
            "Confirmar"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: e.confirmed === "nao" ? "destructive" : "outline", onClick: () => setConfirm(e.id, "nao"), children: [
            /* @__PURE__ */ jsx(X, { className: "mr-1 h-4 w-4" }),
            "Não vou"
          ] })
        ] })
      ] }) }, e.id);
    }) })
  ] });
}
export {
  JogosPage as component
};
