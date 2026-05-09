export const currentAthlete = {
  id: "a-12",
  name: "Lucas Andrade",
  jersey: 23,
  position: "WR",
  unit: "Ataque",
};

export const athletes = [
  { id: "a-01", name: "Rafael Souza", jersey: 7, position: "QB", unit: "Ataque", presence: 92 },
  { id: "a-02", name: "Diego Martins", jersey: 21, position: "RB", unit: "Ataque", presence: 88 },
  { id: "a-03", name: "Thiago Lima", jersey: 55, position: "OL", unit: "Ataque", presence: 75 },
  { id: "a-04", name: "Bruno Castro", jersey: 11, position: "WR", unit: "Ataque", presence: 96 },
  { id: "a-05", name: "Felipe Nogueira", jersey: 88, position: "TE", unit: "Ataque", presence: 81 },
  { id: "a-06", name: "Gustavo Reis", jersey: 52, position: "LB", unit: "Defesa", presence: 90 },
  { id: "a-07", name: "Marcos Vinícius", jersey: 33, position: "CB", unit: "Defesa", presence: 67 },
  { id: "a-08", name: "André Pereira", jersey: 99, position: "DL", unit: "Defesa", presence: 84 },
  { id: "a-09", name: "Vinícius Tavares", jersey: 27, position: "S", unit: "Defesa", presence: 79 },
  { id: "a-10", name: "Pedro Henrique", jersey: 44, position: "LB", unit: "Defesa", presence: 93 },
  { id: "a-11", name: "Carlos Eduardo", jersey: 8, position: "K", unit: "Especial", presence: 95 },
  { id: "a-12", name: "Lucas Andrade", jersey: 23, position: "WR", unit: "Ataque", presence: 86 },
];

export type EventItem = {
  id: string;
  title: string;
  type: "treino" | "jogo";
  date: string; // ISO
  location: string;
  opponent?: string;
  confirmed?: "sim" | "nao" | "pendente";
};

export const upcomingEvents: EventItem[] = [
  { id: "e-1", title: "Treino — Ofensiva", type: "treino", date: "2026-05-12T19:00:00", location: "Campo Central", confirmed: "pendente" },
  { id: "e-2", title: "Treino — Coletivo", type: "treino", date: "2026-05-14T19:00:00", location: "Campo Central", confirmed: "sim" },
  { id: "e-3", title: "Gladiators × Centurions", type: "jogo", date: "2026-05-17T15:00:00", location: "Arena Norte", opponent: "Centurions", confirmed: "pendente" },
  { id: "e-4", title: "Treino — Defesa", type: "treino", date: "2026-05-19T19:30:00", location: "Campo Central", confirmed: "pendente" },
  { id: "e-5", title: "Gladiators × Wolves", type: "jogo", date: "2026-05-24T16:00:00", location: "Arena Sul", opponent: "Wolves", confirmed: "pendente" },
];

export type TaskItem = {
  id: string;
  title: string;
  category: "treino" | "estudo" | "fisico";
  due: string;
  done: boolean;
};

export const myTasks: TaskItem[] = [
  { id: "t-1", title: "Estudar playbook — Página 14 a 22", category: "estudo", due: "2026-05-11", done: false },
  { id: "t-2", title: "30 min de cardio — Zona 2", category: "fisico", due: "2026-05-11", done: true },
  { id: "t-3", title: "Treino de rota — Slant e Out", category: "treino", due: "2026-05-12", done: false },
  { id: "t-4", title: "Sessão de mobilidade — Quadril", category: "fisico", due: "2026-05-13", done: false },
  { id: "t-5", title: "Revisar vídeo do último jogo", category: "estudo", due: "2026-05-14", done: false },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  { id: "n-1", title: "Treino confirmado", body: "Quinta, 14/05 às 19h — Campo Central.", time: "há 2h", unread: true },
  { id: "n-2", title: "Nova tarefa do treinador", body: "Estudar playbook (p. 14–22) até amanhã.", time: "há 5h", unread: true },
  { id: "n-3", title: "Convocação de jogo", body: "Gladiators × Centurions — confirme presença.", time: "há 1d", unread: false },
  { id: "n-4", title: "Avaliação física", body: "Resultados do mês disponíveis no seu perfil.", time: "há 3d", unread: false },
];

export type Improvement = {
  id: string;
  area: string;
  score: number; // 0-100
  recommendation: string;
};

export const myImprovements: Improvement[] = [
  { id: "i-1", area: "Velocidade (40 jardas)", score: 72, recommendation: "Sprints com tração 2x/semana." },
  { id: "i-2", area: "Pegada — Mãos firmes", score: 64, recommendation: "Drills de gugs com bola pesada, 15min/dia." },
  { id: "i-3", area: "Leitura de cobertura", score: 58, recommendation: "Sessão semanal de filme com coordenador ofensivo." },
  { id: "i-4", area: "Resistência aeróbica", score: 81, recommendation: "Manter zona 2; adicionar 1 HIIT por semana." },
];
