import { useState, useMemo } from 'react';
import { RANGES_100BB_6MAX } from '../data/ranges.js';
import {
  DIFFICULTY,
  LEVEL_UP_STREAK,
  LEVEL_DOWN_STREAK,
  WEIGHT_WRONG,
  WEIGHT_RESET_CONSECUTIVE,
} from '../constants.js';
import {
  BEGINNER_POSITIONS,
  VS_3BET_CONFIGS,
  CAN_CALL_VS_OPEN,
  CAN_3BET_VS_OPEN,
} from '../data/positions.js';
import { useStorage } from './useStorage.js';

// ── Hand universe ─────────────────────────────────────────────────────────────

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];

export function generateAllHands() {
  const hands = [];
  for (let i = 0; i < RANKS.length; i++) {
    for (let j = i; j < RANKS.length; j++) {
      if (i === j) {
        hands.push(RANKS[i] + RANKS[j]);
      } else {
        hands.push(RANKS[i] + RANKS[j] + 's');
        hands.push(RANKS[i] + RANKS[j] + 'o');
      }
    }
  }
  return hands;
}

export const ALL_HANDS = generateAllHands();

// ── Card dealing ──────────────────────────────────────────────────────────────

function shuffleSuits() {
  return [...SUITS].sort(() => Math.random() - 0.5);
}

export function dealCards(hand) {
  const isPair = hand.length === 2;
  const isSuited = hand.endsWith('s');
  const rank1 = hand[0];
  const rank2 = isPair ? hand[0] : hand[1];

  if (isSuited) {
    const suit = SUITS[Math.floor(Math.random() * 4)];
    return [{ rank: rank1, suit }, { rank: rank2, suit }];
  }

  const [s1, s2] = shuffleSuits();
  return [{ rank: rank1, suit: s1 }, { rank: rank2, suit: s2 }];
}

// ── Action parsing ────────────────────────────────────────────────────────────

const ACTION_ALIASES = {
  o: 'open', open: 'open',
  f: 'fold', fold: 'fold',
  c: 'call', call: 'call',
  l: 'limp', limp: 'limp',
  '3': '3bet', '3bet': '3bet',
  '4': '4bet', '4bet': '4bet',
  r: 'raise', raise: 'raise',
  x: 'check', check: 'check',
};

const VALID_ACTIONS_BY_TYPE = {
  rfi: new Set(['open', 'fold']),
  rfi_sb: new Set(['open', 'limp', 'fold']),
  vs_open: new Set(['3bet', 'call', 'fold']),
  vs_3bet: new Set(['4bet', 'call', 'fold']),
  vs_sb_limp: new Set(['raise', 'check']),
};

// Returns canonical action or null for unrecognized input.
// scenarioType is used to remap c/call → limp in SB RFI context.
export function parseAction(input, scenarioType) {
  const normalized = (input || '').trim().toLowerCase();
  const action = ACTION_ALIASES[normalized];
  if (!action) return null;

  if (scenarioType === 'rfi_sb' && action === 'call') return 'limp';

  const valid = VALID_ACTIONS_BY_TYPE[scenarioType];
  if (valid && !valid.has(action)) return null;

  return action;
}

// ── Correct answer resolution ─────────────────────────────────────────────────

export function getCorrectAction(scenario, level) {
  const { position, hand, scenarioType, context } = scenario;
  const R = RANGES_100BB_6MAX;

  if (scenarioType === 'rfi') {
    return R[position].open?.includes(hand) ? 'open' : 'fold';
  }

  if (scenarioType === 'rfi_sb') {
    if (R.SB.open?.includes(hand)) return 'open';
    if (level >= DIFFICULTY.ADVANCED && R.SB.call?.includes(hand)) return 'limp';
    return 'fold';
  }

  if (scenarioType === 'vs_open') {
    const { opener } = context;
    const threebetKey = `3bet_vs_${opener}`;
    const callKey = `call_vs_${opener}`;
    if (level >= DIFFICULTY.EXPERT && R[position][threebetKey]?.includes(hand)) return '3bet';
    if (R[position][callKey]?.includes(hand)) return 'call';
    return 'fold';
  }

  if (scenarioType === 'vs_3bet') {
    const { threebettor } = context;
    const fourbetKey = `4bet_vs_${threebettor}_3bet`;
    const callKey = `call_vs_${threebettor}_3bet`;
    if (R[position][fourbetKey]?.includes(hand)) return '4bet';
    if (R[position][callKey]?.includes(hand)) return 'call';
    return 'fold';
  }

  if (scenarioType === 'vs_sb_limp') {
    return R.BB.raise_vs_SB_limp?.includes(hand) ? 'raise' : 'check';
  }

  return 'fold';
}

// ── Scenario pool ─────────────────────────────────────────────────────────────

