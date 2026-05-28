import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { C as Checkbox } from "./checkbox-Bd1q64ph.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { I as Input } from "./input-C0QjszdI.js";
import { Plus } from "lucide-react";
import { m as myTasks } from "./mock-data-C0Mhohwc.js";
import { u as useRole } from "./role-context-j1oeL3ob.js";
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
const catColor = {
  treino: "bg-accent/15 text-accent border-accent/30",
  estudo: "bg-foreground/10 text-foreground border-foreground/20",
  fisico: "bg-muted text-muted-foreground border-border"
};
function TarefasPage() {
  const {
    role
  } = useRole();
  const isCoach = role === "treinador";
  const [tasks, setTasks] = useState(myTasks);
  const [newTitle, setNewTitle] = useState("");
  const toggle = (id) => setTasks((ts) => ts.map((t) => t.id === id ? {
    ...t,
    done: !t.done
  } : t));
  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks((ts) => [...ts, {
      id: `t-${Date.now()}`,
      title: newTitle.trim(),
      category: "treino",
      due: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      done: false
    }]);
    setNewTitle("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Tarefas" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: isCoach ? "Atribuições do time" : "Minhas tarefas" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isCoach ? "Crie e acompanhe tarefas para os atletas." : "Marque conforme concluir cada item." })
    ] }),
    isCoach && /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Nova tarefa" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Input, { placeholder: "Ex: Estudar capítulo de cobertura zone 3", value: newTitle, onChange: (e) => setNewTitle(e.target.value), onKeyDown: (e) => e.key === "Enter" && addTask() }),
        /* @__PURE__ */ jsxs(Button, { onClick: addTask, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Adicionar"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-lg", children: "Lista" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: tasks.map((t) => /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 rounded-md border border-border bg-card p-3 hover:bg-muted/40", children: [
        /* @__PURE__ */ jsx(Checkbox, { checked: t.done, onCheckedChange: () => toggle(t.id), "aria-label": t.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: t.done ? "text-sm text-muted-foreground line-through" : "text-sm font-medium", children: t.title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Entrega: ",
            new Date(t.due).toLocaleDateString("pt-BR")
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `capitalize ${catColor[t.category]}`, children: t.category })
      ] }, t.id)) })
    ] })
  ] });
}
export {
  TarefasPage as component
};
