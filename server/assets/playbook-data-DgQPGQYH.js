const initialPlays = [
  {
    id: "p-1",
    name: "Slant Right 22",
    formation: "Shotgun Trips Right",
    category: "Ataque",
    description: "Passe curto explorando o slant do WR1; RB faz proteção e check-down.",
    bullets: [
      "QB faz leitura rápida do MIKE pré-snap.",
      "WR1 corta em slant aos 5 jardas atacando o miolo.",
      "WR2 segura a CB com hitch curto.",
      "RB faz chip no DE e libera para check-down.",
      "Linha ofensiva mantém pocket por 2.5 segundos."
    ],
    positions: [
      { id: "qb", label: "QB", x: 50, y: 70, endX: 50, endY: 75, role: "Snap em shotgun, leitura rápida do slant." },
      { id: "rb", label: "RB", x: 42, y: 75, endX: 38, endY: 78, role: "Proteção pelo lado fraco; rota check-down." },
      { id: "wr1", label: "WR1", x: 78, y: 55, endX: 60, endY: 40, role: "Slant a 5 jardas, atacar miolo." },
      { id: "wr2", label: "WR2", x: 70, y: 55, endX: 70, endY: 48, role: "Hitch a 4 jardas, congelar a CB." },
      { id: "wr3", label: "WR3", x: 62, y: 55, endX: 62, endY: 25, role: "Go route, esticar a defesa." },
      { id: "te", label: "TE", x: 38, y: 60, endX: 32, endY: 60, role: "Bloqueio de borda no lado fraco." },
      { id: "ol1", label: "OL", x: 56, y: 62, role: "Pass pro — gap A direito." },
      { id: "ol2", label: "OL", x: 52, y: 62, role: "Pass pro — gap A esquerdo." },
      { id: "ol3", label: "OL", x: 48, y: 62, role: "Pass pro — gap B esquerdo." },
      { id: "ol4", label: "OL", x: 44, y: 62, role: "Pass pro — tackle esquerdo." },
      { id: "ol5", label: "OL", x: 60, y: 62, role: "Pass pro — tackle direito." }
    ]
  },
  {
    id: "p-2",
    name: "Power 34 Lead",
    formation: "I-Formation",
    category: "Ataque",
    description: "Corrida pelo gap B com FB liderando o bloqueio.",
    bullets: [
      "QB faz fake bootleg após handoff.",
      "FB ataca o LB do lado forte como lead block.",
      "RB recebe handoff e ataca o gap B.",
      "OL puxa para abrir corredor pelo lado forte.",
      "WRs bloqueiam DBs no perímetro."
    ],
    positions: [
      { id: "qb", label: "QB", x: 50, y: 70, endX: 42, endY: 72, role: "Handoff para o RB, fake bootleg." },
      { id: "fb", label: "FB", x: 50, y: 78, endX: 55, endY: 60, role: "Lead block no LB do lado forte." },
      { id: "rb", label: "RB", x: 50, y: 86, endX: 58, endY: 50, role: "Receber handoff, atacar gap B." },
      { id: "te", label: "TE", x: 36, y: 60, endX: 40, endY: 58, role: "Bloqueio na linha de scrimmage." },
      { id: "wr1", label: "WR1", x: 80, y: 55, endX: 82, endY: 40, role: "Bloqueio na CB para fora." },
      { id: "wr2", label: "WR2", x: 20, y: 55, endX: 22, endY: 40, role: "Bloqueio na safety." },
      { id: "ol1", label: "OL", x: 44, y: 62, role: "Down block." },
      { id: "ol2", label: "OL", x: 48, y: 62, role: "Combo block." },
      { id: "ol3", label: "OL", x: 52, y: 62, endX: 58, endY: 60, role: "Pull para o gap." },
      { id: "ol4", label: "OL", x: 56, y: 62, role: "Reach block." },
      { id: "ol5", label: "OL", x: 60, y: 62, role: "Down block lado forte." }
    ]
  },
  {
    id: "p-3",
    name: "Cover 3 Sky",
    formation: "Defesa 4-3",
    category: "Defesa",
    description: "Cobertura zone com 3 deeps e 4 underneath; SS desce para apoio.",
    bullets: [
      "SS desce como apoio sky no run.",
      "FS cobre o terço profundo do meio.",
      "CBs cobrem os terços profundos externos.",
      "LBs cobrem hook-to-curl underneath.",
      "DL aplica pressão em quatro homens, contendo a borda."
    ],
    positions: [
      { id: "ss", label: "S", x: 50, y: 25, endX: 55, endY: 45, role: "Sky support, gatilho no run." },
      { id: "fs", label: "S", x: 30, y: 18, endX: 50, endY: 15, role: "Deep middle 1/3." },
      { id: "cb1", label: "CB", x: 80, y: 30, endX: 80, endY: 18, role: "Deep 1/3 lado forte." },
      { id: "cb2", label: "CB", x: 20, y: 30, endX: 20, endY: 18, role: "Deep 1/3 lado fraco." },
      { id: "lb1", label: "LB", x: 60, y: 50, endX: 65, endY: 45, role: "Hook to curl direita." },
      { id: "lb2", label: "LB", x: 50, y: 48, endX: 50, endY: 42, role: "Mike — hook 10 jardas." },
      { id: "lb3", label: "LB", x: 40, y: 50, endX: 35, endY: 45, role: "Hook to curl esquerda." },
      { id: "dl1", label: "DL", x: 44, y: 60, endX: 44, endY: 68, role: "Pass rush gap B." },
      { id: "dl2", label: "DL", x: 48, y: 60, endX: 48, endY: 68, role: "Two-gap nose." },
      { id: "dl3", label: "DL", x: 52, y: 60, endX: 52, endY: 68, role: "Pass rush gap A." },
      { id: "dl4", label: "DL", x: 56, y: 60, endX: 58, endY: 70, role: "Contain edge." }
    ]
  }
];
const initialMonitoring = [];
export {
  initialMonitoring as a,
  initialPlays as i
};
