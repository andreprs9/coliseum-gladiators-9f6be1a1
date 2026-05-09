export type PlayPosition = {
  id: string;
  label: string; // ex: "QB", "WR1", "RB"
  // Coordenadas em % do campo (0–100)
  x: number;
  y: number;
  role: string; // descrição do papel do atleta nesta jogada
};

export type Play = {
  id: string;
  name: string;
  formation: string;
  category: "Ataque" | "Defesa" | "Especial";
  description: string;
  positions: PlayPosition[];
};

export const initialPlays: Play[] = [
  {
    id: "p-1",
    name: "Slant Right 22",
    formation: "Shotgun Trips Right",
    category: "Ataque",
    description: "Passe curto explorando o slant do WR1; RB faz proteção e check-down.",
    positions: [
      { id: "qb", label: "QB", x: 50, y: 70, role: "Snap em shotgun, leitura rápida do slant." },
      { id: "rb", label: "RB", x: 42, y: 75, role: "Proteção pelo lado fraco; rota check-down." },
      { id: "wr1", label: "WR1", x: 78, y: 55, role: "Slant a 5 jardas, atacar miolo." },
      { id: "wr2", label: "WR2", x: 70, y: 55, role: "Hitch a 4 jardas, congelar a CB." },
      { id: "wr3", label: "WR3", x: 62, y: 55, role: "Go route, esticar a defesa." },
      { id: "te", label: "TE", x: 38, y: 60, role: "Bloqueio de borda no lado fraco." },
      { id: "ol1", label: "OL", x: 56, y: 62, role: "Pass pro — gap A direito." },
      { id: "ol2", label: "OL", x: 52, y: 62, role: "Pass pro — gap A esquerdo." },
      { id: "ol3", label: "OL", x: 48, y: 62, role: "Pass pro — gap B esquerdo." },
      { id: "ol4", label: "OL", x: 44, y: 62, role: "Pass pro — tackle esquerdo." },
      { id: "ol5", label: "OL", x: 60, y: 62, role: "Pass pro — tackle direito." },
    ],
  },
  {
    id: "p-2",
    name: "Power 34 Lead",
    formation: "I-Formation",
    category: "Ataque",
    description: "Corrida pelo gap B com FB liderando o bloqueio.",
    positions: [
      { id: "qb", label: "QB", x: 50, y: 70, role: "Handoff para o RB, fake bootleg." },
      { id: "fb", label: "FB", x: 50, y: 78, role: "Lead block no LB do lado forte." },
      { id: "rb", label: "RB", x: 50, y: 86, role: "Receber handoff, atacar gap B." },
      { id: "te", label: "TE", x: 36, y: 60, role: "Bloqueio na linha de scrimmage." },
      { id: "wr1", label: "WR1", x: 80, y: 55, role: "Bloqueio na CB para fora." },
      { id: "wr2", label: "WR2", x: 20, y: 55, role: "Bloqueio na safety." },
      { id: "ol1", label: "OL", x: 44, y: 62, role: "Down block." },
      { id: "ol2", label: "OL", x: 48, y: 62, role: "Combo block." },
      { id: "ol3", label: "OL", x: 52, y: 62, role: "Pull para o gap." },
      { id: "ol4", label: "OL", x: 56, y: 62, role: "Reach block." },
      { id: "ol5", label: "OL", x: 60, y: 62, role: "Down block lado forte." },
    ],
  },
  {
    id: "p-3",
    name: "Cover 3 Sky",
    formation: "Defesa 4-3",
    category: "Defesa",
    description: "Cobertura zone com 3 deeps e 4 underneath; SS desce para apoio.",
    positions: [
      { id: "ss", label: "S", x: 50, y: 25, role: "Sky support, gatilho no run." },
      { id: "fs", label: "S", x: 30, y: 18, role: "Deep middle 1/3." },
      { id: "cb1", label: "CB", x: 80, y: 30, role: "Deep 1/3 lado forte." },
      { id: "cb2", label: "CB", x: 20, y: 30, role: "Deep 1/3 lado fraco." },
      { id: "lb1", label: "LB", x: 60, y: 50, role: "Hook to curl direita." },
      { id: "lb2", label: "LB", x: 50, y: 48, role: "Mike — hook 10 jardas." },
      { id: "lb3", label: "LB", x: 40, y: 50, role: "Hook to curl esquerda." },
      { id: "dl1", label: "DL", x: 44, y: 60, role: "Pass rush gap B." },
      { id: "dl2", label: "DL", x: 48, y: 60, role: "Two-gap nose." },
      { id: "dl3", label: "DL", x: 52, y: 60, role: "Pass rush gap A." },
      { id: "dl4", label: "DL", x: 56, y: 60, role: "Contain edge." },
    ],
  },
];

// Monitoramento por atleta (criado pelo treinador)
export type MonitoringEntry = {
  id: string;
  athleteId: string;
  date: string; // ISO date
  metric: "Velocidade" | "Força" | "Resistência" | "Técnica" | "Mental" | "Avaliação geral";
  score: number; // 0–100
  notes: string;
};

export const initialMonitoring: MonitoringEntry[] = [
  { id: "m-1", athleteId: "a-12", date: "2026-05-02", metric: "Velocidade", score: 78, notes: "Boa explosão nas 10 primeiras jardas, perde ritmo após 30." },
  { id: "m-2", athleteId: "a-12", date: "2026-05-05", metric: "Técnica", score: 70, notes: "Refinar pegada em situação de pressão." },
  { id: "m-3", athleteId: "a-12", date: "2026-05-08", metric: "Mental", score: 82, notes: "Excelente leitura pré-snap." },
  { id: "m-4", athleteId: "a-01", date: "2026-05-06", metric: "Avaliação geral", score: 88, notes: "Liderança ofensiva consistente." },
];
