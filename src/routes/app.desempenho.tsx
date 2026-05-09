import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { currentAthlete, myImprovements } from "@/lib/mock-data";
import { initialMonitoring, type MonitoringEntry } from "@/lib/playbook-data";

export const Route = createFileRoute("/app/desempenho")({
  component: DesempenhoPage,
});

const STORAGE_KEY = "gladiators.monitoring";

function load(): MonitoringEntry[] {
  if (typeof window === "undefined") return initialMonitoring;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MonitoringEntry[]) : initialMonitoring;
  } catch {
    return initialMonitoring;
  }
}

function DesempenhoPage() {
  const [entries] = useState<MonitoringEntry[]>(() => load());
  const mine = entries.filter((e) => e.athleteId === currentAthlete.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Atleta</p>
          <h1 className="font-display text-3xl font-semibold">Meu desempenho</h1>
          <p className="text-sm text-muted-foreground">{currentAthlete.name} · #{currentAthlete.jersey} · {currentAthlete.position}</p>
        </div>
        <Badge variant="outline" className="text-xs uppercase tracking-wider">{currentAthlete.unit}</Badge>
      </header>

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Avaliações do treinador</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {mine.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma avaliação registrada ainda.</p>}
          {mine.map((e) => (
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
