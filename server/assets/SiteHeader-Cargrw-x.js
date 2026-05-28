import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./button-CVL4MaTW.js";
import { l as logo } from "./logo-xJElNanM.js";
function SiteHeader() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/time", className: "flex items-center gap-3", "aria-label": "Gladiators Futebol Americano", children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: "", "aria-hidden": "true", width: 400, height: 200, className: "h-10 w-auto" }),
      /* @__PURE__ */ jsx("span", { className: "hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:block", children: "Futebol Americano" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { "aria-label": "Principal", className: "hidden items-center gap-7 text-sm md:flex", children: [
      /* @__PURE__ */ jsx(Link, { to: "/time", className: "text-muted-foreground hover:text-foreground", activeProps: { className: "text-foreground font-semibold" }, children: "O Time" }),
      /* @__PURE__ */ jsx(Link, { to: "/elenco", className: "text-muted-foreground hover:text-foreground", activeProps: { className: "text-foreground font-semibold" }, children: "Elenco" }),
      /* @__PURE__ */ jsx(Link, { to: "/calendario", className: "text-muted-foreground hover:text-foreground", activeProps: { className: "text-foreground font-semibold" }, children: "Calendário" }),
      /* @__PURE__ */ jsx(Link, { to: "/contato", className: "text-muted-foreground hover:text-foreground", activeProps: { className: "text-foreground font-semibold" }, children: "Contato" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Área do Time" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: /* @__PURE__ */ jsx(Link, { to: "/contato", children: "Faça parte" }) })
    ] })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-foreground text-background", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: logo, alt: "", "aria-hidden": "true", width: 400, height: 200, className: "h-11 w-auto" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-background/60", children: "Futebol Americano" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm text-sm text-background/70", children: "15 anos construindo uma trajetória marcada por paixão, determinação e momentos memoráveis no futebol americano." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-background/70", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-background", children: "Navegação" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/time", className: "hover:text-background", children: "O Time" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/elenco", className: "hover:text-background", children: "Elenco" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/calendario", className: "hover:text-background", children: "Calendário" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contato", className: "hover:text-background", children: "Contato" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-background/70", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-background", children: "Lema" }),
      /* @__PURE__ */ jsx("p", { className: "font-display text-lg italic text-background", children: '"O que fazemos na vida ecoa na eternidade."' }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Gladiators Futebol Americano."
      ] })
    ] })
  ] }) });
}
export {
  SiteHeader as S,
  SiteFooter as a
};
