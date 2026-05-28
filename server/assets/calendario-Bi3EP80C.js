import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteHeader, a as SiteFooter } from "./SiteHeader-Cargrw-x.js";
import { C as Card, a as CardContent } from "./card-bUfKKQGp.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { Clock, MapPin } from "lucide-react";
import "@tanstack/react-router";
import "./button-CVL4MaTW.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./logo-xJElNanM.js";
const games = [{
  d: "Sáb, 23 mai · 16h00",
  h: "Gladiators",
  a: "Centurions",
  l: "Arena Municipal",
  m: "Casa",
  s: "Próximo"
}, {
  d: "Sáb, 06 jun · 15h00",
  h: "Spartans",
  a: "Gladiators",
  l: "Estádio do Norte",
  m: "Fora",
  s: "Agendado"
}, {
  d: "Dom, 21 jun · 17h00",
  h: "Gladiators",
  a: "Wolves",
  l: "Arena Municipal",
  m: "Casa",
  s: "Agendado"
}, {
  d: "Sáb, 04 jul · 16h00",
  h: "Falcons",
  a: "Gladiators",
  l: "Campo Sul",
  m: "Fora",
  s: "Agendado"
}, {
  d: "Sáb, 18 jul · 18h00",
  h: "Gladiators",
  a: "Titans",
  l: "Arena Municipal",
  m: "Casa",
  s: "Agendado"
}];
const past = [{
  d: "Sáb, 09 mai",
  h: "Gladiators",
  a: "Vikings",
  r: "28 × 14",
  w: true
}, {
  d: "Sáb, 25 abr",
  h: "Raptors",
  a: "Gladiators",
  r: "10 × 31",
  w: true
}, {
  d: "Sáb, 11 abr",
  h: "Gladiators",
  a: "Bulldogs",
  r: "21 × 24",
  w: false
}];
function Calendario() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "Temporada 2026" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl", children: "Calendário" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold uppercase tracking-wider", children: "Próximos jogos" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-3", children: games.map((g, i) => /* @__PURE__ */ jsx(Card, { className: i === 0 ? "border-l-4 border-l-accent" : "", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-wrap items-center justify-between gap-4 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-[160px]", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
            g.d
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
            g.l
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-display text-xl font-bold sm:text-2xl", children: [
          /* @__PURE__ */ jsx("span", { className: g.h === "Gladiators" ? "text-foreground" : "text-muted-foreground", children: g.h }),
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "×" }),
          /* @__PURE__ */ jsx("span", { className: g.a === "Gladiators" ? "text-foreground" : "text-muted-foreground", children: g.a })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: g.m === "Casa" ? "default" : "outline", children: g.m }),
          i === 0 && /* @__PURE__ */ jsx(Badge, { className: "bg-accent text-accent-foreground hover:bg-accent", children: g.s })
        ] })
      ] }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-secondary/40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold uppercase tracking-wider", children: "Resultados recentes" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-3", children: past.map((g, i) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-wrap items-center justify-between gap-4 p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: g.d }),
        /* @__PURE__ */ jsxs("div", { className: "font-display text-xl font-bold sm:text-2xl", children: [
          /* @__PURE__ */ jsx("span", { className: g.h === "Gladiators" ? "text-foreground" : "text-muted-foreground", children: g.h }),
          /* @__PURE__ */ jsx("span", { className: "mx-3 text-accent", children: g.r }),
          /* @__PURE__ */ jsx("span", { className: g.a === "Gladiators" ? "text-foreground" : "text-muted-foreground", children: g.a })
        ] }),
        /* @__PURE__ */ jsx(Badge, { className: g.w ? "bg-accent text-accent-foreground hover:bg-accent" : "", variant: g.w ? "default" : "outline", children: g.w ? "Vitória" : "Derrota" })
      ] }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Calendario as component
};
