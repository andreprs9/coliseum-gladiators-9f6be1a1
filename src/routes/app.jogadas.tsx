import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { initialPlays, type Play, type PlayPosition } from "@/lib/playbook-data";
import { currentAthlete } from "@/lib/mock-data";

export const Route = createFileRoute("/app/jogadas")({
  component: JogadasPage,
});

const STORAGE_KEY = "gladiators.plays";

function loadPlays(): Play[] {
  if (typeof window === "undefined") return initialPlays;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Play[]) : initialPlays;
  } catch {
    return initialPlays;
  }
}

function savePlays(p: Play[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function JogadasPage() {
  const { role } = useRole();
  const isCoach = role === "treinador";
  const [plays, setPlays] = useState<Play[]>(() => loadPlays());
  const [selectedId, setSelectedId] = useState<string>(plays[0]?.id ?? "");
  const selected = useMemo(() => plays.find((p) => p.id === selectedId) ?? plays[0], [plays, selectedId]);

  const update = (p: Play[]) => {
    setPlays(p);
    savePlays(p);
  };

  const addPlay = (p: Play) => {
    const next = [...plays, p];
    update(next);
    setSelectedId(p.id);
  };
  const editPlay = (p: Play) => update(plays.map((x) => (x.id === p.id ? p : x)));
  const removePlay = (id: string) => {
    const next = plays.filter((p) => p.id !== id);
    update(next);
    if (selectedId === id) setSelectedId(next[0]?.id ?? "");
  };

  // posição que o atleta atual ocupa (mock: por sigla da posição)
  const myPosLabel = currentAthlete.position;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Playbook</p>
          <h1 className="font-display text-3xl font-semibold">Biblioteca de jogadas</h1>
          <p className="text-sm text-muted-foreground">
            {isCoach ? "Crie, edite e organize as jogadas do time." : `Veja sua posição (${myPosLabel}) destacada em cada jogada.`}
          </p>
        </div>
        {isCoach && <PlayDialog onSave={addPlay} trigger={<Button className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="mr-1 h-4 w-4" /> Nova jogada</Button>} />}
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader><CardTitle className="font-display text-base">Jogadas ({plays.length})</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {plays.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                  p.id === selected?.id ? "border-accent bg-accent/10" : "border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{p.name}</span>
                  <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.formation}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {selected && (
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="font-display text-xl">{selected.name}</CardTitle>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {selected.category} · {selected.formation}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{selected.description}</p>
              </div>
              {isCoach && (
                <div className="flex gap-1">
                  <PlayDialog
                    initial={selected}
                    onSave={editPlay}
                    trigger={<Button variant="outline" size="icon" aria-label="Editar"><Pencil className="h-4 w-4" /></Button>}
                  />
                  <Button variant="outline" size="icon" aria-label="Excluir" onClick={() => removePlay(selected.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Field positions={selected.positions} highlightLabel={!isCoach ? myPosLabel : undefined} />
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {selected.positions.map((pos) => {
                  const mine = !isCoach && pos.label === myPosLabel;
                  return (
                    <div
                      key={pos.id}
                      className={`rounded-md border p-3 text-sm ${mine ? "border-accent bg-accent/10" : "border-border bg-card"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold">{pos.label}</span>
                        {mine && <Badge className="bg-accent text-accent-foreground">Sua posição</Badge>}
                      </div>
                      <p className="mt-1 text-muted-foreground">{pos.role}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function Field({ positions, highlightLabel }: { positions: PlayPosition[]; highlightLabel?: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-[oklch(0.32_0.08_145)]">
      {/* linhas do campo */}
      {[10, 25, 40, 50, 60, 75, 90].map((y) => (
        <div key={y} className="absolute inset-x-0 border-t border-white/30" style={{ top: `${y}%` }} />
      ))}
      <div className="absolute inset-x-0 top-1/2 border-t-2 border-white/70" />
      {/* marcadores */}
      {positions.map((p) => {
        const mine = highlightLabel && p.label === highlightLabel;
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold shadow-md ${
                mine
                  ? "border-white bg-accent text-accent-foreground ring-4 ring-accent/40"
                  : "border-white bg-foreground text-background"
              }`}
              title={`${p.label} — ${p.role}`}
            >
              {p.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Dialog para criar/editar jogada
function PlayDialog({
  initial,
  onSave,
  trigger,
}: {
  initial?: Play;
  onSave: (p: Play) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [formation, setFormation] = useState(initial?.formation ?? "");
  const [category, setCategory] = useState<Play["category"]>(initial?.category ?? "Ataque");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [positions, setPositions] = useState<PlayPosition[]>(
    initial?.positions ?? [{ id: `pos-${Date.now()}`, label: "QB", x: 50, y: 70, role: "" }],
  );

  const submit = () => {
    onSave({
      id: initial?.id ?? `p-${Date.now()}`,
      name: name.trim() || "Sem nome",
      formation: formation.trim() || "—",
      category,
      description: description.trim(),
      positions,
    });
    setOpen(false);
  };

  const updatePos = (i: number, patch: Partial<PlayPosition>) =>
    setPositions((ps) => ps.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  const addPos = () =>
    setPositions((ps) => [...ps, { id: `pos-${Date.now()}`, label: "WR", x: 50, y: 50, role: "" }]);

  const removePos = (i: number) => setPositions((ps) => ps.filter((_, idx) => idx !== i));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Editar jogada" : "Nova jogada"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Slant Right 22" />
            </div>
            <div className="space-y-1">
              <Label>Formação</Label>
              <Input value={formation} onChange={(e) => setFormation(e.target.value)} placeholder="Shotgun Trips" />
            </div>
            <div className="space-y-1">
              <Label>Categoria</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Play["category"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ataque">Ataque</SelectItem>
                  <SelectItem value="Defesa">Defesa</SelectItem>
                  <SelectItem value="Especial">Especial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Descrição</Label>
              <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Posições</Label>
              <Button type="button" size="sm" variant="outline" onClick={addPos}><Plus className="mr-1 h-3 w-3" /> Adicionar</Button>
            </div>
            <div className="mt-2 space-y-2">
              {positions.map((p, i) => (
                <div key={p.id} className="grid grid-cols-12 items-center gap-2 rounded-md border border-border p-2">
                  <Input className="col-span-2" value={p.label} onChange={(e) => updatePos(i, { label: e.target.value })} placeholder="Sigla" />
                  <Input className="col-span-2" type="number" min={0} max={100} value={p.x} onChange={(e) => updatePos(i, { x: Number(e.target.value) })} placeholder="X%" />
                  <Input className="col-span-2" type="number" min={0} max={100} value={p.y} onChange={(e) => updatePos(i, { y: Number(e.target.value) })} placeholder="Y%" />
                  <Input className="col-span-5" value={p.role} onChange={(e) => updatePos(i, { role: e.target.value })} placeholder="Função na jogada" />
                  <Button type="button" variant="ghost" size="icon" className="col-span-1" onClick={() => removePos(i)} aria-label="Remover">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Coordenadas em % do campo (0–100). Sigla deve bater com a posição do atleta para destacá-lo.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={submit} className="bg-accent text-accent-foreground hover:bg-accent/90">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
