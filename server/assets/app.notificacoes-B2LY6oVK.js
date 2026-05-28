import { jsxs, jsx } from "react/jsx-runtime";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { n as notifications } from "./mock-data-C0Mhohwc.js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function NotificacoesPage() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Notificações" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Avisos do time" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Recentes" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "divide-y divide-border", children: notifications.map((n) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 py-3", children: [
        /* @__PURE__ */ jsx("span", { className: `mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-accent" : "bg-border"}`, "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: n.unread ? "text-sm font-semibold" : "text-sm", children: n.title }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: n.time })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: n.body })
        ] })
      ] }, n.id)) })
    ] })
  ] });
}
export {
  NotificacoesPage as component
};
