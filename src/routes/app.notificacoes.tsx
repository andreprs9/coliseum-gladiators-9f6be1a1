import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/app/notificacoes")({
  component: NotificacoesPage,
});

function NotificacoesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Notificações</p>
        <h1 className="font-display text-3xl font-semibold">Avisos do time</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Recentes</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 py-3">
              <span className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-accent" : "bg-border"}`} aria-hidden="true" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={n.unread ? "text-sm font-semibold" : "text-sm"}>{n.title}</p>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{n.body}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
