import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, TrendingUp, TrendingDown, Minus, Scale, Activity, FileText, MessageSquare } from "lucide-react";
import { useAthletes, presenceTone } from "@/lib/athletes-store";
import { useMonitoring, summarizeAthlete } from "@/lib/monitoring-store";
import type { MonitoringEntry } from "@/lib/playbook-data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Legend,
} from "recharts";

export const Route = createFileRoute("/app/monitoramento")({
  component: MonitoramentoPage,
});

const metricOptions: MonitoringEntry["metric"][] = [
  "Velocidade", "Força", "Resistência", "Técnica", "Mental", "Avaliação geral",
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function MonitoramentoPage() {
  const { athletes } = useAthletes();
  const monitoring = useMonitoring();
  const [athleteId, setAthleteId] = useState(athletes[0]?.id ?? "");
  const athlete = athletes.find((a) => a.id === athleteId);
  const summary = useMemo(
    () => (athlete ? summarizeAthlete(monitoring.state, athlete.id) : null),
    [monitoring.state, athlete],
  );

  if (!athlete || !summary) return null;
  const tone = presenceTone(athlete.presence);
  const bmi = athlete.heightCm > 0 ? (athlete.weightKg / Math.pow(athlete.heightCm / 100, 2)).toFixed(1) : "—";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Treinador</p>
        <h1 className="font-display text-3xl font-semibold">Monitoramento de atletas</h1>
        <p className="text-sm text-muted-foreground">
          Perfil completo, evolução, peso, avaliações técnicas e observações por atleta.
        </p>
      </header>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="space-y-1">
              <Label>Atleta</Label>
              <Select value={athleteId} onValueChange={setAthleteId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {athletes.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      #{a.jersey} {a.name} — {a.position} ({a.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="font-display text-base">Perfil</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-accent-foreground">
                {athlete.jersey}
              </div>
              <div>
                <p className="font-display text-lg">{athlete.name}</p>
                <p className="text-xs text-muted-foreground">{athlete.position} · {athlete.unit} · {athlete.status}</p>
              </div>
            </div>
            <Separator />
            <Grid label="E-mail" value={athlete.email} />
            <Grid label="Telefone" value={athlete.phone} />
            <Grid label="Nascimento" value={new Date(athlete.birthdate).toLocaleDateString("pt-BR")} />
            <Grid label="Altura" value={`${athlete.heightCm} cm`} />
            <Grid label="Peso atual" value={summary.currentWeight ? `${summary.currentWeight} kg` : `${athlete.weightKg} kg`} />
            <Grid label="IMC" value={bmi} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-display text-base">Indicadores</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <Indicator icon={<Activity className="h-4 w-4" />} label="Avaliação geral" value={`${summary.overall}/100`}>
              <Progress value={summary.overall} className="h-1.5" />
            </Indicator>
            <Indicator icon={<Activity className="h-4 w-4" />} label="Presença" value={`${athlete.presence}% · ${tone.label}`}>
              <div className="h-1.5 w-full rounded bg-muted">
                <div className={`h-1.5 rounded ${tone.bar}`} style={{ width: `${athlete.presence}%` }} />
              </div>
            </Indicator>
            <Indicator icon={<Scale className="h-4 w-4" />} label="Variação de peso" value={
              summary.weightDelta === 0 ? "estável" : `${summary.weightDelta > 0 ? "+" : ""}${summary.weightDelta.toFixed(1)} kg`
            }>
              <DeltaIcon delta={summary.weightDelta} />
            </Indicator>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-display text-base">Médias por métrica</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {summary.byMetric.length === 0 && <p className="text-muted-foreground">Sem avaliações.</p>}
            {summary.byMetric.map((b) => (
              <div key={b.metric}>
                <div className="flex justify-between text-xs">
                  <span>{b.metric}</span>
                  <span className="font-mono">{Math.round(b.avg)}/100</span>
                </div>
                <Progress value={b.avg} className="mt-1 h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="font-display text-base">Curva de evolução (avaliações)</CardTitle></CardHeader>
          <CardContent className="h-64">
            {summary.timeline.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados ainda.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={summary.timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis domain={[0, 100]} fontSize={11} />
                  <ReTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--accent))" name="Nota" />
                  <Line type="monotone" dataKey="rolling" stroke="hsl(var(--primary))" strokeDasharray="4 4" name="Média móvel" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="font-display text-base">Histórico de peso</CardTitle></CardHeader>
          <CardContent className="h-64">
            {summary.weights.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem registros de peso.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={summary.weights}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis domain={["auto", "auto"]} fontSize={11} />
                  <ReTooltip />
                  <Line type="monotone" dataKey="weightKg" stroke="hsl(var(--accent))" name="Peso (kg)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs for entries */}
      <Tabs defaultValue="metric">
        <TabsList>
          <TabsTrigger value="metric"><Activity className="mr-1 h-4 w-4" /> Avaliações</TabsTrigger>
          <TabsTrigger value="weight"><Scale className="mr-1 h-4 w-4" /> Peso</TabsTrigger>
          <TabsTrigger value="tech"><FileText className="mr-1 h-4 w-4" /> Técnica</TabsTrigger>
          <TabsTrigger value="general"><MessageSquare className="mr-1 h-4 w-4" /> Observações</TabsTrigger>
        </TabsList>

        <TabsContent value="metric"><MetricTab athleteId={athlete.id} /></TabsContent>
        <TabsContent value="weight"><WeightTab athleteId={athlete.id} /></TabsContent>
        <TabsContent value="tech"><TechTab athleteId={athlete.id} /></TabsContent>
        <TabsContent value="general"><GeneralTab athleteId={athlete.id} /></TabsContent>
      </Tabs>
    </div>
  );
}

function Grid({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function Indicator({ icon, label, value, children }: { icon: React.ReactNode; label: string; value: string; children?: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-muted-foreground">{icon}{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function DeltaIcon({ delta }: { delta: number }) {
  if (delta > 0) return <span className="flex items-center gap-1 text-xs text-yellow-500"><TrendingUp className="h-3 w-3" /> ganho</span>;
  if (delta < 0) return <span className="flex items-center gap-1 text-xs text-green-500"><TrendingDown className="h-3 w-3" /> perda</span>;
  return <span className="flex items-center gap-1 text-xs text-muted-foreground"><Minus className="h-3 w-3" /> estável</span>;
}

function MetricTab({ athleteId }: { athleteId: string }) {
  const { state, addMetric, removeMetric } = useMonitoring();
  const [metric, setMetric] = useState<MonitoringEntry["metric"]>("Avaliação geral");
  const [score, setScore] = useState(80);
  const [notes, setNotes] = useState("");
  const list = state.metrics.filter((m) => m.athleteId === athleteId);

  return (
    <Card>
      <CardHeader><CardTitle className="font-display text-base">Avaliações por métrica</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="space-y-1 md:col-span-4">
            <Label>Métrica</Label>
            <Select value={metric} onValueChange={(v) => setMetric(v as MonitoringEntry["metric"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{metricOptions.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label>Nota (0–100)</Label>
            <Input type="number" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} />
          </div>
          <div className="space-y-1 md:col-span-6">
            <Label>Observações</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Contexto da avaliação…" />
          </div>
          <div className="md:col-span-12">
            <Button
              onClick={() => {
                if (!notes.trim()) return;
                addMetric({ athleteId, metric, score: Math.max(0, Math.min(100, score)), notes: notes.trim(), date: todayISO() });
                setNotes("");
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Plus className="mr-1 h-4 w-4" /> Adicionar avaliação
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-muted-foreground">Sem avaliações.</p>}
          {list.map((e) => (
            <div key={e.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{e.metric}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">{e.score}/100</span>
                  <Button variant="ghost" size="icon" onClick={() => removeMetric(e.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <Progress value={e.score} className="mt-2 h-1.5" />
              <p className="mt-2 text-sm">{e.notes}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function WeightTab({ athleteId }: { athleteId: string }) {
  const { state, addWeight, removeWeight } = useMonitoring();
  const [weight, setWeight] = useState(85);
  const [date, setDate] = useState(todayISO());
  const list = state.weights.filter((w) => w.athleteId === athleteId).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card>
      <CardHeader><CardTitle className="font-display text-base">Acompanhamento de peso</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="space-y-1 md:col-span-3">
            <Label>Data</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-1 md:col-span-3">
            <Label>Peso (kg)</Label>
            <Input type="number" step="0.1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </div>
          <div className="md:col-span-6 flex items-end">
            <Button onClick={() => addWeight({ athleteId, date, weightKg: weight })} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-1 h-4 w-4" /> Registrar peso
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-muted-foreground">Sem registros.</p>}
          {list.map((w) => (
            <div key={w.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
              <span>{new Date(w.date).toLocaleDateString("pt-BR")}</span>
              <span className="font-mono">{w.weightKg.toFixed(1)} kg</span>
              <Button variant="ghost" size="icon" onClick={() => removeWeight(w.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TechTab({ athleteId }: { athleteId: string }) {
  const { state, addTechNote, removeTechNote } = useMonitoring();
  const [skill, setSkill] = useState("");
  const [rating, setRating] = useState(7);
  const [note, setNote] = useState("");
  const list = state.techNotes.filter((n) => n.athleteId === athleteId);

  return (
    <Card>
      <CardHeader><CardTitle className="font-display text-base">Notas de avaliação técnica</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="space-y-1 md:col-span-5">
            <Label>Habilidade</Label>
            <Input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Ex: Leitura de cobertura" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label>Nota (0–10)</Label>
            <Input type="number" min={0} max={10} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          </div>
          <div className="space-y-1 md:col-span-12">
            <Label>Observação técnica</Label>
            <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="md:col-span-12">
            <Button
              onClick={() => {
                if (!skill.trim() || !note.trim()) return;
                addTechNote({ athleteId, date: todayISO(), skill: skill.trim(), rating: Math.max(0, Math.min(10, rating)), note: note.trim() });
                setSkill(""); setNote("");
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Plus className="mr-1 h-4 w-4" /> Adicionar nota técnica
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-muted-foreground">Sem notas técnicas.</p>}
          {list.map((n) => (
            <div key={n.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{n.skill}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">{n.rating}/10</span>
                  <Button variant="ghost" size="icon" onClick={() => removeTechNote(n.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <p className="mt-2 text-sm">{n.note}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GeneralTab({ athleteId }: { athleteId: string }) {
  const { state, addGeneralNote, removeGeneralNote } = useMonitoring();
  const [note, setNote] = useState("");
  const list = state.generalNotes.filter((n) => n.athleteId === athleteId);

  return (
    <Card>
      <CardHeader><CardTitle className="font-display text-base">Observações gerais</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Comportamento, postura, contexto pessoal, lesões, recados…" />
        <Button
          onClick={() => {
            if (!note.trim()) return;
            addGeneralNote({ athleteId, date: todayISO(), note: note.trim() });
            setNote("");
          }}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="mr-1 h-4 w-4" /> Adicionar observação
        </Button>
        <Separator />
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-muted-foreground">Sem observações.</p>}
          {list.map((n) => (
            <div key={n.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString("pt-BR")}</span>
                <Button variant="ghost" size="icon" onClick={() => removeGeneralNote(n.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <p className="mt-2 text-sm">{n.note}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
