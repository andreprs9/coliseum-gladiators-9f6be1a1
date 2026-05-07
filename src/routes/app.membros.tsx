import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/app/membros")({
  component: Membros,
});

const membros = [
  { n: "Marina Souza", p: "Goleira", t: "Mensalista", c: 92 },
  { n: "Téo Almeida", p: "Zagueiro", t: "Organizador", c: 100 },
  { n: "Léo Cardoso", p: "Meia", t: "Mensalista", c: 78 },
  { n: "Rafa Lima", p: "Atacante", t: "Convidado", c: 45 },
  { n: "Bruno Reis", p: "Lateral", t: "Mensalista", c: 88 },
  { n: "Ana Pires", p: "Volante", t: "Mensalista", c: 80 },
];

function Membros() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Comunidade</p>
          <h1 className="font-display text-3xl font-semibold">Membros</h1>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Buscar membro..." className="w-64" />
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Convidar</Button>
        </div>
      </header>
      <Card>
        <CardContent className="divide-y divide-border p-0">
          {membros.map((m) => (
            <div key={m.n} className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background font-semibold">
                {m.n[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{m.n}</p>
                <p className="text-xs text-muted-foreground">{m.p}</p>
              </div>
              <Badge variant={m.t === "Organizador" ? "default" : "outline"}>{m.t}</Badge>
              <p className="hidden w-24 text-right text-sm text-muted-foreground sm:block">{m.c}% presença</p>
              <Button variant="ghost" size="sm">Ver</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
