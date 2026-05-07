import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trophy, Users, Calendar, Flame, Shield, Swords } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gladiators Futebol Americano — 15 anos de história" },
      { name: "description", content: "Site oficial do Gladiators Futebol Americano. Conheça o time, o elenco, o calendário de jogos e faça parte dessa trajetória." },
      { property: "og:title", content: "Gladiators Futebol Americano" },
      { property: "og:description", content: "Paixão, determinação e momentos memoráveis. Bem-vindo ao Gladiators." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" aria-hidden="true" width={1600} height={1100} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Temporada 2026
            </span>
            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
              Honra. <span className="text-accent">Garra.</span><br />Gladiators.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              15 anos construindo uma das histórias mais marcantes do futebol americano. Bem-vindo à arena.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/calendario">Ver próximo jogo <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/time">Conheça o time</Link>
              </Button>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { k: "15", v: "Anos de história" },
                { k: "60+", v: "Atletas no elenco" },
                { k: "2x", v: "Campeão estadual" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl font-bold text-accent">{s.k}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-12 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
            <img
              src={logo}
              alt="Escudo do Gladiators Futebol Americano"
              width={400}
              height={200}
              className="relative mx-auto w-full max-w-md drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </section>

      {/* Next game banner */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="flex items-center gap-5">
            <Flame className="h-10 w-10 text-accent" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-background/60">Próximo jogo</p>
              <p className="font-display text-2xl font-bold sm:text-3xl">Gladiators × Centurions</p>
              <p className="text-sm text-background/70">Sáb, 23 mai · 16h00 · Arena Municipal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground">
              <Link to="/calendario">Calendário completo</Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#ingressos">Comprar ingresso</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">O que nos move</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Mais que um time. Uma irmandade.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { i: Shield, t: "Tradição", d: "Uma trajetória de 15 anos forjada em treinos duros, jogos memoráveis e atletas que viraram lenda." },
              { i: Swords, t: "Disciplina", d: "Treinamento de alto rendimento, comissão técnica completa e mentalidade de competição." },
              { i: Trophy, t: "Conquistas", d: "Títulos, classificações nacionais e atletas convocados para a seleção brasileira." },
            ].map((p) => (
              <Card key={p.t} className="group overflow-hidden border-l-4 border-l-accent transition-colors hover:bg-secondary/40">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-foreground text-background">
                    <p.i className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Squad teaser */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Elenco 2026</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Os guerreiros em campo.</h2>
              <p className="mt-4 text-muted-foreground">Conheça alguns dos atletas que vestem a armadura preta e vermelha nesta temporada.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/elenco">Ver elenco completo <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "Marcus Vega", p: "QB", num: 7 },
              { n: "Diego Ribeiro", p: "RB", num: 23 },
              { n: "Caio Mendonça", p: "WR", num: 88 },
              { n: "Rafael Drummond", p: "DE", num: 55 },
            ].map((pl) => (
              <Card key={pl.n} className="overflow-hidden bg-foreground text-background">
                <CardContent className="relative p-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-accent/30 via-foreground to-foreground p-6 flex flex-col justify-between">
                    <div>
                      <p className="font-display text-7xl font-black leading-none text-background/90">#{pl.num}</p>
                      <p className="mt-2 inline-block rounded bg-accent px-2 py-0.5 text-xs font-bold tracking-wider text-accent-foreground">{pl.p}</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold leading-tight">{pl.n}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="ingressos" className="gradient-hero text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Junte-se à torcida</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Vista a armadura. Faça parte da história.</h2>
            <p className="mt-4 text-primary-foreground/80">Atleta, torcedor ou patrocinador — há sempre um lugar na arena para quem vibra com o Gladiators.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contato">Quero jogar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-background/30 bg-transparent text-primary-foreground hover:bg-background hover:text-foreground">
              <Link to="/contato">Patrocinar</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
