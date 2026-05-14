import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Pencil, Trash2, Play, RotateCcw, ChevronDown, Check, X } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { initialPlays, type Play as PlayType, type PlayPosition } from "@/lib/playbook-data";
import { currentAthlete } from "@/lib/mock-data";

export const Route = createFileRoute("/app/jogadas")({
  component: JogadasPage,
});

const STORAGE_KEY = "gladiators.plays.v2";

function loadPlays(): PlayType[] {
  if (typeof window === "undefined") return initialPlays;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PlayType[]) : initialPlays;
  } catch {
    return initialPlays;
  }
}

function savePlays(p: PlayType[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function JogadasPage() {
  const { role } = useRole();
  const isCoach = role === "treinador";
  const [plays, setPlays] = useState<PlayType[]>(() => loadPlays());
  const [selectedId, setSelectedId] = useState<string>(plays[0]?.id ?? "");
  const selected = useMemo(() => plays.find((p) => p.id === selectedId) ?? plays[0], [plays, selectedId]);

  const update = (p: PlayType[]) => {
    setPlays(p);
    savePlays(p);
  };

  const addPlay = (p: PlayType) => {
    const next = [...plays, p];
    update(next);
    setSelectedId(p.id);
  };
  const editPlay = (p: PlayType) => update(plays.map((x) => (x.id === p.id ? p : x)));
  const removePlay = (id: string) => {
    const next = plays.filter((p) => p.id !== id);
    update(next);
    if (selectedId === id) setSelectedId(next[0]?.id ?? "");
  };

  const myPosLabel = currentAthlete.position;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Playbook</p>
          <h1 className="font-display text-3xl font-semibold">Biblioteca de jogadas</h1>
          <p className="text-sm text-muted-foreground">
            {isCoach ? "Crie, edite e organize as jogadas do time." : `Veja sua posição (${myPosLabel}) destacada e a animação de cada jogada.`}
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
          <PlayDetail
            key={selected.id}
            play={selected}
            isCoach={isCoach}
            myPosLabel={myPosLabel}
            onEdit={editPlay}
            onRemove={removePlay}
          />
        )}
      </div>
    </div>
  );
}

