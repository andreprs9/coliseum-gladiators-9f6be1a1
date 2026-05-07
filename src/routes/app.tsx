import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search } from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Protótipo · Patota" },
      { name: "description", content: "Protótipo navegável do app colaborativo da Patota." },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="hidden flex-1 items-center gap-2 rounded-md border border-input bg-secondary/60 px-3 py-1.5 text-sm text-muted-foreground sm:flex max-w-md">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Buscar patotas, jogos, membros…</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button aria-label="Notificações" className="relative rounded-md p-2 hover:bg-secondary">
                <Bell className="h-4 w-4" aria-hidden="true" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
              </button>
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Sair do protótipo</Link>
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
