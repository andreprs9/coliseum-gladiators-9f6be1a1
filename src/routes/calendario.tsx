import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/calendario")({
  head: () => ({
    meta: [
      { title: "Calendário · Gladiators Futebol Americano" },
      { name: "description", content: "Calendário oficial de jogos do Gladiators Futebol Americano — temporada 2026." },
      { property: "og:title", content: "Calendário · Gladiators" },
      { property: "og:description", content: "Próximos jogos, mando de campo e resultados." },
    ],
  }),
  component: Calendario,
});

const games = [
  { d: "Sáb, 23 mai · 16h00", h: "Gladiators", a: "Centurions", l: "Arena Municipal", m: "Casa", s: "Próximo" },
  { d: "Sáb, 06 jun · 15h00", h: "Spartans", a: "Gladiators", l: "Estádio do Norte", m: "Fora", s: "Agendado" },
  { d: "Dom, 21 jun · 17h00", h: "Gladiators", a: "Wolves", l: "Arena Municipal", m: "Casa", s: "Agendado" },
  { d: "Sáb, 04 jul · 16h00", h: "Falcons", a: "Gladiators", l: "Campo Sul", m: "Fora", s: "Agendado" },
  { d: "Sáb, 18 jul · 18h00", h: "Gladiators", a: "Titans", l: "Arena Municipal", m: "Casa", s: "Agendado" },
];

const past = [
  { d: "Sáb, 09 mai", h: "Gladiators", a: "Vikings", r: "28 × 14", w: true },
  { d: "Sáb, 25 abr", h: "Raptors", a: "Gladiators", r: "10 × 31", w: true },
  { d: "Sáb, 11 abr", h: "Gladiators", a: "Bulldogs", r: "21 × 24", w: false },
];

function Calendario() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Temporada 2026</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Calendário</h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider">Próximos jogos</h2>
          <div className="mt-6 space-y-3">
            {games.map((g, i) => (
              <Card key={i} className={i === 0 ? "border-l-4 border-l-accent" : ""}>
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="min-w-[160px]">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{g.d}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{g.l}</p>
                  </div>
                  <div className="flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
                    <span className={g.h === "Gladiators" ? "text-foreground" : "text-muted-foreground"}>{g.h}</span>
                    <span className="text-accent">×</span>
                    <span className={g.a === "Gladiators" ? "text-foreground" : "text-muted-foreground"}>{g.a}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={g.m === "Casa" ? "default" : "outline"}>{g.m}</Badge>
                    {i === 0 && <Badge className="bg-accent text-accent-foreground hover:bg-accent">{g.s}</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider">Resultados recentes</h2>
          <div className="mt-6 space-y-3">
            {past.map((g, i) => (
              <Card key={i}>
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{g.d}</p>
                  <div className="font-display text-xl font-bold sm:text-2xl">
                    <span className={g.h === "Gladiators" ? "text-foreground" : "text-muted-foreground"}>{g.h}</span>
                    <span className="mx-3 text-accent">{g.r}</span>
                    <span className={g.a === "Gladiators" ? "text-foreground" : "text-muted-foreground"}>{g.a}</span>
                  </div>
                  <Badge className={g.w ? "bg-accent text-accent-foreground hover:bg-accent" : ""} variant={g.w ? "default" : "outline"}>
                    {g.w ? "Vitória" : "Derrota"}
                  </Badge>
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
