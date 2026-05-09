import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { currentAthlete, myImprovements } from "@/lib/mock-data";

export const Route = createFileRoute("/app/desempenho")({
  component: DesempenhoPage,
});

function DesempenhoPage() {
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
        <CardHeader>
          <CardTitle className="font-display text-lg">Oportunidades de melhoria</CardTitle>
        </CardHeader>
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