function PlayDetail({
  play,
  isCoach,
  myPosLabel,
  onEdit,
  onRemove,
}: {
  play: PlayType;
  isCoach: boolean;
  myPosLabel: string;
  onEdit: (p: PlayType) => void;
  onRemove: (id: string) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  const start = () => {
    setPlaying(false);
    // força reset visual antes de animar de novo
    requestAnimationFrame(() => {
      setPlaying(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setPlaying(false), 3200);
    });
  };

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="font-display text-xl">{play.name}</CardTitle>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {play.category} · {play.formation}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{play.description}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button onClick={start} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {playing ? <RotateCcw className="mr-1 h-4 w-4 animate-spin" /> : <Play className="mr-1 h-4 w-4" />}
            {playing ? "Rodando…" : "Demonstrar"}
          </Button>
          {isCoach && (
            <>
              <PlayDialog
                initial={play}
                onSave={onEdit}
                trigger={<Button variant="outline" size="icon" aria-label="Editar"><Pencil className="h-4 w-4" /></Button>}
              />
              <Button variant="outline" size="icon" aria-label="Excluir" onClick={() => onRemove(play.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Field positions={play.positions} highlightLabel={!isCoach ? myPosLabel : undefined} playing={playing} />

        <BulletsPanel
          play={play}
          isCoach={isCoach}
          onSave={(bullets) => onEdit({ ...play, bullets })}
        />

        <div className="grid gap-2 sm:grid-cols-2">
          {play.positions.map((pos) => {
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
  );
}

function BulletsPanel({
  play,
  isCoach,
  onSave,
}: {
  play: PlayType;
  isCoach: boolean;
  onSave: (bullets: string[]) => void;
}) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string[]>(play.bullets);

  useEffect(() => {
    setDraft(play.bullets);
    setEditing(false);
  }, [play.id, play.bullets]);

  const update = (i: number, v: string) => setDraft((d) => d.map((x, idx) => (idx === i ? v : x)));
  const add = () => setDraft((d) => [...d, ""]);
  const remove = (i: number) => setDraft((d) => d.filter((_, idx) => idx !== i));
  const save = () => {
    onSave(draft.map((d) => d.trim()).filter(Boolean));
    setEditing(false);
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-lg border border-border bg-card">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
            aria-label="Alternar explicação da jogada"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Explicação</p>
              <p className="font-display text-base">Como executar a jogada</p>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border px-4 py-4">
            {!editing ? (
              <>
                {play.bullets.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sem explicação cadastrada.</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {play.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {isCoach && (
                  <div className="mt-3">
                    <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                      <Pencil className="mr-1 h-3 w-3" /> Editar bullets
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                {draft.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Textarea
                      rows={1}
                      value={b}
                      onChange={(e) => update(i, e.target.value)}
                      placeholder={`Bullet ${i + 1}`}
                      className="min-h-[36px]"
                    />
                    <Button variant="ghost" size="icon" onClick={() => remove(i)} aria-label="Remover">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={add}>
                    <Plus className="mr-1 h-3 w-3" /> Adicionar bullet
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setDraft(play.bullets); setEditing(false); }}>
                      <X className="mr-1 h-3 w-3" /> Cancelar
                    </Button>
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={save}>
                      <Check className="mr-1 h-3 w-3" /> Salvar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function Field({
  positions,
  highlightLabel,
  playing,
}: {
  positions: PlayPosition[];
  highlightLabel?: string;
  playing: boolean;
}) {
  // Linhas de jardas: 10, 20, 30, 40, 50, 40, 30, 20, 10
  const yardLines = [
    { y: 10, label: 10 },
    { y: 20, label: 20 },
    { y: 30, label: 30 },
    { y: 40, label: 40 },
    { y: 50, label: 50 },
    { y: 60, label: 40 },
    { y: 70, label: 30 },
    { y: 80, label: 20 },
    { y: 90, label: 10 },
  ];

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-white/40"
      style={{
        background:
          "repeating-linear-gradient(0deg, oklch(0.34 0.09 145) 0 5%, oklch(0.31 0.09 145) 5% 10%)",
      }}
    >
      {/* end zones */}
      <div className="absolute inset-x-0 top-0 h-[5%] border-b-2 border-white/70 bg-foreground/30" />
      <div className="absolute inset-x-0 bottom-0 h-[5%] border-t-2 border-white/70 bg-foreground/30" />

      {/* yard lines + numbers */}
      {yardLines.map((l, i) => (
        <div key={i} className="pointer-events-none absolute inset-x-0" style={{ top: `${l.y}%` }}>
          <div className={`border-t ${l.label === 50 ? "border-white/90 border-t-2" : "border-white/50"}`} />
          <span className="absolute left-[6%] -translate-y-1/2 font-mono text-[10px] font-bold text-white/80">
            {l.label}
          </span>
          <span className="absolute right-[6%] -translate-y-1/2 font-mono text-[10px] font-bold text-white/80">
            {l.label}
          </span>
        </div>
      ))}

      {/* hash marks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const y = 7 + i * 2.4;
        if (y > 92) return null;
        return (
          <div key={`h-${i}`} className="pointer-events-none absolute inset-x-0" style={{ top: `${y}%` }}>
            <div className="absolute left-[33%] h-px w-2 bg-white/50" />
            <div className="absolute left-[67%] h-px w-2 bg-white/50" />
          </div>
        );
      })}

      {/* sidelines */}
      <div className="pointer-events-none absolute inset-y-0 left-[3%] border-l-2 border-white/70" />
      <div className="pointer-events-none absolute inset-y-0 right-[3%] border-r-2 border-white/70" />

      {/* marcadores */}
      {positions.map((p) => {
        const mine = highlightLabel && p.label === highlightLabel;
        const targetX = playing && p.endX !== undefined ? p.endX : p.x;
        const targetY = playing && p.endY !== undefined ? p.endY : p.y;
        const hasMotion = p.endX !== undefined || p.endY !== undefined;
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${targetX}%`,
              top: `${targetY}%`,
              transition: "left 3s ease-in-out, top 3s ease-in-out",
            }}
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
            {hasMotion && playing && (
              <span className="absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-accent" />
            )}
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
  initial?: PlayType;
  onSave: (p: PlayType) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [formation, setFormation] = useState(initial?.formation ?? "");
  const [category, setCategory] = useState<PlayType["category"]>(initial?.category ?? "Ataque");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [bullets, setBullets] = useState<string[]>(initial?.bullets ?? [""]);
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
      bullets: bullets.map((b) => b.trim()).filter(Boolean),
      positions,
    });
    setOpen(false);
  };

  const updatePos = (i: number, patch: Partial<PlayPosition>) =>
    setPositions((ps) => ps.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  const addPos = () =>
    setPositions((ps) => [...ps, { id: `pos-${Date.now()}`, label: "WR", x: 50, y: 50, role: "" }]);

  const removePos = (i: number) => setPositions((ps) => ps.filter((_, idx) => idx !== i));

  const updateBullet = (i: number, v: string) => setBullets((b) => b.map((x, idx) => (idx === i ? v : x)));
  const addBullet = () => setBullets((b) => [...b, ""]);
  const removeBullet = (i: number) => setBullets((b) => b.filter((_, idx) => idx !== i));

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
              <Select value={category} onValueChange={(v) => setCategory(v as PlayType["category"])}>
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
              <Label>Bullets de explicação</Label>
              <Button type="button" size="sm" variant="outline" onClick={addBullet}>
                <Plus className="mr-1 h-3 w-3" /> Adicionar
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Textarea rows={1} value={b} onChange={(e) => updateBullet(i, e.target.value)} placeholder={`Bullet ${i + 1}`} className="min-h-[36px]" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeBullet(i)} aria-label="Remover">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
                  <Input className="col-span-2" type="number" min={0} max={100} value={p.x} onChange={(e) => updatePos(i, { x: Number(e.target.value) })} placeholder="X início" />
                  <Input className="col-span-2" type="number" min={0} max={100} value={p.y} onChange={(e) => updatePos(i, { y: Number(e.target.value) })} placeholder="Y início" />
                  <Input className="col-span-1" type="number" min={0} max={100} value={p.endX ?? ""} onChange={(e) => updatePos(i, { endX: e.target.value === "" ? undefined : Number(e.target.value) })} placeholder="X fim" />
                  <Input className="col-span-1" type="number" min={0} max={100} value={p.endY ?? ""} onChange={(e) => updatePos(i, { endY: e.target.value === "" ? undefined : Number(e.target.value) })} placeholder="Y fim" />
                  <Input className="col-span-3" value={p.role} onChange={(e) => updatePos(i, { role: e.target.value })} placeholder="Função" />
                  <Button type="button" variant="ghost" size="icon" className="col-span-1" onClick={() => removePos(i)} aria-label="Remover">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Coordenadas em % do campo (0–100). X/Y início = posição pré-snap; X/Y fim = onde o jogador termina (deixe vazio se não se move). Sigla deve bater com a posição do atleta para destacá-lo.</p>
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
