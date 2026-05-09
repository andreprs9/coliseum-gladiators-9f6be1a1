import { createFileRoute, Outlet, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RoleProvider, useRole, type Role } from "@/lib/role-context";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Gestão do Time — Gladiators" },
      { name: "description", content: "Painel de gestão para treinadores e atletas do Gladiators." },
      { property: "og:title", content: "Gestão do Time — Gladiators" },
      { property: "og:description", content: "Painel de gestão para treinadores e atletas." },
    ],
  }),
  component: () => (
    <AuthProvider>
      <RoleProvider>
        <AppGate />
      </RoleProvider>
    </AuthProvider>
  ),
});

function AppGate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Aguardar hidratação inicial; se ainda não houver usuário, redirecionar
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

function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <div className="inline-flex rounded-full border border-border bg-muted p-1 text-xs">
      {(["atleta", "treinador"] as Role[]).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`rounded-full px-3 py-1 font-medium uppercase tracking-wider transition-colors ${
            role === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={role === r}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

function AppLayout() {
  const { logout, user } = useAuth();
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
              <RoleSwitcher />
              <Button asChild variant="ghost" size="icon" aria-label="Notificações">
                <Link to="/app/notificacoes"><Bell className="h-4 w-4" /></Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sair"
                onClick={() => {
                  logout();
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
      </div>
    </SidebarProvider>
  );
}
