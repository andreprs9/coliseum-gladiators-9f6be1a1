import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/treinos")({
  component: TreinosPage,
});

const checklist = [
  "Aquecimento dinâmico (15 min)",
  "Drills de fundamentos por posição (25 min)",
  "Sessão tática — Ofensiva (30 min)",
  "Coletivo controlado (20 min)",
  "Volta à calma e mobilidade (10 min)",
];

function TreinosPage() {
  const { role } = useRole();
  const isCoach = role === "treinador";
  const [done, setDone] = useState<Record<string, boolean>>({});
  const treinos = upcomingEvents.filter((e) => e.type === "treino");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Treinos</p>
          <h1 className="font-display text-3xl font-semibold">Sessões e checklist</h1>
          <p className="text-sm text-muted-foreground">
            {isCoach ? "Planeje e acompanhe a execução das sessões." : "Acompanhe os blocos da sessão e marque o que concluiu."}
          </p>
        </div>
        {isCoach && (
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-1 h-4 w-4" /> Novo treino
          </Button>
        )}
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Próximas sessões</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {treinos.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(t.date).toLocaleString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })} · {t.location}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">{t.confirmed}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Checklist da sessão de hoje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.map((item, i) => {
            const id = `c-${i}`;
            return (
              <label key={id} className="flex items-start gap-3 rounded-md border border-border bg-card p-3 hover:bg-muted/40">
                <Checkbox
                  checked={!!done[id]}
                  onCheckedChange={(v) => setDone((d) => ({ ...d, [id]: !!v }))}
                  aria-label={item}
                />
                <span className={done[id] ? "text-sm text-muted-foreground line-through" : "text-sm"}>{item}</span>
              </label>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
