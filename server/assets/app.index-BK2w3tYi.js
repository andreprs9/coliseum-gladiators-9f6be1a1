import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { P as Progress } from "./progress-BRG1z6ZI.js";
import { u as useRole } from "./role-context-j1oeL3ob.js";
import { u as upcomingEvents, m as myTasks, c as currentAthlete, a as athletes, b as myImprovements } from "./mock-data-C0Mhohwc.js";
import { CalendarDays, Dumbbell, CheckCircle2, Users, TrendingUp } from "lucide-react";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-progress";
import "./router-BpKtBDtA.js";
import "@tanstack/react-query";
import "@supabase/supabase-js";
function fmtDate(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Dashboard() {
  const {
    role
  } = useRole();
  const isCoach = role === "treinador";
  const pendingConfirm = upcomingEvents.filter((e) => e.confirmed === "pendente").length;
  const tasksDone = myTasks.filter((t) => t.done).length;
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: isCoach ? "Visão do treinador" : "Visão do atleta" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: isCoach ? "Bem-vindo, Coach" : `Olá, ${currentAthlete.name.split(" ")[0]}` }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isCoach ? "Acompanhe o time e gerencie treinos, tarefas e convocações." : "Confira seus treinos, tarefas e oportunidades de melhoria." })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: /* @__PURE__ */ jsx(Link, { to: isCoach ? "/app/atletas" : "/app/desempenho", children: isCoach ? "Ver elenco" : "Meu desempenho" }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }), label: "Confirmações pendentes", value: pendingConfirm, to: "/app/jogos" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Dumbbell, { className: "h-4 w-4" }), label: "Próximos treinos", value: upcomingEvents.filter((e) => e.type === "treino").length, to: "/app/treinos" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }), label: isCoach ? "Tarefas atribuídas" : "Tarefas concluídas", value: isCoach ? myTasks.length : `${tasksDone}/${myTasks.length}`, to: "/app/tarefas" }),
      /* @__PURE__ */ jsx(StatCard, { icon: isCoach ? /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4" }), label: isCoach ? "Atletas no elenco" : "Áreas em foco", value: isCoach ? athletes.length : myImprovements.length, to: isCoach ? "/app/atletas" : "/app/desempenho" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Próxima agenda" }),
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/app/jogos", children: "Ver todos" }) })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "divide-y divide-border", children: upcomingEvents.slice(0, 4).map((e) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 py-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: e.type === "jogo" ? "default" : "secondary", className: e.type === "jogo" ? "bg-accent text-accent-foreground" : "", children: e.type === "jogo" ? "Jogo" : "Treino" }),
              /* @__PURE__ */ jsx("p", { className: "truncate font-medium", children: e.title })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              fmtDate(e.date),
              " · ",
              e.location
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: e.confirmed })
        ] }, e.id)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: isCoach ? "Presença média" : "Oportunidades de melhoria" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: isCoach ? athletes.slice(0, 5).map((a) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
              "#",
              a.jersey,
              " ",
              a.name
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              a.presence,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: a.presence, className: "h-1.5" })
        ] }, a.id)) : myImprovements.slice(0, 4).map((i) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate", children: i.area }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: i.score })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: i.score, className: "h-1.5" })
        ] }, i.id)) })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  to
}) {
  return /* @__PURE__ */ jsx(Link, { to, className: "group", children: /* @__PURE__ */ jsx(Card, { className: "transition-colors group-hover:border-accent/60", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      icon,
      /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.2em]", children: label })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 font-display text-3xl font-semibold tracking-tight", children: value })
  ] }) }) });
}
export {
  Dashboard as component
};
