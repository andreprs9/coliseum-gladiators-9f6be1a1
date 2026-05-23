import { useCallback, useEffect, useState } from "react";
import { initialMonitoring, type MonitoringEntry } from "./playbook-data";

export type WeightEntry = { id: string; athleteId: string; date: string; weightKg: number };
export type TechNote = { id: string; athleteId: string; date: string; skill: string; rating: number; note: string };
export type GeneralNote = { id: string; athleteId: string; date: string; note: string };

export type MonitoringState = {
  metrics: MonitoringEntry[];
  weights: WeightEntry[];
  techNotes: TechNote[];
  generalNotes: GeneralNote[];
};

const KEY = "gladiators.monitoring.v2";
const LEGACY_KEY = "gladiators.monitoring";

const initialState: MonitoringState = {
  metrics: initialMonitoring,
  weights: [],
  techNotes: [],
  generalNotes: [],
};

function load(): MonitoringState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as MonitoringState;
    // migrate legacy metrics-only store
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      return { ...initialState, metrics: JSON.parse(legacy) as MonitoringEntry[] };
    }
    return initialState;
  } catch {
    return initialState;
  }
}

function persist(s: MonitoringState) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(s));
}

// Simple cross-component subscription
const listeners = new Set<() => void>();
let memory: MonitoringState | null = null;

function getState(): MonitoringState {
  if (!memory) memory = load();
  return memory;
}
function setState(updater: (s: MonitoringState) => MonitoringState) {
  memory = updater(getState());
  persist(memory);
  listeners.forEach((l) => l());
}

export function useMonitoring() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  const state = getState();

  const addMetric = useCallback((e: Omit<MonitoringEntry, "id">) => {
    setState((s) => ({ ...s, metrics: [{ ...e, id: `m-${Date.now()}` }, ...s.metrics] }));
  }, []);
  const removeMetric = useCallback((id: string) => {
    setState((s) => ({ ...s, metrics: s.metrics.filter((m) => m.id !== id) }));
  }, []);

  const addWeight = useCallback((e: Omit<WeightEntry, "id">) => {
    setState((s) => ({ ...s, weights: [...s.weights, { ...e, id: `w-${Date.now()}` }] }));
  }, []);
  const removeWeight = useCallback((id: string) => {
    setState((s) => ({ ...s, weights: s.weights.filter((w) => w.id !== id) }));
  }, []);

  const addTechNote = useCallback((e: Omit<TechNote, "id">) => {
    setState((s) => ({ ...s, techNotes: [{ ...e, id: `tn-${Date.now()}` }, ...s.techNotes] }));
  }, []);
  const removeTechNote = useCallback((id: string) => {
    setState((s) => ({ ...s, techNotes: s.techNotes.filter((n) => n.id !== id) }));
  }, []);

  const addGeneralNote = useCallback((e: Omit<GeneralNote, "id">) => {
    setState((s) => ({ ...s, generalNotes: [{ ...e, id: `g-${Date.now()}` }, ...s.generalNotes] }));
  }, []);
  const removeGeneralNote = useCallback((id: string) => {
    setState((s) => ({ ...s, generalNotes: s.generalNotes.filter((n) => n.id !== id) }));
  }, []);

  return {
    state,
    addMetric, removeMetric,
    addWeight, removeWeight,
    addTechNote, removeTechNote,
    addGeneralNote, removeGeneralNote,
  };
}

export function summarizeAthlete(state: MonitoringState, athleteId: string) {
  const metrics = state.metrics.filter((m) => m.athleteId === athleteId);
  const weights = state.weights.filter((w) => w.athleteId === athleteId).sort((a, b) => a.date.localeCompare(b.date));
  const techNotes = state.techNotes.filter((n) => n.athleteId === athleteId);
  const generalNotes = state.generalNotes.filter((n) => n.athleteId === athleteId);

  const byMetric: Record<string, { metric: string; avg: number; last: number; count: number }> = {};
  metrics.forEach((m) => {
    const b = (byMetric[m.metric] ||= { metric: m.metric, avg: 0, last: 0, count: 0 });
    b.avg = (b.avg * b.count + m.score) / (b.count + 1);
    b.count += 1;
    b.last = m.score;
  });

  const overall = metrics.length
    ? Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length)
    : 0;

  const weightDelta = weights.length >= 2 ? weights[weights.length - 1].weightKg - weights[0].weightKg : 0;
  const currentWeight = weights.length ? weights[weights.length - 1].weightKg : null;

  // Evolution timeline: chronological score per evaluation, with rolling avg
  const timeline = [...metrics]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((m, i, arr) => {
      const window = arr.slice(Math.max(0, i - 2), i + 1);
      const rolling = Math.round(window.reduce((s, x) => s + x.score, 0) / window.length);
      return { date: m.date, score: m.score, rolling, metric: m.metric };
    });

  return { metrics, weights, techNotes, generalNotes, byMetric: Object.values(byMetric), overall, weightDelta, currentWeight, timeline };
}
