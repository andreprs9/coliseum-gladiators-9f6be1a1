import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato · Gladiators Futebol Americano" },
      { name: "description", content: "Fale com o Gladiators — atletas, torcedores e patrocinadores são bem-vindos." },
      { property: "og:title", content: "Contato · Gladiators" },
      { property: "og:description", content: "Vamos conversar." },
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
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Contato</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Entre em contato conosco.</h1>
          <p className="mt-6 text-muted-foreground">Quer jogar, torcer ou patrocinar? Mande uma mensagem para a diretoria do Gladiators.</p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /><span>contato@gladiators.com.br</span></li>
            <li className="flex items-start gap-3"><Instagram className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /><span>@gladiatorsfa</span></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /><span>Arena Municipal · sede de treinos</span></li>
          </ul>
        </div>

        <Card>
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada!"); }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" required autoComplete="name" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="celular">Celular</Label>
                  <Input id="celular" required autoComplete="tel" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" required autoComplete="email" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="msg">Mensagem</Label>
                <Textarea id="msg" rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enviar</Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </div>
  );
}
