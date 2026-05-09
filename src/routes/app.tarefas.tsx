import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { myTasks, type TaskItem } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";

export const Route = createFileRoute("/app/tarefas")({
  component: TarefasPage,
});

const catColor: Record<TaskItem["category"], string> = {
  treino: "bg-accent/15 text-accent border-accent/30",
  estudo: "bg-foreground/10 text-foreground border-foreground/20",
  fisico: "bg-muted text-muted-foreground border-border",
};

function TarefasPage() {
  const { role } = useRole();
  const isCoach = role === "treinador";
  const [tasks, setTasks] = useState<TaskItem[]>(myTasks);
  const [newTitle, setNewTitle] = useState("");

  const toggle = (id: string) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks((ts) => [
      ...ts,
      { id: `t-${Date.now()}`, title: newTitle.trim(), category: "treino", due: new Date().toISOString().slice(0, 10), done: false },
    ]);
    setNewTitle("");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Tarefas</p>
        <h1 className="font-display text-3xl font-semibold">{isCoach ? "Atribuições do time" : "Minhas tarefas"}</h1>
        <p className="text-sm text-muted-foreground">
          {isCoach ? "Crie e acompanhe tarefas para os atletas." : "Marque conforme concluir cada item."}
        </p>
      </header>

      {isCoach && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Nova tarefa</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="Ex: Estudar capítulo de cobertura zone 3"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Lista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.map((t) => (
            <label key={t.id} className="flex items-start gap-3 rounded-md border border-border bg-card p-3 hover:bg-muted/40">
              <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} aria-label={t.title} />
              <div className="flex-1">
                <p className={t.done ? "text-sm text-muted-foreground line-through" : "text-sm font-medium"}>{t.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Entrega: {new Date(t.due).toLocaleDateString("pt-BR")}</p>
              </div>
              <Badge variant="outline" className={`capitalize ${catColor[t.category]}`}>{t.category}</Badge>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
