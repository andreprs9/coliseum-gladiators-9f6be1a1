import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteHeader, a as SiteFooter } from "./SiteHeader-Cargrw-x.js";
import { C as Card, a as CardContent } from "./card-bUfKKQGp.js";
import { Trophy, Users, Calendar, Heart } from "lucide-react";
import "@tanstack/react-router";
import "./button-CVL4MaTW.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./logo-xJElNanM.js";
const milestones = [{
  y: "2011",
  t: "Fundação",
  d: "Um grupo de apaixonados pelo esporte ergue a primeira armadura Gladiators."
}, {
  y: "2014",
  t: "Primeiro título",
  d: "Conquista do campeonato regional após uma temporada invicta."
}, {
  y: "2017",
  t: "Bicampeonato estadual",
  d: "A geração de ouro consolida o nome Gladiators no cenário nacional."
}, {
  y: "2021",
  t: "10 anos",
  d: "Uma década de história, com mais de 200 atletas formados."
}, {
  y: "2026",
  t: "Nova era",
  d: "Reformulação do elenco e nova comissão técnica para a temporada atual."
}];
function Time() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "O Time" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl", children: "15 anos de paixão pelo futebol americano." }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg text-muted-foreground", children: "Ao longo de 15 anos, construímos todos os dias uma trajetória marcada por paixão, determinação e incontáveis momentos memoráveis. Este ano promete ser repleto de conquistas e empolgantes novidades para o nosso time." }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-4 md:grid-cols-4", children: [{
        i: Trophy,
        k: "5",
        v: "Títulos"
      }, {
        i: Users,
        k: "200+",
        v: "Atletas formados"
      }, {
        i: Calendar,
        k: "15",
        v: "Temporadas"
      }, {
        i: Heart,
        k: "10k",
        v: "Torcedores"
      }].map((s) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx(s.i, { className: "h-5 w-5 text-accent", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 font-display text-3xl font-bold", children: s.k }),
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: s.v })
      ] }) }, s.v)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-secondary/40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl font-bold tracking-tight", children: "Linha do tempo" }),
      /* @__PURE__ */ jsx("ol", { className: "mt-12 space-y-4", children: milestones.map((m) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-wrap gap-6 p-6", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-4xl font-black text-accent", children: m.y }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold", children: m.t }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: m.d })
        ] })
      ] }) }) }, m.y)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "Lema" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-display text-4xl font-bold italic leading-tight sm:text-5xl", children: '"O que fazemos na vida ecoa na eternidade."' })
    ] }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Time as component
};
