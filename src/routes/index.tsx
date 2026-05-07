import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Users2, CalendarRange, Accessibility, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patota — Gestão colaborativa e acessível de patotas de futebol" },
      { name: "description", content: "Solução colaborativa, gratuita e acessível para conectar e organizar patotas de futebol, baseada no Modelo 3C, Material Design, Heurísticas de Nielsen e WCAG." },
      { property: "og:title", content: "Patota — Gestão colaborativa e acessível de patotas de futebol" },
      { property: "og:description", content: "Conecte, coordene e jogue. Inclusão e acessibilidade no centro do projeto." },
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Atividade de Extensão · v1
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              A patota toda jogando <span className="text-accent">junta</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Uma solução colaborativa, gratuita e acessível para conectar membros, coordenar jogos e fortalecer a comunidade do futebol amador.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/app">Abrir protótipo <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/metodologia">Ver metodologia</Link>
              </Button>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { k: "3C", v: "Modelo de Colaboração" },
                { k: "WCAG", v: "Diretrizes de Acessibilidade" },
                { k: "M3", v: "Material Design + Nielsen" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl font-semibold">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
              <img
                src={heroImg}
                alt="Grupo de jogadores amadores se reunindo num campo de futebol urbano ao entardecer"
                width={1600}
                height={1100}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-md bg-background/95 px-3 py-2 text-xs shadow-lg ring-1 ring-border">
                <p className="font-display font-semibold">Quarta no Sintético</p>
                <p className="text-muted-foreground">9/14 confirmados · 19h30</p>
              </div>
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-lg">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Acessível por padrão
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M3C pillars */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Modelo 3C de Colaboração</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Comunicação, Cooperação e Coordenação.</h2>
            <p className="mt-4 text-muted-foreground">
              Toda funcionalidade é desenhada a partir dos três pilares do M3C, com mecanismo de percepção integrado para que ninguém fique de fora da jogada.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { i: MessageSquare, t: "Comunicação", d: "Mural, comentários e avisos para alinhar expectativas e combinar a próxima pelada." },
              { i: Users2, t: "Cooperação", d: "Divisão de times, materiais compartilhados e tarefas distribuídas pelo grupo." },
              { i: CalendarRange, t: "Coordenação", d: "Agenda, presenças, local e horário — visíveis para todos, em tempo real." },
            ].map((p) => (
              <Card key={p.t} className="border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
                    <p.i className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility band */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Inclusão como diferencial</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Acessibilidade não é um adicional — é o ponto de partida.</h2>
            <p className="mt-4 text-muted-foreground">
              Construímos cada interface seguindo as diretrizes do <strong>WCAG 2.1</strong>, padrões do <strong>Material Design</strong> e as <strong>10 Heurísticas de Nielsen</strong>, garantindo usabilidade e experiência de uso para pessoas com diferentes necessidades.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Contraste AA garantido em todos os componentes",
                "Navegação completa por teclado e leitor de tela",
                "Áreas de toque generosas e tipografia legível",
                "Mensagens claras de erro e prevenção de engano",
              ].map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/acessibilidade">Como aplicamos WCAG <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "1.4.3", v: "Contraste mínimo" },
              { k: "2.1.1", v: "Teclado" },
              { k: "2.4.7", v: "Foco visível" },
              { k: "3.3.1", v: "Identificação de erro" },
              { k: "4.1.2", v: "Nome, papel, valor" },
              { k: "1.3.1", v: "Info e relações" },
            ].map((c) => (
              <Card key={c.k}>
                <CardContent className="p-5">
                  <Accessibility className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-3 font-display text-2xl font-semibold">{c.k}</p>
                  <p className="text-xs text-muted-foreground">{c.v}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight">Pronto para reunir a sua patota?</h2>
            <p className="mt-2 text-primary-foreground/80">Explore o protótipo navegável e veja como o app organiza tudo — sem custo e sem deixar ninguém de fora.</p>
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/app">Abrir protótipo <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
