import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, Scale, TrendingDown, TrendingUp, Minus, FileText, MessageSquare } from "lucide-react";
import { currentAthlete, myImprovements } from "@/lib/mock-data";
import { useAthletes, presenceTone } from "@/lib/athletes-store";
import { useMonitoring, summarizeAthlete } from "@/lib/monitoring-store";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Legend,
} from "recharts";

export const Route = createFileRoute("/app/desempenho")({
  component: DesempenhoPage,
});

function DesempenhoPage() {
  const { athletes } = useAthletes();
  const monitoring = useMonitoring();
  const me = athletes.find((a) => a.id === currentAthlete.id) ?? null;
  const summary = useMemo(
    () => summarizeAthlete(monitoring.state, currentAthlete.id),
    [monitoring.state],
  );
  const presence = me?.presence ?? 0;
  const tone = presenceTone(presence);
  const bmi = me && me.heightCm > 0
    ? (me.weightKg / Math.pow(me.heightCm / 100, 2)).toFixed(1)
    : "—";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Atleta</p>
          <h1 className="font-display text-3xl font-semibold">Meu desempenho</h1>
          <p className="text-sm text-muted-foreground">
            {currentAthlete.name} · #{currentAthlete.jersey} · {currentAthlete.position}
          </p>
        </div>
        <Badge variant="outline" className="text-xs uppercase tracking-wider">{currentAthlete.unit}</Badge>
      </header>

      {/* Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Avaliação geral" value={`${summary.overall}/100`} icon={<Activity className="h-4 w-4" />}>
          <Progress value={summary.overall} className="h-1.5" />
        </StatCard>
        <StatCard label="Presença" value={`${presence}% · ${tone.label}`} icon={<Activity className="h-4 w-4" />}>
          <div className="h-1.5 w-full rounded bg-muted">
            <div className={`h-1.5 rounded ${tone.bar}`} style={{ width: `${presence}%` }} />
          </div>
        </StatCard>
        <StatCard
          label="Peso atual"
          value={summary.currentWeight ? `${summary.currentWeight.toFixed(1)} kg` : `${me?.weightKg ?? "—"} kg`}
          icon={<Scale className="h-4 w-4" />}
        >
          <DeltaLabel delta={summary.weightDelta} />
        </StatCard>
        <StatCard label="IMC" value={bmi} icon={<Activity className="h-4 w-4" />}>
          <p className="text-[11px] text-muted-foreground">Altura: {me?.heightCm ?? "—"} cm</p>
        </StatCard>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="font-display text-base">Minha curva de evolução</CardTitle></CardHeader>
          <CardContent className="h-64">
            {summary.timeline.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ainda sem avaliações registradas.</p>
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
          <CardHeader><CardTitle className="font-display text-base">Evolução de peso</CardTitle></CardHeader>
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

      {/* Average per metric */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Médias por métrica</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {summary.byMetric.length === 0 && <p className="text-sm text-muted-foreground">Sem dados.</p>}
          {summary.byMetric.map((b) => (
            <div key={b.metric}>
              <div className="flex justify-between text-xs">
                <span>{b.metric}</span>
                <span className="font-mono">{Math.round(b.avg)}/100 · última {b.last}</span>
              </div>
              <Progress value={b.avg} className="mt-1 h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Coach evaluations */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base flex items-center gap-2"><Activity className="h-4 w-4" /> Avaliações do treinador</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {summary.metrics.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma avaliação registrada.</p>}
          {summary.metrics.map((e) => (
            <div key={e.id} className="rounded-md border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{e.metric}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <span className="font-mono text-sm">{e.score}/100</span>
              </div>
              <Progress value={e.score} className="mt-2 h-1.5" />
              <p className="mt-3 text-sm text-muted-foreground">{e.notes}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Technical notes */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Notas técnicas</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {summary.techNotes.length === 0 && <p className="text-sm text-muted-foreground">Sem notas técnicas.</p>}
          {summary.techNotes.map((n) => (
            <div key={n.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{n.skill}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <span className="font-mono text-xs">{n.rating}/10</span>
              </div>
              <p className="mt-2 text-sm">{n.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* General observations */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Observações do treinador</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {summary.generalNotes.length === 0 && <p className="text-sm text-muted-foreground">Sem observações.</p>}
          {summary.generalNotes.map((n) => (
            <div key={n.id} className="rounded-md border border-border p-3">
              <span className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString("pt-BR")}</span>
              <p className="mt-1 text-sm">{n.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Oportunidades de melhoria</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          {myImprovements.map((i) => (
            <div key={i.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{i.area}</p>
                <span className="font-mono text-sm">{i.score}/100</span>
              </div>
              <Progress value={i.score} className="mt-2 h-1.5" />
              <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Recomendação: </strong>{i.recommendation}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon, children }: { label: string; value: string; icon: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">{icon}{label}</span>
        </div>
        <p className="font-display text-xl">{value}</p>
        {children}
      </CardContent>
    </Card>
  );
}

function DeltaLabel({ delta }: { delta: number }) {
  if (delta > 0) return <p className="flex items-center gap-1 text-[11px] text-yellow-500"><TrendingUp className="h-3 w-3" /> +{delta.toFixed(1)} kg no período</p>;
  if (delta < 0) return <p className="flex items-center gap-1 text-[11px] text-green-500"><TrendingDown className="h-3 w-3" /> {delta.toFixed(1)} kg no período</p>;
  return <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><Minus className="h-3 w-3" /> estável</p>;
}
