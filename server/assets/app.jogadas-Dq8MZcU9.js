import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useMemo, useRef, useEffect } from "react";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-bUfKKQGp.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-CVL4MaTW.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-D5JggGvu.js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Plus, Trash2, RotateCcw, Play, Pencil, ChevronDown, X, Check } from "lucide-react";
import { u as useRole } from "./role-context-j1oeL3ob.js";
import { i as initialPlays } from "./playbook-data-DgQPGQYH.js";
import { c as currentAthlete } from "./mock-data-C0Mhohwc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-dialog";
import "./router-BpKtBDtA.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@supabase/supabase-js";
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const STORAGE_KEY = "gladiators.plays.v2";
function loadPlays() {
  if (typeof window === "undefined") return initialPlays;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialPlays;
  } catch {
    return initialPlays;
  }
}
function savePlays(p) {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
function JogadasPage() {
  const {
    role
  } = useRole();
  const isCoach = role === "treinador";
  const [plays, setPlays] = useState(() => loadPlays());
  const [selectedId, setSelectedId] = useState(plays[0]?.id ?? "");
  const selected = useMemo(() => plays.find((p) => p.id === selectedId) ?? plays[0], [plays, selectedId]);
  const update = (p) => {
    setPlays(p);
    savePlays(p);
  };
  const addPlay = (p) => {
    const next = [...plays, p];
    update(next);
    setSelectedId(p.id);
  };
  const editPlay = (p) => update(plays.map((x) => x.id === p.id ? p : x));
  const removePlay = (id) => {
    const next = plays.filter((p) => p.id !== id);
    update(next);
    if (selectedId === id) setSelectedId(next[0]?.id ?? "");
  };
  const myPosLabel = currentAthlete.position;
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Playbook" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-semibold", children: "Biblioteca de jogadas" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isCoach ? "Crie, edite e organize as jogadas do time." : `Veja sua posição (${myPosLabel}) destacada e a animação de cada jogada.` })
      ] }),
      isCoach && /* @__PURE__ */ jsx(PlayDialog, { onSave: addPlay, trigger: /* @__PURE__ */ jsxs(Button, { className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " Nova jogada"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "font-display text-base", children: [
          "Jogadas (",
          plays.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "space-y-1", children: plays.map((p) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedId(p.id), className: `w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${p.id === selected?.id ? "border-accent bg-accent/10" : "border-border hover:bg-muted/50"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: p.name }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px]", children: p.category })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: p.formation })
        ] }, p.id)) })
      ] }),
      selected && /* @__PURE__ */ jsx(PlayDetail, { play: selected, isCoach, myPosLabel, onEdit: editPlay, onRemove: removePlay }, selected.id)
    ] })
  ] });
}
function PlayDetail({
  play,
  isCoach,
  myPosLabel,
  onEdit,
  onRemove
}) {
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const start = () => {
    setPlaying(false);
    requestAnimationFrame(() => {
      setPlaying(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setPlaying(false), 3200);
    });
  };
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "font-display text-xl", children: play.name }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground", children: [
          play.category,
          " · ",
          play.formation
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: play.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: start, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
          playing ? /* @__PURE__ */ jsx(RotateCcw, { className: "mr-1 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Play, { className: "mr-1 h-4 w-4" }),
          playing ? "Rodando…" : "Demonstrar"
        ] }),
        isCoach && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PlayDialog, { initial: play, onSave: onEdit, trigger: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", "aria-label": "Editar", children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", "aria-label": "Excluir", onClick: () => onRemove(play.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsx(Field, { positions: play.positions, highlightLabel: !isCoach ? myPosLabel : void 0, playing }),
      /* @__PURE__ */ jsx(BulletsPanel, { play, isCoach, onSave: (bullets) => onEdit({
        ...play,
        bullets
      }) }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: play.positions.map((pos) => {
        const mine = !isCoach && pos.label === myPosLabel;
        return /* @__PURE__ */ jsxs("div", { className: `rounded-md border p-3 text-sm ${mine ? "border-accent bg-accent/10" : "border-border bg-card"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-bold", children: pos.label }),
            mine && /* @__PURE__ */ jsx(Badge, { className: "bg-accent text-accent-foreground", children: "Sua posição" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: pos.role })
        ] }, pos.id);
      }) })
    ] })
  ] });
}
function BulletsPanel({
  play,
  isCoach,
  onSave
}) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(play.bullets);
  useEffect(() => {
    setDraft(play.bullets);
    setEditing(false);
  }, [play.id, play.bullets]);
  const update = (i, v) => setDraft((d) => d.map((x, idx) => idx === i ? v : x));
  const add = () => setDraft((d) => [...d, ""]);
  const remove = (i) => setDraft((d) => d.filter((_, idx) => idx !== i));
  const save = () => {
    onSave(draft.map((d) => d.trim()).filter(Boolean));
    setEditing(false);
  };
  return /* @__PURE__ */ jsx(Collapsible, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { type: "button", className: "flex w-full items-center justify-between gap-2 px-4 py-3 text-left", "aria-label": "Alternar explicação da jogada", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-accent", children: "Explicação" }),
        /* @__PURE__ */ jsx("p", { className: "font-display text-base", children: "Como executar a jogada" })
      ] }),
      /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${open ? "rotate-180" : ""}` })
    ] }) }),
    /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx("div", { className: "border-t border-border px-4 py-4", children: !editing ? /* @__PURE__ */ jsxs(Fragment, { children: [
      play.bullets.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sem explicação cadastrada." }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: play.bullets.map((b, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent", "aria-hidden": true }),
        /* @__PURE__ */ jsx("span", { children: b })
      ] }, i)) }),
      isCoach && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => setEditing(true), children: [
        /* @__PURE__ */ jsx(Pencil, { className: "mr-1 h-3 w-3" }),
        " Editar bullets"
      ] }) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      draft.map((b, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(Textarea, { rows: 1, value: b, onChange: (e) => update(i, e.target.value), placeholder: `Bullet ${i + 1}`, className: "min-h-[36px]" }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(i), "aria-label": "Remover", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, i)),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-1", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: add, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3 w-3" }),
          " Adicionar bullet"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
            setDraft(play.bullets);
            setEditing(false);
          }, children: [
            /* @__PURE__ */ jsx(X, { className: "mr-1 h-3 w-3" }),
            " Cancelar"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", className: "bg-accent text-accent-foreground hover:bg-accent/90", onClick: save, children: [
            /* @__PURE__ */ jsx(Check, { className: "mr-1 h-3 w-3" }),
            " Salvar"
          ] })
        ] })
      ] })
    ] }) }) })
  ] }) });
}
function Field({
  positions,
  highlightLabel,
  playing
}) {
  const yardLines = [{
    y: 10,
    label: 10
  }, {
    y: 20,
    label: 20
  }, {
    y: 30,
    label: 30
  }, {
    y: 40,
    label: 40
  }, {
    y: 50,
    label: 50
  }, {
    y: 60,
    label: 40
  }, {
    y: 70,
    label: 30
  }, {
    y: 80,
    label: 20
  }, {
    y: 90,
    label: 10
  }];
  return /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-white/40", style: {
    background: "repeating-linear-gradient(0deg, oklch(0.34 0.09 145) 0 5%, oklch(0.31 0.09 145) 5% 10%)"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-[5%] border-b-2 border-white/70 bg-foreground/30" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-[5%] border-t-2 border-white/70 bg-foreground/30" }),
    yardLines.map((l, i) => /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-x-0", style: {
      top: `${l.y}%`
    }, children: [
      /* @__PURE__ */ jsx("div", { className: `border-t ${l.label === 50 ? "border-white/90 border-t-2" : "border-white/50"}` }),
      /* @__PURE__ */ jsx("span", { className: "absolute left-[6%] -translate-y-1/2 font-mono text-[10px] font-bold text-white/80", children: l.label }),
      /* @__PURE__ */ jsx("span", { className: "absolute right-[6%] -translate-y-1/2 font-mono text-[10px] font-bold text-white/80", children: l.label })
    ] }, i)),
    Array.from({
      length: 36
    }).map((_, i) => {
      const y = 7 + i * 2.4;
      if (y > 92) return null;
      return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-x-0", style: {
        top: `${y}%`
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[33%] h-px w-2 bg-white/50" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-[67%] h-px w-2 bg-white/50" })
      ] }, `h-${i}`);
    }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-[3%] border-l-2 border-white/70" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-[3%] border-r-2 border-white/70" }),
    positions.map((p) => {
      const mine = highlightLabel && p.label === highlightLabel;
      const targetX = playing && p.endX !== void 0 ? p.endX : p.x;
      const targetY = playing && p.endY !== void 0 ? p.endY : p.y;
      const hasMotion = p.endX !== void 0 || p.endY !== void 0;
      return /* @__PURE__ */ jsxs("div", { className: "absolute -translate-x-1/2 -translate-y-1/2", style: {
        left: `${targetX}%`,
        top: `${targetY}%`,
        transition: "left 3s ease-in-out, top 3s ease-in-out"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: `flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold shadow-md ${mine ? "border-white bg-accent text-accent-foreground ring-4 ring-accent/40" : "border-white bg-foreground text-background"}`, title: `${p.label} — ${p.role}`, children: p.label }),
        hasMotion && playing && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-accent" })
      ] }, p.id);
    })
  ] });
}
function PlayDialog({
  initial,
  onSave,
  trigger
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [formation, setFormation] = useState(initial?.formation ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Ataque");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [bullets, setBullets] = useState(initial?.bullets ?? [""]);
  const [positions, setPositions] = useState(initial?.positions ?? [{
    id: `pos-${Date.now()}`,
    label: "QB",
    x: 50,
    y: 70,
    role: ""
  }]);
  const submit = () => {
    onSave({
      id: initial?.id ?? `p-${Date.now()}`,
      name: name.trim() || "Sem nome",
      formation: formation.trim() || "—",
      category,
      description: description.trim(),
      bullets: bullets.map((b) => b.trim()).filter(Boolean),
      positions
    });
    setOpen(false);
  };
  const updatePos = (i, patch) => setPositions((ps) => ps.map((p, idx) => idx === i ? {
    ...p,
    ...patch
  } : p));
  const addPos = () => setPositions((ps) => [...ps, {
    id: `pos-${Date.now()}`,
    label: "WR",
    x: 50,
    y: 50,
    role: ""
  }]);
  const removePos = (i) => setPositions((ps) => ps.filter((_, idx) => idx !== i));
  const updateBullet = (i, v) => setBullets((b) => b.map((x, idx) => idx === i ? v : x));
  const addBullet = () => setBullets((b) => [...b, ""]);
  const removeBullet = (i) => setBullets((b) => b.filter((_, idx) => idx !== i));
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] max-w-2xl overflow-y-auto", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: initial ? "Editar jogada" : "Nova jogada" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { children: "Nome" }),
            /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Slant Right 22" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { children: "Formação" }),
            /* @__PURE__ */ jsx(Input, { value: formation, onChange: (e) => setFormation(e.target.value), placeholder: "Shotgun Trips" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { children: "Categoria" }),
            /* @__PURE__ */ jsxs(Select, { value: category, onValueChange: (v) => setCategory(v), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "Ataque", children: "Ataque" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "Defesa", children: "Defesa" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "Especial", children: "Especial" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 sm:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Descrição" }),
            /* @__PURE__ */ jsx(Textarea, { rows: 2, value: description, onChange: (e) => setDescription(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Bullets de explicação" }),
            /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: addBullet, children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3 w-3" }),
              " Adicionar"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: bullets.map((b, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Textarea, { rows: 1, value: b, onChange: (e) => updateBullet(i, e.target.value), placeholder: `Bullet ${i + 1}`, className: "min-h-[36px]" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeBullet(i), "aria-label": "Remover", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Posições" }),
            /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: addPos, children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3 w-3" }),
              " Adicionar"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: positions.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center gap-2 rounded-md border border-border p-2", children: [
            /* @__PURE__ */ jsx(Input, { className: "col-span-2", value: p.label, onChange: (e) => updatePos(i, {
              label: e.target.value
            }), placeholder: "Sigla" }),
            /* @__PURE__ */ jsx(Input, { className: "col-span-2", type: "number", min: 0, max: 100, value: p.x, onChange: (e) => updatePos(i, {
              x: Number(e.target.value)
            }), placeholder: "X início" }),
            /* @__PURE__ */ jsx(Input, { className: "col-span-2", type: "number", min: 0, max: 100, value: p.y, onChange: (e) => updatePos(i, {
              y: Number(e.target.value)
            }), placeholder: "Y início" }),
            /* @__PURE__ */ jsx(Input, { className: "col-span-1", type: "number", min: 0, max: 100, value: p.endX ?? "", onChange: (e) => updatePos(i, {
              endX: e.target.value === "" ? void 0 : Number(e.target.value)
            }), placeholder: "X fim" }),
            /* @__PURE__ */ jsx(Input, { className: "col-span-1", type: "number", min: 0, max: 100, value: p.endY ?? "", onChange: (e) => updatePos(i, {
              endY: e.target.value === "" ? void 0 : Number(e.target.value)
            }), placeholder: "Y fim" }),
            /* @__PURE__ */ jsx(Input, { className: "col-span-3", value: p.role, onChange: (e) => updatePos(i, {
              role: e.target.value
            }), placeholder: "Função" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "col-span-1", onClick: () => removePos(i), "aria-label": "Remover", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, p.id)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Coordenadas em % do campo (0–100). X/Y início = posição pré-snap; X/Y fim = onde o jogador termina (deixe vazio se não se move). Sigla deve bater com a posição do atleta para destacá-lo." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { onClick: submit, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: "Salvar" })
      ] })
    ] })
  ] });
}
export {
  JogadasPage as component
};