export function buildScenarioPool(level) {
  const pool = [];
  const R = RANGES_100BB_6MAX;

  // RFI (non-SB)
  const rfiPositions = level === DIFFICULTY.BEGINNER
    ? BEGINNER_POSITIONS.filter(p => p !== 'SB')
    : ['UTG', 'HJ', 'CO', 'BTN'];

  for (const pos of rfiPositions) {
    for (const hand of ALL_HANDS) {
      pool.push({ position: pos, hand, scenarioType: 'rfi', context: null });
    }
  }

  // SB RFI (separate type for limp alias handling)
  if (level >= DIFFICULTY.INTERMEDIATE) {
    for (const hand of ALL_HANDS) {
      pool.push({ position: 'SB', hand, scenarioType: 'rfi_sb', context: null });
    }
  }

  // vs_open — positions with call arrays (BB, BTN): valid from Advanced
  if (level >= DIFFICULTY.ADVANCED) {
    for (const [pos, openers] of Object.entries(CAN_CALL_VS_OPEN)) {
      for (const opener of openers) {
        const threebetKey = `3bet_vs_${opener}`;
        const threebetSet = new Set(R[pos][threebetKey] || []);

        for (const hand of ALL_HANDS) {
          // At Advanced, skip 3bet-only hands — answer would be incorrectly drilled as fold
          if (level < DIFFICULTY.EXPERT && threebetSet.has(hand)) continue;
          pool.push({ position: pos, hand, scenarioType: 'vs_open', context: { opener } });
        }
      }
    }
  }

  // vs_open — positions with 3bet-only arrays (CO, HJ, SB): Expert only
  if (level >= DIFFICULTY.EXPERT) {
    for (const [pos, openers] of Object.entries(CAN_3BET_VS_OPEN)) {
      for (const opener of openers) {
        for (const hand of ALL_HANDS) {
          pool.push({ position: pos, hand, scenarioType: 'vs_open', context: { opener } });
        }
      }
    }

    // vs_3bet
    for (const { position, threebettors } of VS_3BET_CONFIGS) {
      for (const threebettor of threebettors) {
        const fourbetKey = `4bet_vs_${threebettor}_3bet`;
        const callKey = `call_vs_${threebettor}_3bet`;
        if (!R[position][fourbetKey] && !R[position][callKey]) continue;
        for (const hand of ALL_HANDS) {
          pool.push({ position, hand, scenarioType: 'vs_3bet', context: { threebettor } });
        }
      }
    }

    // BB vs SB limp
    for (const hand of ALL_HANDS) {
      pool.push({ position: 'BB', hand, scenarioType: 'vs_sb_limp', context: null });
    }
  }

  return pool;
}

// ── Weighted random pick ──────────────────────────────────────────────────────

function pickScenario(pool, weights) {
  let total = 0;
  for (const s of pool) {
    total += (weights[s.position]?.[s.hand] ?? 1);
  }

  let target = Math.random() * total;
  for (const s of pool) {
    target -= (weights[s.position]?.[s.hand] ?? 1);
    if (target <= 0) return s;
  }
  return pool[pool.length - 1];
}

// ── State transition (pure — exported for tests) ──────────────────────────────

export function computeNextState(state, isCorrect, position, hand) {
  let { streak, wrongStreak = 0, difficulty, allTimeTotal, allTimeCorrect } = state;
  const weights = { ...state.weights };
  const handStreaks = { ...state.handStreaks };

  if (!weights[position]) weights[position] = {};
  if (!handStreaks[position]) handStreaks[position] = {};

  if (isCorrect) {
    wrongStreak = 0;
    streak += 1;
    const hs = (handStreaks[position][hand] || 0) + 1;
    handStreaks[position][hand] = hs;
    if (hs >= WEIGHT_RESET_CONSECUTIVE) {
      weights[position][hand] = 1;
      handStreaks[position][hand] = 0;
    }
    if (streak >= LEVEL_UP_STREAK && difficulty < 3) {
      difficulty += 1;
      streak = 0;
      wrongStreak = 0;
    }
  } else {
    streak = 0;
    wrongStreak += 1;
    weights[position][hand] = WEIGHT_WRONG;
    handStreaks[position][hand] = 0;
    if (wrongStreak >= LEVEL_DOWN_STREAK && difficulty > 0) {
      difficulty -= 1;
      streak = 0;
      wrongStreak = 0;
    }
  }

  return {
    streak,
    wrongStreak,
    difficulty,
    allTimeTotal: allTimeTotal + 1,
    allTimeCorrect: allTimeCorrect + (isCorrect ? 1 : 0),
    weights,
    handStreaks,
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export default function useAdaptive() {
  const { state, update, reset } = useStorage();

  const pool = useMemo(
    () => buildScenarioPool(state.difficulty),
    [state.difficulty]
  );

  const makeScenario = (s) => ({ ...s, cards: dealCards(s.hand) });

  const [scenario, setScenario] = useState(() =>
    makeScenario(pickScenario(pool, state.weights))
  );

  function nextScenario() {
    setScenario(makeScenario(pickScenario(pool, state.weights)));
  }

  function submitAnswer(input) {
    const parsed = parseAction(input, scenario.scenarioType);
    if (!parsed) return { error: 'Unrecognized input' };

    const correctAction = getCorrectAction(scenario, state.difficulty);
    const isCorrect = parsed === correctAction;

    const patch = computeNextState(state, isCorrect, scenario.position, scenario.hand);
    update(patch);

    return { isCorrect, correctAction, parsed };
  }

  return {
    scenario,
    level: state.difficulty,
    streak: state.streak,
    allTimeTotal: state.allTimeTotal,
    allTimeCorrect: state.allTimeCorrect,
    timerBase: state.timerBase,
    hintEnabled: state.hintEnabled,
    submitAnswer,
    nextScenario,
    update,
    reset,
  };
}
