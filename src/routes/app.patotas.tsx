import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/patotas")({
  component: Patotas,
});

const patotas = [
  { name: "Quarta no Sintético", members: 14, role: "Organizador", rule: "Mensalistas + 2 convidados" },
  { name: "Pelada do Sábado", members: 16, role: "Membro", rule: "Lista aberta às 6ª" },
  { name: "Patota Inclusiva", members: 12, role: "Membro", rule: "Times mistos · acessível" },
];

function Patotas() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Patotas</p>
          <h1 className="font-display text-3xl font-semibold">Suas patotas</h1>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">+ Criar patota</Button>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {patotas.map((p) => (
          <Card key={p.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">{p.name}</CardTitle>
                <Badge variant={p.role === "Organizador" ? "default" : "outline"}>{p.role}</Badge>
              </div>
              <CardDescription>{p.rule}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{p.members} membros</p>
              <Button size="sm" variant="outline">Abrir</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
