import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato · Patota" },
      { name: "description", content: "Fale com a equipe do projeto Patota — parcerias, comunidade e dúvidas." },
      { property: "og:title", content: "Contato · Patota" },
      { property: "og:description", content: "Vamos conversar sobre a sua patota." },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contato</p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Bora montar essa patota junto?</h1>
          <p className="mt-6 text-muted-foreground">Quer participar dos testes na comunidade, sugerir melhorias ou colaborar academicamente? Fale com a gente.</p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /><span>contato@patota.app</span></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /><span>Atividade de extensão — comunidade local</span></li>
            <li className="flex items-start gap-3"><Users className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /><span>Aberto a grupos de patotas de futebol</span></li>
          </ul>
        </div>

        <Card>
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); alert("Obrigado! Entraremos em contato."); }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" required autoComplete="name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" required autoComplete="email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="msg">Mensagem</Label>
                <Textarea id="msg" rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enviar mensagem</Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </div>
  );
}
