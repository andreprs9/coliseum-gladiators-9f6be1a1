import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2 } from "lucide-react";
import { athletes } from "@/lib/mock-data";
import { initialMonitoring, type MonitoringEntry } from "@/lib/playbook-data";

export const Route = createFileRoute("/app/monitoramento")({
  component: MonitoramentoPage,
});

const STORAGE_KEY = "gladiators.monitoring";
const metrics: MonitoringEntry["metric"][] = ["Velocidade", "Força", "Resistência", "Técnica", "Mental", "Avaliação geral"];

function load(): MonitoringEntry[] {
  if (typeof window === "undefined") return initialMonitoring;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MonitoringEntry[]) : initialMonitoring;
  } catch {
    return initialMonitoring;
  }
}

function save(e: MonitoringEntry[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(e));
}

function MonitoramentoPage() {
  const [entries, setEntries] = useState<MonitoringEntry[]>(() => load());
  const [athleteId, setAthleteId] = useState(athletes[0].id);
  const [metric, setMetric] = useState<MonitoringEntry["metric"]>("Avaliação geral");
  const [score, setScore] = useState(80);
  const [notes, setNotes] = useState("");

  const update = (next: MonitoringEntry[]) => {
    setEntries(next);
    save(next);
  };

  const add = () => {
    if (!notes.trim()) return;
    const e: MonitoringEntry = {
      id: `m-${Date.now()}`,
      athleteId,
      date: new Date().toISOString().slice(0, 10),
      metric,
      score: Math.max(0, Math.min(100, score)),
      notes: notes.trim(),
    };
    update([e, ...entries]);
    setNotes("");
  };

  const remove = (id: string) => update(entries.filter((e) => e.id !== id));

  const byAthlete = entries.reduce<Record<string, MonitoringEntry[]>>((acc, e) => {
    (acc[e.athleteId] ||= []).push(e);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Treinador</p>
        <h1 className="font-display text-3xl font-semibold">Monitoramento de atletas</h1>
        <p className="text-sm text-muted-foreground">Registre avaliações por métrica para cada atleta. As anotações ficam visíveis no painel do atleta.</p>
      </header>

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Nova avaliação</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-12">
          <div className="space-y-1 md:col-span-4">
            <Label>Atleta</Label>
            <Select value={athleteId} onValueChange={setAthleteId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {athletes.map((a) => (
                  <SelectItem key={a.id} value={a.id}>#{a.jersey} {a.name} ({a.position})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 md:col-span-3">
            <Label>Métrica</Label>
            <Select value={metric} onValueChange={(v) => setMetric(v as MonitoringEntry["metric"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {metrics.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label>Nota (0–100)</Label>
            <Input type="number" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} />
          </div>
          <div className="space-y-1 md:col-span-3">
            <Label>&nbsp;</Label>
            <Button onClick={add} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </div>
          <div className="space-y-1 md:col-span-12">
            <Label>Observações</Label>
            <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Pontos fortes, pontos a melhorar, contexto da avaliação…" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {athletes.map((a) => {
          const list = byAthlete[a.id] ?? [];
          if (list.length === 0) return null;
          return (
            <Card key={a.id}>
              <CardHeader>
                <CardTitle className="font-display text-base">#{a.jersey} {a.name} <span className="ml-1 text-xs font-normal text-muted-foreground">({a.position})</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {list.map((e) => (
                  <div key={e.id} className="rounded-md border border-border bg-card p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{e.metric}</Badge>
                        <span className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <Button variant="ghost" size="icon" aria-label="Excluir" onClick={() => remove(e.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Nota</span>
                      <span className="font-mono">{e.score}/100</span>
                    </div>
                    <Progress value={e.score} className="mt-1 h-1.5" />
                    <p className="mt-2 text-sm">{e.notes}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
