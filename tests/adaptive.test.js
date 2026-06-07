import { describe, it, expect } from 'vitest';
import { computeNextState } from '../src/hooks/useAdaptive.js';
import { DEFAULT_STATE } from '../src/hooks/useStorage.js';
import { WEIGHT_WRONG } from '../src/constants.js';

function makeState(overrides = {}) {
  return { ...DEFAULT_STATE, ...overrides };
}

function applyN(state, n, isCorrect, position = 'BTN', hand = 'AA') {
  let s = state;
  for (let i = 0; i < n; i++) {
    s = { ...s, ...computeNextState(s, isCorrect, position, hand) };
  }
  return s;
}

describe('level-up', () => {
  it('advances after 5 consecutive correct', () => {
    const s = applyN(makeState(), 5, true);
    expect(s.difficulty).toBe(1);
    expect(s.streak).toBe(0);
  });

  it('does not advance before 5 consecutive correct', () => {
    const s = applyN(makeState(), 4, true);
    expect(s.difficulty).toBe(0);
    expect(s.streak).toBe(4);
  });

  it('does not exceed level 3', () => {
    const s = applyN(makeState({ difficulty: 3 }), 10, true);
    expect(s.difficulty).toBe(3);
  });

  it('resets streak on level-up', () => {
    const s = applyN(makeState(), 5, true);
    expect(s.streak).toBe(0);
  });
});

describe('level-down', () => {
  it('drops after 3 consecutive wrong', () => {
    const s = applyN(makeState({ difficulty: 2 }), 3, false);
    expect(s.difficulty).toBe(1);
    expect(s.wrongStreak).toBe(0);
  });

  it('does not drop before 3 consecutive wrong', () => {
    const s = applyN(makeState({ difficulty: 1 }), 2, false);
    expect(s.difficulty).toBe(1);
    expect(s.wrongStreak).toBe(2);
  });

  it('does not drop below level 0', () => {
    const s = applyN(makeState({ difficulty: 0 }), 5, false);
    expect(s.difficulty).toBe(0);
  });

  it('resets wrongStreak on level-down', () => {
    const s = applyN(makeState({ difficulty: 1 }), 3, false);
    expect(s.wrongStreak).toBe(0);
  });
});

describe('streak resets on wrong answer', () => {
  it('resets correct streak when answer is wrong', () => {
    let s = applyN(makeState(), 4, true);
    expect(s.streak).toBe(4);
    s = { ...s, ...computeNextState(s, false, 'BTN', 'AA') };
    expect(s.streak).toBe(0);
  });
});

describe('spaced repetition weights', () => {
  it('weight increases to 3 on wrong answer', () => {
    const s = { ...DEFAULT_STATE, ...computeNextState(DEFAULT_STATE, false, 'BTN', 'AKs') };
    expect(s.weights.BTN?.AKs).toBe(WEIGHT_WRONG);
  });

  it('weight stays 3 on subsequent wrong answers', () => {
    let s = { ...DEFAULT_STATE, ...computeNextState(DEFAULT_STATE, false, 'BTN', 'AKs') };
    s = { ...s, ...computeNextState(s, false, 'BTN', 'AKs') };
    expect(s.weights.BTN?.AKs).toBe(WEIGHT_WRONG);
  });

  it('weight resets to 1 after 3 consecutive correct on same hand', () => {
    let s = { ...DEFAULT_STATE, ...computeNextState(DEFAULT_STATE, false, 'BTN', 'AKs') };
    expect(s.weights.BTN?.AKs).toBe(WEIGHT_WRONG);
    s = applyN(s, 3, true, 'BTN', 'AKs');
    expect(s.weights.BTN?.AKs).toBe(1);
  });

  it('weight does not reset before 3 consecutive correct', () => {
    let s = { ...DEFAULT_STATE, ...computeNextState(DEFAULT_STATE, false, 'BTN', 'AKs') };
    s = applyN(s, 2, true, 'BTN', 'AKs');
    expect(s.weights.BTN?.AKs).toBe(WEIGHT_WRONG);
  });

  it('wrong answer resets hand streak back to 0', () => {
    let s = applyN(DEFAULT_STATE, 2, true, 'BTN', 'AKs');
    s = { ...s, ...computeNextState(s, false, 'BTN', 'AKs') };
    expect(s.handStreaks.BTN?.AKs).toBe(0);
  });
});

describe('allTime counters', () => {
  it('increments allTimeTotal on every answer', () => {
    let s = applyN(makeState(), 3, true);
    s = applyN(s, 2, false);
    expect(s.allTimeTotal).toBe(5);
  });

  it('increments allTimeCorrect only on correct answers', () => {
    let s = applyN(makeState(), 3, true);
    s = applyN(s, 2, false);
    expect(s.allTimeCorrect).toBe(3);
  });
});
