import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Eye, Keyboard, MessageCircle, MousePointer2 } from "lucide-react";

export const Route = createFileRoute("/acessibilidade")({
  head: () => ({
    meta: [
      { title: "Acessibilidade · Patota" },
      { name: "description", content: "Como o projeto aplica WCAG 2.1, Material Design e Heurísticas de Nielsen para garantir inclusão." },
      { property: "og:title", content: "Acessibilidade · Patota" },
      { property: "og:description", content: "Inclusão como ponto de partida do design." },
    ],
  }),
  component: Acessibilidade,
});

const principios = [
  { i: Eye, t: "Perceptível", d: "Contraste AA, alternativas textuais, conteúdo adaptável." },
  { i: MousePointer2, t: "Operável", d: "Navegação por teclado, alvos de toque adequados, controle do tempo." },
  { i: MessageCircle, t: "Compreensível", d: "Linguagem clara, prevenção e identificação de erros." },
  { i: Keyboard, t: "Robusto", d: "Compatibilidade com leitores de tela e tecnologias assistivas." },
];

function Acessibilidade() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
          <Accessibility className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> WCAG 2.1
        </div>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Inclusão é a primeira jogada.</h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Toda interface segue os princípios POUR do WCAG, padrões do Material Design e as 10 Heurísticas de Nielsen — garantindo que pessoas com diferentes necessidades possam participar.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {principios.map((p) => (
            <Card key={p.t}>
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <p.i className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold">{p.t}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl font-semibold">Heurísticas de Nielsen aplicadas</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Visibilidade do estado do sistema",
            "Correspondência com o mundo real",
            "Controle e liberdade do usuário",
            "Consistência e padrões",
            "Prevenção de erros",
            "Reconhecimento ao invés de memorização",
            "Flexibilidade e eficiência de uso",
            "Estética e design minimalista",
            "Ajuda na recuperação de erros",
            "Ajuda e documentação",
          ].map((h, i) => (
            <li key={h} className="flex items-start gap-3 rounded-md border border-border bg-card p-4 text-sm">
              <span className="font-display text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </div>
  );
}
