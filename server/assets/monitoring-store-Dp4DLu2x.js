import { useState, useEffect, useCallback } from "react";
import { a as initialMonitoring } from "./playbook-data-DgQPGQYH.js";
const KEY = "gladiators.monitoring.v2";
const LEGACY_KEY = "gladiators.monitoring";
const initialState = {
  metrics: initialMonitoring,
  weights: [],
  techNotes: [],
  generalNotes: []
};
function load() {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      return { ...initialState, metrics: JSON.parse(legacy) };
    }
    return initialState;
  } catch {
    return initialState;
  }
}
function persist(s) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(s));
}
const listeners = /* @__PURE__ */ new Set();
let memory = null;
function getState() {
  if (!memory) memory = load();
  return memory;
}
function setState(updater) {
  memory = updater(getState());
  persist(memory);
  listeners.forEach((l) => l());
}
function useMonitoring() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  const state = getState();
  const addMetric = useCallback((e) => {
    setState((s) => ({ ...s, metrics: [{ ...e, id: `m-${Date.now()}` }, ...s.metrics] }));
  }, []);
  const removeMetric = useCallback((id) => {
    setState((s) => ({ ...s, metrics: s.metrics.filter((m) => m.id !== id) }));
  }, []);
  const addWeight = useCallback((e) => {
    setState((s) => ({ ...s, weights: [...s.weights, { ...e, id: `w-${Date.now()}` }] }));
  }, []);
  const removeWeight = useCallback((id) => {
    setState((s) => ({ ...s, weights: s.weights.filter((w) => w.id !== id) }));
  }, []);
  const addTechNote = useCallback((e) => {
    setState((s) => ({ ...s, techNotes: [{ ...e, id: `tn-${Date.now()}` }, ...s.techNotes] }));
  }, []);
  const removeTechNote = useCallback((id) => {
    setState((s) => ({ ...s, techNotes: s.techNotes.filter((n) => n.id !== id) }));
  }, []);
  const addGeneralNote = useCallback((e) => {
    setState((s) => ({ ...s, generalNotes: [{ ...e, id: `g-${Date.now()}` }, ...s.generalNotes] }));
  }, []);
  const removeGeneralNote = useCallback((id) => {
    setState((s) => ({ ...s, generalNotes: s.generalNotes.filter((n) => n.id !== id) }));
  }, []);
  return {
    state,
    addMetric,
    removeMetric,
    addWeight,
    removeWeight,
    addTechNote,
    removeTechNote,
    addGeneralNote,
    removeGeneralNote
  };
}
function summarizeAthlete(state, athleteId) {
  const metrics = state.metrics.filter((m) => m.athleteId === athleteId);
  const weights = state.weights.filter((w) => w.athleteId === athleteId).sort((a, b) => a.date.localeCompare(b.date));
  const techNotes = state.techNotes.filter((n) => n.athleteId === athleteId);
  const generalNotes = state.generalNotes.filter((n) => n.athleteId === athleteId);
  const byMetric = {};
  metrics.forEach((m) => {
    const b = byMetric[m.metric] ||= { metric: m.metric, avg: 0, last: 0, count: 0 };
    b.avg = (b.avg * b.count + m.score) / (b.count + 1);
    b.count += 1;
    b.last = m.score;
  });
  const overall = metrics.length ? Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length) : 0;
  const weightDelta = weights.length >= 2 ? weights[weights.length - 1].weightKg - weights[0].weightKg : 0;
  const currentWeight = weights.length ? weights[weights.length - 1].weightKg : null;
  const timeline = [...metrics].sort((a, b) => a.date.localeCompare(b.date)).map((m, i, arr) => {
    const window2 = arr.slice(Math.max(0, i - 2), i + 1);
    const rolling = Math.round(window2.reduce((s, x) => s + x.score, 0) / window2.length);
    return { date: m.date, score: m.score, rolling, metric: m.metric };
  });
  return { metrics, weights, techNotes, generalNotes, byMetric: Object.values(byMetric), overall, weightDelta, currentWeight, timeline };
}
export {
  summarizeAthlete as s,
  useMonitoring as u
};
