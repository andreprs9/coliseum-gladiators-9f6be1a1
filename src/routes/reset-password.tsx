import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Redefinir senha — Gladiators" }] }),
  component: () => (
    <AuthProvider>
      <ResetPage />
    </AuthProvider>
  ),
});

function ResetPage() {
  const { requestReset, resetPassword } = useAuth();
  const [step, setStep] = useState<"request" | "sent" | "new" | "done">("request");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const send = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await requestReset(email);
    setLoading(false);
    setStep("sent");
  };

  const setNew = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    if (pwd.length < 8) return setErr("A senha deve ter ao menos 8 caracteres.");
    if (pwd !== pwd2) return setErr("As senhas não coincidem.");
    setLoading(true);
    await resetPassword(pwd);
    setLoading(false);
    setStep("done");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-foreground px-4 py-12">
      <Card className="w-full max-w-md border-border/30 bg-card shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <Link to="/" className="mx-auto"><img src={logo} alt="" aria-hidden="true" className="h-12 w-auto" /></Link>
          <CardTitle className="font-display text-2xl">Redefinir senha</CardTitle>
          <CardDescription>
            {step === "request" && "Informe seu email para receber o link de redefinição."}
            {step === "sent" && "Enviamos um link para seu email. Para fins de protótipo, você pode definir uma nova senha agora."}
            {step === "new" && "Defina uma nova senha."}
            {step === "done" && "Senha atualizada com sucesso."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "request" && (
            <form onSubmit={send} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {loading ? "Enviando…" : "Enviar link"}
              </Button>
              <Button asChild variant="ghost" className="w-full"><Link to="/login">Voltar ao login</Link></Button>
            </form>
          )}
          {step === "sent" && (
            <div className="space-y-3">
              <Button onClick={() => setStep("new")} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Definir nova senha</Button>
              <Button asChild variant="ghost" className="w-full"><Link to="/login">Voltar ao login</Link></Button>
            </div>
          )}
          {step === "new" && (
            <form onSubmit={setNew} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pwd">Nova senha</Label>
                <Input id="pwd" type="password" required value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pwd2">Confirmar senha</Label>
                <Input id="pwd2" type="password" required value={pwd2} onChange={(e) => setPwd2(e.target.value)} />
              </div>
              {err && <p className="text-sm text-destructive">{err}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {loading ? "Salvando…" : "Salvar nova senha"}
              </Button>
            </form>
          )}
          {step === "done" && (
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/login">Ir para o login</Link></Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
