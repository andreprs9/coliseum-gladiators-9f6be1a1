import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto · Patota" },
      { name: "description", content: "Projeto de extensão para desenvolver uma solução colaborativa e acessível de gestão de patotas de futebol." },
      { property: "og:title", content: "Sobre o projeto · Patota" },
      { property: "og:description", content: "Pesquisa aplicada, prescritiva, com estudo de campo na comunidade." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sobre</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Conectar, interagir e gerir a patota — de forma colaborativa e inclusiva.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Este projeto detalha o desenvolvimento de uma solução colaborativa para gestão de patotas de futebol com suporte de acessibilidade,
          visando a prática esportiva em grupo. O objetivo é permitir que integrantes se conectem, interajam e gerenciem suas atividades
          em um espaço compartilhado e inclusivo.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { t: "Natureza", d: "Pesquisa aplicada — soluções para problemas reais." },
            { t: "Objetivo", d: "Prescritiva — teoriza e projeta uma solução." },
            { t: "Método", d: "Estudo de campo aplicado na comunidade." },
          ].map((c) => (
            <Card key={c.t}><CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </CardContent></Card>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl font-semibold">Relevância social</h2>
        <p className="mt-4 text-muted-foreground">
          A solução promove acessibilidade, inclusão e diversidade — características pouco comuns em apps de gestão esportiva.
          É gratuita, fortalece laços sociais e contribui para o bem-estar de quem compartilha a paixão pelo futebol amador.
        </p>

        <h2 className="mt-12 font-display text-3xl font-semibold">Público-alvo</h2>
        <p className="mt-4 text-muted-foreground">Grupos de patotas de futebol da comunidade local.</p>
      </section>
      <SiteFooter />
    </div>
  );
}
