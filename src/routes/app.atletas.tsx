import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { athletes } from "@/lib/mock-data";

export const Route = createFileRoute("/app/atletas")({
  component: AtletasPage,
});

function AtletasPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Treinador</p>
        <h1 className="font-display text-3xl font-semibold">Elenco e presença</h1>
        <p className="text-sm text-muted-foreground">Acompanhe presença, posição e unidade de cada atleta.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Atletas ({athletes.length})</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((a) => (
            <div key={a.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-sm font-bold text-background">
                    {a.jersey}
                  </div>
                  <div>
                    <p className="font-medium leading-none">{a.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a.position} · {a.unit}</p>
                  </div>
                </div>
                <Badge variant="outline">{a.unit}</Badge>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Presença</span>
                  <span className="font-mono">{a.presence}%</span>
                </div>
                <Progress value={a.presence} className="h-1.5" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
