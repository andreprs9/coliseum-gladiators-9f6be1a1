import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteHeader, a as SiteFooter } from "./SiteHeader-Cargrw-x.js";
import { C as Card, a as CardContent } from "./card-bUfKKQGp.js";
import { I as Input } from "./input-C0QjszdI.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { Mail, Instagram, MapPin } from "lucide-react";
import "@tanstack/react-router";
import "./logo-xJElNanM.js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
function Contato() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "Contato" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl", children: "Entre em contato conosco." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-muted-foreground", children: "Quer jogar, torcer ou patrocinar? Mande uma mensagem para a diretoria do Gladiators." }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-10 space-y-5 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-4 w-4 text-accent", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: "contato@gladiators.com.br" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Instagram, { className: "mt-0.5 h-4 w-4 text-accent", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: "@gladiatorsfa" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 text-accent", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: "Arena Municipal · sede de treinos" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => {
        e.preventDefault();
        alert("Mensagem enviada!");
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nome", children: "Nome" }),
          /* @__PURE__ */ jsx(Input, { id: "nome", required: true, autoComplete: "name" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "celular", children: "Celular" }),
            /* @__PURE__ */ jsx(Input, { id: "celular", required: true, autoComplete: "tel" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", required: true, autoComplete: "email" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "msg", children: "Mensagem" }),
          /* @__PURE__ */ jsx(Textarea, { id: "msg", rows: 5, required: true })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full bg-accent text-accent-foreground hover:bg-accent/90", children: "Enviar" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Contato as component
};
