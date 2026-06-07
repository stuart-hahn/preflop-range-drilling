import { describe, it, expect } from 'vitest';
import { RANGES_100BB_6MAX } from '../src/data/ranges.js';

const RANK_ORDER = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const HAND_RE = /^([AKQJT98765432]{2}|[AKQJT98765432]{2}[so])$/;

function rankIndex(r) {
  return RANK_ORDER.indexOf(r);
}

function collectAllHands(position) {
  const entries = [];
  const pos = RANGES_100BB_6MAX[position];
  for (const [key, arr] of Object.entries(pos)) {
    if (!Array.isArray(arr)) continue;
    for (const hand of arr) {
      entries.push({ key, hand });
    }
  }
  return entries;
}

describe('ranges.js — hand string format', () => {
  for (const position of Object.keys(RANGES_100BB_6MAX)) {
    it(`${position}: all hand strings match valid format`, () => {
      const entries = collectAllHands(position);
      for (const { key, hand } of entries) {
        expect(hand, `${position}.${key}: "${hand}"`).toMatch(HAND_RE);
      }
    });

    it(`${position}: higher rank always first`, () => {
      const entries = collectAllHands(position);
      for (const { key, hand } of entries) {
        const isPair = hand.length === 2;
        if (isPair) continue;
        const r1 = hand[0];
        const r2 = hand[1];
        expect(
          rankIndex(r1),
          `${position}.${key}: "${hand}" — ${r1} should outrank ${r2}`
        ).toBeLessThan(rankIndex(r2));
      }
    });
  }
});

describe('ranges.js — no conflicting duplicates', () => {
  for (const position of Object.keys(RANGES_100BB_6MAX)) {
    it(`${position}: no hand in two action arrays for same context`, () => {
      const pos = RANGES_100BB_6MAX[position];

      // Group keys by context prefix (e.g., "vs_UTG", "vs_HJ_3bet", "rfi")
      // Conflicting = same context, different action arrays
      const contextMap = {};

      for (const [key, arr] of Object.entries(pos)) {
        if (!Array.isArray(arr)) continue;

        // Derive context tag from key
        let context;
        if (key === 'open' || key === 'call') {
          context = 'rfi';
        } else if (key.startsWith('raise_vs_SB_limp')) {
          context = 'vs_sb_limp';
        } else {
          // e.g. "3bet_vs_UTG", "call_vs_UTG", "4bet_vs_HJ_3bet", "call_vs_HJ_3bet"
          const match = key.match(/^(?:3bet|4bet|call)_vs_(.+)$/);
          context = match ? match[1] : key;
        }

        if (!contextMap[context]) contextMap[context] = {};

        for (const hand of arr) {
          expect(
            contextMap[context][hand],
            `${position}: "${hand}" appears in multiple arrays for context "${context}" (also in "${contextMap[context][hand]}")`
          ).toBeUndefined();
          contextMap[context][hand] = key;
        }
      }
    });
  }
});
