import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Calendar, Heart } from "lucide-react";

export const Route = createFileRoute("/time")({
  head: () => ({
    meta: [
      { title: "O Time · Gladiators Futebol Americano" },
      { name: "description", content: "História, valores e comissão técnica do Gladiators Futebol Americano — 15 anos de paixão." },
      { property: "og:title", content: "O Time · Gladiators" },
      { property: "og:description", content: "15 anos forjando uma das maiores histórias do futebol americano." },
    ],
  }),
  component: Time,
});

const milestones = [
  { y: "2011", t: "Fundação", d: "Um grupo de apaixonados pelo esporte ergue a primeira armadura Gladiators." },
  { y: "2014", t: "Primeiro título", d: "Conquista do campeonato regional após uma temporada invicta." },
  { y: "2017", t: "Bicampeonato estadual", d: "A geração de ouro consolida o nome Gladiators no cenário nacional." },
  { y: "2021", t: "10 anos", d: "Uma década de história, com mais de 200 atletas formados." },
  { y: "2026", t: "Nova era", d: "Reformulação do elenco e nova comissão técnica para a temporada atual." },
];

function Time() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">O Time</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">15 anos de paixão pelo futebol americano.</h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Ao longo de 15 anos, construímos todos os dias uma trajetória marcada por paixão, determinação e incontáveis momentos memoráveis. Este ano promete ser repleto de conquistas e empolgantes novidades para o nosso time.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { i: Trophy, k: "5", v: "Títulos" },
              { i: Users, k: "200+", v: "Atletas formados" },
              { i: Calendar, k: "15", v: "Temporadas" },
              { i: Heart, k: "10k", v: "Torcedores" },
            ].map((s) => (
              <Card key={s.v}><CardContent className="p-5">
                <s.i className="h-5 w-5 text-accent" aria-hidden="true" />
                <p className="mt-3 font-display text-3xl font-bold">{s.k}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</p>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold tracking-tight">Linha do tempo</h2>
          <ol className="mt-12 space-y-4">
            {milestones.map((m) => (
              <li key={m.y}>
                <Card><CardContent className="flex flex-wrap gap-6 p-6">
                  <span className="font-display text-4xl font-black text-accent">{m.y}</span>
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="font-display text-xl font-bold">{m.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
                  </div>
                </CardContent></Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Lema</p>
          <p className="mt-4 font-display text-4xl font-bold italic leading-tight sm:text-5xl">"O que fazemos na vida ecoa na eternidade."</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
