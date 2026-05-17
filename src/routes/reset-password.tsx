import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
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

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Senha redefinida com sucesso!");
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
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input
                id="password"
                type="password"
                required
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
        </CardContent>
      </Card>
    </main>
  );
}
