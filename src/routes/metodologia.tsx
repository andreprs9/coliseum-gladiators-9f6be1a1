import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia · Patota" },
      { name: "description", content: "Etapas de execução do projeto: contato, pesquisa, personas, prototipação, implementação, validação e relatório." },
      { property: "og:title", content: "Metodologia · Patota" },
      { property: "og:description", content: "Do contato inicial à entrega final do paper." },
    ],
  }),
  component: Metodologia,
});

const etapas = [
  { l: "a", t: "Contato inicial", d: "Reconhecer pessoas da comunidade e suas necessidades de gerir atividades em grupo." },
  { l: "b", t: "Pesquisa em referências", d: "Colaboração, M3C, personas, prototipação, Material Design, Nielsen e WCAG." },
  { l: "c", t: "Modelo 3C", d: "Comunicação, Cooperação, Coordenação e mecanismo de percepção." },
  { l: "d", t: "Personas", d: "Perfis fictícios para entender necessidades reais dos usuários." },
  { l: "e", t: "Prototipação", d: "Baixa e alta fidelidade, validações iterativas com a comunidade." },
  { l: "f", t: "Usabilidade & UX", d: "Material Design + 10 Heurísticas de Nielsen aplicadas em cada tela." },
  { l: "g", t: "WCAG", d: "Diretrizes de acessibilidade orientando todo o desenvolvimento." },
  { l: "h", t: "Levantamento", d: "Entrevistas, questionários e JAD com potenciais usuários." },
  { l: "i", t: "Personas (criação)", d: "Nome, foto, dados demográficos, objetivos, frustrações, motivações." },
  { l: "j", t: "Requisitos", d: "Funcionais e não funcionais consolidados a partir das etapas anteriores." },
  { l: "k", t: "Protótipo baixa fidelidade", d: "Wireframes para validar funcionalidades junto aos usuários." },
  { l: "l", t: "Protótipo alta fidelidade", d: "Validação a cada 20% do progresso — cinco rodadas." },
  { l: "m", t: "Especificação de requisitos", d: "Documentação detalhada para guiar a implementação." },
  { l: "n", t: "Análise (UML)", d: "Casos de uso, atividades e demais diagramas." },
  { l: "o", t: "Implementação", d: "Código orientado por M3C, Material Design, Nielsen e WCAG." },
  { l: "p", t: "Verificação & validação", d: "Testes de usabilidade, experiência e acessibilidade com a comunidade." },
  { l: "q", t: "Relatório & Paper", d: "Documentação final e síntese acadêmica do projeto." },
];

function Metodologia() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Metodologia</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Do contato inicial ao paper final.</h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">17 etapas que conectam pesquisa, prototipação e validação contínua na comunidade.</p>

        <ol className="mt-12 space-y-3">
          {etapas.map((e) => (
            <li key={e.l}>
              <Card>
                <CardContent className="flex gap-5 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground font-display text-lg font-semibold text-background">
                    {e.l}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold">{e.t}</h2>
                    <p className="text-sm text-muted-foreground">{e.d}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
      <SiteFooter />
    </div>
  );
}
