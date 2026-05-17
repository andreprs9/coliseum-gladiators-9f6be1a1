import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Redefinir senha — Gladiators" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase dispara onAuthStateChange com evento PASSWORD_RECOVERY
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
      }
    });

    // Também tenta pegar token do hash caso ainda esteja na URL
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken && refreshToken) {
        supabase.auth
          .setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(({ error }) => {
            if (!error) setReady(true);
            else setMessage("Link inválido ou expirado.");
          });
      } else {
        setMessage("Link inválido ou expirado.");
      }
    } else {
      setMessage("Link inválido ou expirado.");
    }

    return () => listener.subscription.unsubscribe();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Senha redefinida com sucesso!");
      await supabase.auth.signOut();
      setTimeout(() => navigate({ to: "/login" }), 2000);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-foreground px-4 py-12">
      <Card className="w-full max-w-md border-border/30 bg-card shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="font-display text-2xl">Redefinir senha</CardTitle>
          <CardDescription>Digite sua nova senha abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          {!ready && !message && (
            <p className="text-center text-sm text-muted-foreground">Verificando link…</p>
          )}
          {!ready && message && (
            <p className="text-center text-sm text-destructive">{message}</p>
          )}
          {ready && (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              {message && (
                <p className="text-center text-sm text-accent">{message}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {loading ? "Salvando…" : "Redefinir senha"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
