export const currentAthlete = {
  id: "",
  name: "Atleta",
  jersey: 0,
  position: "—",
  unit: "—",
};

export const athletes: Array<{
  id: string;
  name: string;
  jersey: number;
  position: string;
  unit: string;
  presence: number;
}> = [];

export type EventItem = {
  id: string;
  title: string;
  type: "treino" | "jogo";
  date: string;
  location: string;
  opponent?: string;
  confirmed?: "sim" | "nao" | "pendente";
};

export const upcomingEvents: EventItem[] = [];

export type TaskItem = {
  id: string;
  title: string;
  category: "treino" | "estudo" | "fisico";
  due: string;
  done: boolean;
};

export const myTasks: TaskItem[] = [];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [];

export type Improvement = {
  id: string;
  area: string;
  score: number;
  recommendation: string;
};

export const myImprovements: Improvement[] = [];
