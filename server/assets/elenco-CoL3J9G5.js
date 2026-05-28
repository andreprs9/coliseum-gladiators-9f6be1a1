import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteHeader, a as SiteFooter } from "./SiteHeader-Cargrw-x.js";
import { C as Card, a as CardContent } from "./card-bUfKKQGp.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import "@tanstack/react-router";
import "./button-CVL4MaTW.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./logo-xJElNanM.js";
const players = [{
  n: "Marcus Vega",
  p: "QB",
  num: 7,
  u: "Ataque"
}, {
  n: "Diego Ribeiro",
  p: "RB",
  num: 23,
  u: "Ataque"
}, {
  n: "Caio Mendonça",
  p: "WR",
  num: 88,
  u: "Ataque"
}, {
  n: "Henrique Costa",
  p: "WR",
  num: 11,
  u: "Ataque"
}, {
  n: "Tobias Lemos",
  p: "TE",
  num: 84,
  u: "Ataque"
}, {
  n: "André Salgado",
  p: "OL",
  num: 72,
  u: "Ataque"
}, {
  n: "Rafael Drummond",
  p: "DE",
  num: 55,
  u: "Defesa"
}, {
  n: "Iago Bittencourt",
  p: "DT",
  num: 99,
  u: "Defesa"
}, {
  n: "Vinícius Paz",
  p: "LB",
  num: 44,
  u: "Defesa"
}, {
  n: "Lucas Moretti",
  p: "CB",
  num: 21,
  u: "Defesa"
}, {
  n: "Bruno Tavares",
  p: "S",
  num: 32,
  u: "Defesa"
}, {
  n: "Pedro Kahn",
  p: "K",
  num: 3,
  u: "Special"
}];
function Elenco() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "Temporada 2026" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl", children: "Elenco" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-muted-foreground", children: "12 dos atletas que defendem as cores do Gladiators nesta temporada." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-secondary/40", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: players.map((pl) => /* @__PURE__ */ jsx(Card, { className: "overflow-hidden bg-foreground text-background transition-transform hover:-translate-y-1", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[3/4] bg-gradient-to-br from-accent/40 via-foreground to-foreground p-5 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsx(Badge, { className: "bg-accent text-accent-foreground hover:bg-accent", children: pl.p }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-background/60", children: pl.u })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "font-display text-[6rem] font-black leading-none text-background/95", children: [
        "#",
        pl.num
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "font-display text-xl font-bold leading-tight", children: pl.n }) })
    ] }) }) }, pl.num)) }) }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Elenco as component
};
