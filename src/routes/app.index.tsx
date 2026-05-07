import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Users, Trophy, MessageSquare, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const upcoming = [
  { name: "Quarta no Sintético", date: "Qua · 19h30", place: "Arena Central", confirmed: 9, total: 14, color: "bg-accent" },
  { name: "Pelada do Sábado", date: "Sáb · 09h00", place: "Campo do Bairro", confirmed: 12, total: 16, color: "bg-foreground" },
  { name: "Final do Mês", date: "Dom · 17h00", place: "Society Norte", confirmed: 6, total: 14, color: "bg-muted-foreground" },
];

const activity = [
  { who: "Marina", what: "confirmou presença em Quarta no Sintético", when: "há 2 min" },
  { who: "Téo", what: "criou o jogo Final do Mês", when: "há 1 h" },
  { who: "Comissão", what: "atualizou a divisão dos times", when: "ontem" },
  { who: "Léo", what: "comentou no mural: bora levar bolas novas", when: "ontem" },
];

function Stat({ icon: Icon, label, value, delta }: { icon: React.ElementType; label: string; value: string; delta: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Visão geral</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Olá, Patoteiro 👋</h1>
          <p className="text-sm text-muted-foreground">Resumo da sua patota nesta semana.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Convidar amigos</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">+ Novo jogo</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Trophy} label="Patotas" value="3" delta="+1 este mês" />
        <Stat icon={CalendarDays} label="Próximos jogos" value="5" delta="Esta semana" />
        <Stat icon={Users} label="Membros ativos" value="42" delta="+4 novos" />
        <Stat icon={MessageSquare} label="Mensagens" value="128" delta="Últimos 7 dias" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display">Próximos jogos</CardTitle>
              <CardDescription>Confirme presença para ajudar na coordenação.</CardDescription>
            </div>
            <Badge variant="outline">M3C · Coordenação</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcoming.map((g) => {
              const pct = Math.round((g.confirmed / g.total) * 100);
              return (
                <div key={g.name} className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-semibold">{g.name}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{g.date}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{g.place}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Não vou</Button>
                      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Confirmar</Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{g.confirmed} de {g.total} confirmados</span>
                      <span>{pct}%</span>
                    </div>
                    <Progress value={pct} className="mt-1.5 h-2" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Atividade recente</CardTitle>
            <CardDescription>Mecanismo de percepção do M3C.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
                    {a.who[0]}
                  </div>
                  <div className="text-sm">
                    <p><span className="font-semibold">{a.who}</span> {a.what}</p>
                    <p className="text-xs text-muted-foreground">{a.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { c: "Comunicação", desc: "Mural, comentários e avisos para alinhar a galera.", k: "128 msgs / semana" },
          { c: "Cooperação", desc: "Divisão de times, levar materiais e tarefas compartilhadas.", k: "92% participação" },
          { c: "Coordenação", desc: "Agenda, presenças e local — tudo em um só lugar.", k: "5 jogos agendados" },
        ].map((p) => (
          <Card key={p.c} className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="font-display">{p.c}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.k}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
