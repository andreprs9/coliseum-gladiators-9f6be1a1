import { createFileRoute, Outlet, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AthletesProvider } from "@/lib/athletes-store";
import { useAuth } from "@/lib/auth-context";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Gestão do Time — Gladiators" },
      { name: "description", content: "Painel de gestão para treinadores e atletas do Gladiators." },
    ],
  }),
  component: () => (
    <AthletesProvider>
      <AppGate />
    </AthletesProvider>
  ),
});

function AppGate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      if (!user) navigate({ to: "/login" });
    }, 50);
    return () => clearTimeout(t);
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <p className="text-sm text-muted-foreground">Verificando sessão…</p>
      </div>
    );
  }

  return <AppLayout />;
}

function AppLayout() {
  const { logout, user, role } = useAuth();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Gladiators · Gestão
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted-foreground sm:block">{user?.email}</span>
              {role && (
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {role}
                </span>
              )}
              <Button asChild variant="ghost" size="icon" aria-label="Notificações">
                <Link to="/app/notificacoes"><Bell className="h-4 w-4" /></Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sair"
                onClick={async () => {
                  await logout();
                  navigate({ to: "/login" });
                }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
