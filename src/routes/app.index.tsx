import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRole } from "@/lib/role-context";
import { athletes, currentAthlete, myImprovements, myTasks, upcomingEvents } from "@/lib/mock-data";
import { CalendarDays, CheckCircle2, Dumbbell, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function Dashboard() {
  const { role } = useRole();
  const isCoach = role === "treinador";
  const pendingConfirm = upcomingEvents.filter((e) => e.confirmed === "pendente").length;
  const tasksDone = myTasks.filter((t) => t.done).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            {isCoach ? "Visão do treinador" : "Visão do atleta"}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {isCoach ? "Bem-vindo, Coach" : `Olá, ${currentAthlete.name.split(" ")[0]}`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isCoach ? "Acompanhe o time e gerencie treinos, tarefas e convocações." : "Confira seus treinos, tarefas e oportunidades de melhoria."}
          </p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to={isCoach ? "/app/atletas" : "/app/desempenho"}>
            {isCoach ? "Ver elenco" : "Meu desempenho"}
          </Link>
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Confirmações pendentes"
          value={pendingConfirm}
          to="/app/jogos"
        />
        <StatCard
          icon={<Dumbbell className="h-4 w-4" />}
          label="Próximos treinos"
          value={upcomingEvents.filter((e) => e.type === "treino").length}
          to="/app/treinos"
        />
        <StatCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label={isCoach ? "Tarefas atribuídas" : "Tarefas concluídas"}
          value={isCoach ? myTasks.length : `${tasksDone}/${myTasks.length}`}
          to="/app/tarefas"
        />
        <StatCard
          icon={isCoach ? <Users className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
          label={isCoach ? "Atletas no elenco" : "Áreas em foco"}
          value={isCoach ? athletes.length : myImprovements.length}
          to={isCoach ? "/app/atletas" : "/app/desempenho"}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">Próxima agenda</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/jogos">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {upcomingEvents.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={e.type === "jogo" ? "default" : "secondary"} className={e.type === "jogo" ? "bg-accent text-accent-foreground" : ""}>
                      {e.type === "jogo" ? "Jogo" : "Treino"}
                    </Badge>
                    <p className="truncate font-medium">{e.title}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{fmtDate(e.date)} · {e.location}</p>
                </div>
                <Badge variant="outline" className="capitalize">{e.confirmed}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              {isCoach ? "Presença média" : "Oportunidades de melhoria"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isCoach
              ? athletes.slice(0, 5).map((a) => (
                  <div key={a.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate">#{a.jersey} {a.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{a.presence}%</span>
                    </div>
                    <Progress value={a.presence} className="h-1.5" />
                  </div>
                ))
              : myImprovements.slice(0, 4).map((i) => (
                  <div key={i.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate">{i.area}</span>
                      <span className="font-mono text-xs text-muted-foreground">{i.score}</span>
                    </div>
                    <Progress value={i.score} className="h-1.5" />
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, to }: { icon: React.ReactNode; label: string; value: React.ReactNode; to: string }) {
  return (
    <Link to={to} className="group">
      <Card className="transition-colors group-hover:border-accent/60">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{label}</span>
          </div>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{value}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
