import { useState } from 'react';
import { STORAGE_KEY, STORAGE_VERSION, TIMER_DEFAULT } from '../constants.js';

export const DEFAULT_STATE = {
  version: STORAGE_VERSION,
  difficulty: 0,
  streak: 0,
  wrongStreak: 0,
  allTimeTotal: 0,
  allTimeCorrect: 0,
  weights: {},
  handStreaks: {},
  timerBase: TIMER_DEFAULT,
  hintEnabled: true,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) {
      console.warn(
        `[preflop-drill] Storage version mismatch (found ${parsed.version}, expected ${STORAGE_VERSION}). Resetting.`
      );
      return DEFAULT_STATE;
    }
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useStorage() {
  const [state, setState] = useState(loadState);

  function update(patch) {
    setState(prev => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full — continue without persisting
      }
      return next;
    });
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setState(DEFAULT_STATE);
  }

  return { state, update, reset };
}
