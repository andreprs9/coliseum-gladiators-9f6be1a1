import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/mural")({
  component: Mural,
});

const posts = [
  { who: "Téo", when: "há 1 h", text: "Pessoal, lembrete: quarta às 19h30 na Arena Central. Quem leva colete?" },
  { who: "Marina", when: "há 3 h", text: "Posso ajudar com a divisão dos times no sábado. Bora montar mais equilibrado." },
  { who: "Léo", when: "ontem", text: "Sugestão: vamos rodar quem joga de goleiro a cada partida?" },
];

function Mural() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">M3C · Comunicação</p>
        <h1 className="font-display text-3xl font-semibold">Mural da patota</h1>
      </header>
      <Card>
        <CardContent className="space-y-3 p-4">
          <Textarea placeholder="Compartilhe um aviso, uma ideia, uma dúvida..." rows={3} aria-label="Nova mensagem no mural" />
          <div className="flex justify-end">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Publicar</Button>
          </div>
        </CardContent>
      </Card>
      <ul className="space-y-3">
        {posts.map((p, i) => (
          <li key={i}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background font-semibold">{p.who[0]}</div>
                  <div>
                    <p className="font-semibold">{p.who}</p>
                    <p className="text-xs text-muted-foreground">{p.when}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{p.text}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
