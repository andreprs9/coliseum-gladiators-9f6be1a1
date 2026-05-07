import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const Route = createFileRoute("/app/jogos")({
  component: Jogos,
});

const jogos = [
  { d: "Qua, 14 mai · 19h30", n: "Quarta no Sintético", l: "Arena Central", s: "Confirmado" },
  { d: "Sáb, 17 mai · 09h00", n: "Pelada do Sábado", l: "Campo do Bairro", s: "Pendente" },
  { d: "Dom, 18 mai · 17h00", n: "Final do Mês", l: "Society Norte", s: "Pendente" },
  { d: "Qua, 21 mai · 19h30", n: "Quarta no Sintético", l: "Arena Central", s: "Confirmado" },
];

function Jogos() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Agenda</p>
          <h1 className="font-display text-3xl font-semibold">Jogos</h1>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">+ Agendar jogo</Button>
      </header>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {jogos.map((j, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{j.d}</p>
                  <h3 className="font-display text-lg font-semibold">{j.n}</h3>
                  <p className="text-sm text-muted-foreground">{j.l}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={j.s === "Confirmado" ? "default" : "outline"}>{j.s}</Badge>
                  <Button size="sm" variant="outline">Detalhes</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
