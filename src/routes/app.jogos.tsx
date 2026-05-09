import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { upcomingEvents, type EventItem } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/app/jogos")({
  component: JogosPage,
});

function JogosPage() {
  const { role } = useRole();
  const isCoach = role === "treinador";
  const [events, setEvents] = useState<EventItem[]>(upcomingEvents);

  const setConfirm = (id: string, value: "sim" | "nao") => {
    setEvents((es) => es.map((e) => (e.id === id ? { ...e, confirmed: value } : e)));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Agenda</p>
        <h1 className="font-display text-3xl font-semibold">Treinos e jogos</h1>
        <p className="text-sm text-muted-foreground">
          {isCoach ? "Acompanhe convocações e confirmações do elenco." : "Confirme sua presença em cada compromisso."}
        </p>
      </header>

      <div className="grid gap-3">
        {events.map((e) => {
          const isGame = e.type === "jogo";
          return (
            <Card key={e.id} className={isGame ? "border-accent/40" : undefined}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge className={isGame ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}>
                      {isGame ? "Jogo" : "Treino"}
                    </Badge>
                    <p className="truncate font-display text-lg font-semibold">{e.title}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(e.date).toLocaleString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    {" · "}{e.location}
                  </p>
                </div>

                {isCoach ? (
                  <div className="flex items-center gap-3 text-xs">
                    <Badge variant="outline">12 confirmados</Badge>
                    <Badge variant="outline">3 ausentes</Badge>
                    <Badge variant="outline">{e.confirmed === "pendente" ? "Pendentes: 8" : "Pendentes: 0"}</Badge>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={e.confirmed === "sim" ? "default" : "outline"}
                      className={e.confirmed === "sim" ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
                      onClick={() => setConfirm(e.id, "sim")}
                    >
                      <Check className="mr-1 h-4 w-4" /> Confirmar
                    </Button>
                    <Button
                      size="sm"
                      variant={e.confirmed === "nao" ? "default" : "outline"}
                      onClick={() => setConfirm(e.id, "nao")}
                    >
                      <X className="mr-1 h-4 w-4" /> Não vou
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
