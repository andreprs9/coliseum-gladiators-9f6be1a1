import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { b as buttonVariants, B as Button } from "./button-CVL4MaTW.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, f as DialogDescription, e as DialogFooter } from "./dialog-D5JggGvu.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.js";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { c as cn } from "./utils-H80jjgLf.js";
import { Plus, Search, Pencil, UserCog, Trash2 } from "lucide-react";
import { u as useAthletes, p as presenceTone } from "./athletes-store-Cpak_uko.js";
import { toast } from "sonner";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const UNITS = ["Ataque", "Defesa", "Especial"];
const STATUSES = ["ativo", "lesionado", "suspenso", "inativo"];
const statusVariant = {
  ativo: "default",
  lesionado: "destructive",
  suspenso: "outline",
  inativo: "secondary"
};
function AtletasPage() {
  const {
    athletes,
    update,
    remove,
    add
  } = useAthletes();
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("todas");
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const filtered = useMemo(() => athletes.filter((a) => {
    const matchU = unit === "todas" || a.unit === unit;
    const q = query.trim().toLowerCase();
    const matchQ = !q || a.name.toLowerCase().includes(q) || a.position.toLowerCase().includes(q) || String(a.jersey).includes(q);
    return matchU && matchQ;
  }), [athletes, query, unit]);
  const stats = useMemo(() => {
    const avg = athletes.length ? Math.round(athletes.reduce((s, a) => s + a.presence, 0) / athletes.length) : 0;
    const critical = athletes.filter((a) => a.presence < 40).length;
    const injured = athletes.filter((a) => a.status === "lesionado").length;
    return {
      total: athletes.length,
      avg,
      critical,
      injured
    };
  }, [athletes]);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Treinador" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Gestão do elenco" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Edite perfis, monitore presença e gerencie status do plantel." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => setCreating(true), children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " Novo atleta"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Atletas no plantel", value: stats.total }),
      /* @__PURE__ */ jsx(StatCard, { label: "Presença média", value: `${stats.avg}%` }),
      /* @__PURE__ */ jsx(StatCard, { label: "Presença crítica (<40%)", value: stats.critical, accent: stats.critical > 0 }),
      /* @__PURE__ */ jsx(StatCard, { label: "Lesionados", value: stats.injured, accent: stats.injured > 0 })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "font-display text-lg", children: [
            "Atletas (",
            filtered.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar nome, posição, número", className: "h-8 w-64 pl-7 text-xs" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: unit, onValueChange: setUnit, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-36 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "todas", children: "Todas as unidades" }),
                UNITS.map((u) => /* @__PURE__ */ jsx(SelectItem, { value: u, children: u }, u))
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PresenceLegend, {})
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
        filtered.map((a) => {
          const tone = presenceTone(a.presence);
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-border bg-card p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-sm font-bold text-background", children: a.jersey }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium leading-none", children: a.name }),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                    a.position,
                    " · ",
                    a.unit
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Badge, { variant: statusVariant[a.status], className: "capitalize", children: a.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Presença" }),
                /* @__PURE__ */ jsxs("span", { className: `font-mono ${tone.text}`, children: [
                  a.presence,
                  "% · ",
                  tone.label
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: `h-full ${tone.bar} transition-all`, style: {
                width: `${Math.max(0, Math.min(100, a.presence))}%`
              } }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 text-[10px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "rounded border border-border px-1.5 py-0.5", children: [
                a.heightCm,
                " cm"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "rounded border border-border px-1.5 py-0.5", children: [
                a.weightKg,
                " kg"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-2 pt-2", children: [
              /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "flex-1", onClick: () => setEditing(a), children: [
                /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" }),
                " Editar perfil"
              ] }),
              /* @__PURE__ */ jsxs(Select, { value: a.status, onValueChange: (v) => {
                update(a.id, {
                  status: v
                });
                toast.success(`${a.name} marcado como ${v}`);
              }, children: [
                /* @__PURE__ */ jsxs(SelectTrigger, { className: "h-8 w-32 text-xs", "aria-label": "Status", children: [
                  /* @__PURE__ */ jsx(UserCog, { className: "mr-1 h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsx(SelectValue, {})
                ] }),
                /* @__PURE__ */ jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
              ] }),
              /* @__PURE__ */ jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", "aria-label": `Remover ${a.name}`, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) }),
                /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
                      "Remover ",
                      a.name,
                      "?"
                    ] }),
                    /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Essa ação remove o atleta do plantel. Você poderá readicioná-lo depois." })
                  ] }),
                  /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
                    /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => {
                      remove(a.id);
                      toast.success(`${a.name} removido do plantel`);
                    }, children: "Remover" })
                  ] })
                ] })
              ] })
            ] })
          ] }, a.id);
        }),
        filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "col-span-full py-10 text-center text-sm text-muted-foreground", children: "Nenhum atleta encontrado com esses filtros." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ProfileDialog, { athlete: editing, onClose: () => setEditing(null), onSave: (patch) => {
      if (!editing) return;
      update(editing.id, patch);
      toast.success("Perfil atualizado");
      setEditing(null);
    } }),
    /* @__PURE__ */ jsx(CreateDialog, { open: creating, onClose: () => setCreating(false), onCreate: (a) => {
      add(a);
      toast.success(`${a.name} adicionado ao plantel`);
      setCreating(false);
    } })
  ] });
}
function StatCard({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: `mt-2 font-display text-2xl font-semibold ${accent ? "text-destructive" : ""}`, children: value })
  ] });
}
function PresenceLegend() {
  const items = [{
    c: "bg-red-500",
    t: "< 40% Crítica"
  }, {
    c: "bg-yellow-400",
    t: "40–59% Atenção"
  }, {
    c: "bg-green-500",
    t: "60–69% Regular"
  }, {
    c: "bg-blue-500",
    t: "70–100% Ótima"
  }];
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 text-[10px] uppercase tracking-wider text-muted-foreground", children: items.map((i) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsx("span", { className: `inline-block h-2 w-3 rounded-sm ${i.c}` }),
    i.t
  ] }, i.t)) });
}
function ProfileDialog({
  athlete,
  onClose,
  onSave
}) {
  return /* @__PURE__ */ jsx(Dialog, { open: !!athlete, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-2xl", children: athlete && /* @__PURE__ */ jsx(AthleteForm, { initial: athlete, title: `Editar perfil — ${athlete.name}`, description: "Atualize dados do atleta, contato, métricas e observações.", submitLabel: "Salvar alterações", onSubmit: onSave, onCancel: onClose }) }) });
}
function CreateDialog({
  open,
  onClose,
  onCreate
}) {
  const empty = {
    name: "",
    jersey: 0,
    position: "",
    unit: "Ataque",
    presence: 100,
    status: "ativo",
    email: "",
    phone: "",
    birthdate: "",
    heightCm: 180,
    weightKg: 80,
    notes: ""
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-2xl", children: /* @__PURE__ */ jsx(AthleteForm, { initial: empty, title: "Novo atleta", description: "Cadastre um atleta no plantel.", submitLabel: "Adicionar", onSubmit: (patch) => onCreate({
    ...empty,
    ...patch
  }), onCancel: onClose }) }) });
}
function AthleteForm({
  initial,
  title,
  description,
  submitLabel,
  onSubmit,
  onCancel
}) {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({
    ...p,
    [k]: v
  }));
  return /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    onSubmit(form);
  }, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { className: "font-display", children: title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Field, { label: "Nome", children: /* @__PURE__ */ jsx(Input, { value: form.name, onChange: (e) => set("name", e.target.value) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Número", children: /* @__PURE__ */ jsx(Input, { type: "number", value: form.jersey, onChange: (e) => set("jersey", Number(e.target.value)) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Posição", children: /* @__PURE__ */ jsx(Input, { value: form.position, onChange: (e) => set("position", e.target.value) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Unidade", children: /* @__PURE__ */ jsxs(Select, { value: form.unit, onValueChange: (v) => set("unit", v), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: UNITS.map((u) => /* @__PURE__ */ jsx(SelectItem, { value: u, children: u }, u)) })
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxs(Select, { value: form.status, onValueChange: (v) => set("status", v), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "Presença (%)", children: /* @__PURE__ */ jsx(Input, { type: "number", min: 0, max: 100, value: form.presence, onChange: (e) => set("presence", Math.max(0, Math.min(100, Number(e.target.value)))) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Email", children: /* @__PURE__ */ jsx(Input, { type: "email", value: form.email, onChange: (e) => set("email", e.target.value) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Telefone", children: /* @__PURE__ */ jsx(Input, { value: form.phone, onChange: (e) => set("phone", e.target.value) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Nascimento", children: /* @__PURE__ */ jsx(Input, { type: "date", value: form.birthdate, onChange: (e) => set("birthdate", e.target.value) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Altura (cm)", children: /* @__PURE__ */ jsx(Input, { type: "number", value: form.heightCm, onChange: (e) => set("heightCm", Number(e.target.value)) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Peso (kg)", children: /* @__PURE__ */ jsx(Input, { type: "number", value: form.weightKg, onChange: (e) => set("weightKg", Number(e.target.value)) }) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Observações do treinador", children: /* @__PURE__ */ jsx(Textarea, { rows: 3, value: form.notes, onChange: (e) => set("notes", e.target.value), placeholder: "Histórico de lesões, pontos de atenção, recados…" }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: onCancel, children: "Cancelar" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: submitLabel })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
export {
  AtletasPage as component
};
