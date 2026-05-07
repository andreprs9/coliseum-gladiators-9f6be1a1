import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/elenco")({
  head: () => ({
    meta: [
      { title: "Elenco · Gladiators Futebol Americano" },
      { name: "description", content: "Conheça os atletas do Gladiators Futebol Americano — temporada 2026." },
      { property: "og:title", content: "Elenco · Gladiators" },
      { property: "og:description", content: "Os guerreiros que vestem a armadura preta e vermelha." },
    ],
  }),
  component: Elenco,
});

const players = [
  { n: "Marcus Vega", p: "QB", num: 7, u: "Ataque" },
  { n: "Diego Ribeiro", p: "RB", num: 23, u: "Ataque" },
  { n: "Caio Mendonça", p: "WR", num: 88, u: "Ataque" },
  { n: "Henrique Costa", p: "WR", num: 11, u: "Ataque" },
  { n: "Tobias Lemos", p: "TE", num: 84, u: "Ataque" },
  { n: "André Salgado", p: "OL", num: 72, u: "Ataque" },
  { n: "Rafael Drummond", p: "DE", num: 55, u: "Defesa" },
  { n: "Iago Bittencourt", p: "DT", num: 99, u: "Defesa" },
  { n: "Vinícius Paz", p: "LB", num: 44, u: "Defesa" },
  { n: "Lucas Moretti", p: "CB", num: 21, u: "Defesa" },
  { n: "Bruno Tavares", p: "S", num: 32, u: "Defesa" },
  { n: "Pedro Kahn", p: "K", num: 3, u: "Special" },
];

function Elenco() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Temporada 2026</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Elenco</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">12 dos atletas que defendem as cores do Gladiators nesta temporada.</p>
        </div>
      </section>
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {players.map((pl) => (
              <Card key={pl.num} className="overflow-hidden bg-foreground text-background transition-transform hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-accent/40 via-foreground to-foreground p-5 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <Badge className="bg-accent text-accent-foreground hover:bg-accent">{pl.p}</Badge>
                      <span className="text-[10px] uppercase tracking-wider text-background/60">{pl.u}</span>
                    </div>
                    <p className="font-display text-[6rem] font-black leading-none text-background/95">#{pl.num}</p>
                    <div>
                      <p className="font-display text-xl font-bold leading-tight">{pl.n}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
