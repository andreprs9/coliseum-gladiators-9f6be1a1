import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Plus, Search, Trash2, UserCog } from "lucide-react";
import { useAthletes, presenceTone, type Athlete, type AthleteStatus } from "@/lib/athletes-store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/atletas")({
  component: AtletasPage,
});

const UNITS = ["Ataque", "Defesa", "Especial"] as const;
const STATUSES: AthleteStatus[] = ["ativo", "lesionado", "suspenso", "inativo"];

const statusVariant: Record<AthleteStatus, "default" | "secondary" | "destructive" | "outline"> = {
  ativo: "default",
  lesionado: "destructive",
  suspenso: "outline",
  inativo: "secondary",
};

function AtletasPage() {
  const { athletes, update, remove, add } = useAthletes();
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState<string>("todas");
  const [editing, setEditing] = useState<Athlete | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(
    () =>
      athletes.filter((a) => {
        const matchU = unit === "todas" || a.unit === unit;
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          a.name.toLowerCase().includes(q) ||
          a.position.toLowerCase().includes(q) ||
          String(a.jersey).includes(q);
        return matchU && matchQ;
      }),
    [athletes, query, unit],
  );

  const stats = useMemo(() => {
    const avg = athletes.length
      ? Math.round(athletes.reduce((s, a) => s + a.presence, 0) / athletes.length)
      : 0;
    const critical = athletes.filter((a) => a.presence < 40).length;
    const injured = athletes.filter((a) => a.status === "lesionado").length;
    return { total: athletes.length, avg, critical, injured };
  }, [athletes]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Treinador</p>
          <h1 className="font-display text-3xl font-semibold">Gestão do elenco</h1>
          <p className="text-sm text-muted-foreground">
            Edite perfis, monitore presença e gerencie status do plantel.
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" /> Novo atleta
        </Button>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Atletas no plantel" value={stats.total} />
        <StatCard label="Presença média" value={`${stats.avg}%`} />
        <StatCard label="Presença crítica (<40%)" value={stats.critical} accent={stats.critical > 0} />
        <StatCard label="Lesionados" value={stats.injured} accent={stats.injured > 0} />
      </div>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="font-display text-lg">Atletas ({filtered.length})</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar nome, posição, número"
                  className="h-8 w-64 pl-7 text-xs"
                />
              </div>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="h-8 w-36 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as unidades</SelectItem>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <PresenceLegend />
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => {
            const tone = presenceTone(a.presence);
            return (
              <div key={a.id} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-sm font-bold text-background">
                      {a.jersey}
                    </div>
                    <div>
                      <p className="font-medium leading-none">{a.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {a.position} · {a.unit}
                      </p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[a.status]} className="capitalize">{a.status}</Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Presença</span>
                    <span className={`font-mono ${tone.text}`}>{a.presence}% · {tone.label}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${tone.bar} transition-all`}
                      style={{ width: `${Math.max(0, Math.min(100, a.presence))}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                  <span className="rounded border border-border px-1.5 py-0.5">{a.heightCm} cm</span>
                  <span className="rounded border border-border px-1.5 py-0.5">{a.weightKg} kg</span>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(a)}>
                    <Pencil className="h-3.5 w-3.5" /> Editar perfil
                  </Button>
                  <Select
                    value={a.status}
                    onValueChange={(v) => {
                      update(a.id, { status: v as AthleteStatus });
                      toast.success(`${a.name} marcado como ${v}`);
                    }}
                  >
                    <SelectTrigger className="h-8 w-32 text-xs" aria-label="Status">
                      <UserCog className="mr-1 h-3.5 w-3.5" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost" aria-label={`Remover ${a.name}`}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover {a.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação remove o atleta do plantel. Você poderá readicioná-lo depois.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            remove(a.id);
                            toast.success(`${a.name} removido do plantel`);
                          }}
                        >
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
              Nenhum atleta encontrado com esses filtros.
            </p>
          )}
        </CardContent>
      </Card>

      <ProfileDialog
        athlete={editing}
        onClose={() => setEditing(null)}
        onSave={(patch) => {
          if (!editing) return;
          update(editing.id, patch);
          toast.success("Perfil atualizado");
          setEditing(null);
        }}
      />

      <CreateDialog
        open={creating}
        onClose={() => setCreating(false)}
        onCreate={(a) => {
          add(a);
          toast.success(`${a.name} adicionado ao plantel`);
          setCreating(false);
        }}
      />
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-2 font-display text-2xl font-semibold ${accent ? "text-destructive" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function PresenceLegend() {
  const items = [
    { c: "bg-red-500", t: "< 40% Crítica" },
    { c: "bg-yellow-400", t: "40–59% Atenção" },
    { c: "bg-green-500", t: "60–69% Regular" },
    { c: "bg-blue-500", t: "70–100% Ótima" },
  ];
  return (
    <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
      {items.map((i) => (
        <span key={i.t} className="inline-flex items-center gap-1.5">
          <span className={`inline-block h-2 w-3 rounded-sm ${i.c}`} />
          {i.t}
        </span>
      ))}
    </div>
  );
}

function ProfileDialog({
  athlete,
  onClose,
  onSave,
}: {
  athlete: Athlete | null;
  onClose: () => void;
  onSave: (patch: Partial<Athlete>) => void;
}) {
  return (
    <Dialog open={!!athlete} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        {athlete && (
          <AthleteForm
            initial={athlete}
            title={`Editar perfil — ${athlete.name}`}
            description="Atualize dados do atleta, contato, métricas e observações."
            submitLabel="Salvar alterações"
            onSubmit={onSave}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function CreateDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (a: Omit<Athlete, "id">) => void;
}) {
  const empty: Omit<Athlete, "id"> = {
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
    notes: "",
  };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <AthleteForm
          initial={empty}
          title="Novo atleta"
          description="Cadastre um atleta no plantel."
          submitLabel="Adicionar"
          onSubmit={(patch) => onCreate({ ...empty, ...patch })}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

function AthleteForm({
  initial,
  title,
  description,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: Omit<Athlete, "id">;
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: (patch: Omit<Athlete, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.name.trim()) {
          toast.error("Nome é obrigatório");
          return;
        }
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <DialogHeader>
        <DialogTitle className="font-display">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Número">
          <Input
            type="number"
            value={form.jersey}
            onChange={(e) => set("jersey", Number(e.target.value))}
          />
        </Field>
        <Field label="Posição">
          <Input value={form.position} onChange={(e) => set("position", e.target.value)} />
        </Field>
        <Field label="Unidade">
          <Select value={form.unit} onValueChange={(v) => set("unit", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onValueChange={(v) => set("status", v as AthleteStatus)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Presença (%)">
          <Input
            type="number"
            min={0}
            max={100}
            value={form.presence}
            onChange={(e) => set("presence", Math.max(0, Math.min(100, Number(e.target.value))))}
          />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Telefone">
          <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Nascimento">
          <Input type="date" value={form.birthdate} onChange={(e) => set("birthdate", e.target.value)} />
        </Field>
        <Field label="Altura (cm)">
          <Input
            type="number"
            value={form.heightCm}
            onChange={(e) => set("heightCm", Number(e.target.value))}
          />
        </Field>
        <Field label="Peso (kg)">
          <Input
            type="number"
            value={form.weightKg}
            onChange={(e) => set("weightKg", Number(e.target.value))}
          />
        </Field>
      </div>

      <Field label="Observações do treinador">
        <Textarea
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Histórico de lesões, pontos de atenção, recados…"
        />
      </Field>

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
