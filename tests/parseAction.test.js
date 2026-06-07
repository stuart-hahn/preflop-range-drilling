import { describe, it, expect } from 'vitest';
import { parseAction } from '../src/hooks/useAdaptive.js';

describe('parseAction — aliases', () => {
  it.each([
    ['o', 'rfi', 'open'],
    ['open', 'rfi', 'open'],
    ['f', 'rfi', 'fold'],
    ['fold', 'rfi', 'fold'],
    ['3', 'vs_open', '3bet'],
    ['3bet', 'vs_open', '3bet'],
    ['4', 'vs_3bet', '4bet'],
    ['4bet', 'vs_3bet', '4bet'],
    ['c', 'vs_open', 'call'],
    ['call', 'vs_open', 'call'],
    ['r', 'vs_sb_limp', 'raise'],
    ['raise', 'vs_sb_limp', 'raise'],
    ['x', 'vs_sb_limp', 'check'],
    ['check', 'vs_sb_limp', 'check'],
    ['l', 'rfi_sb', 'limp'],
    ['limp', 'rfi_sb', 'limp'],
  ])('"%s" in %s → "%s"', (input, type, expected) => {
    expect(parseAction(input, type)).toBe(expected);
  });
});

describe('parseAction — SB context: c/call → limp', () => {
  it('c in rfi_sb → limp', () => {
    expect(parseAction('c', 'rfi_sb')).toBe('limp');
  });
  it('call in rfi_sb → limp', () => {
    expect(parseAction('call', 'rfi_sb')).toBe('limp');
  });
  it('c in rfi (non-SB) → call', () => {
    expect(parseAction('c', 'rfi')).toBe(null); // call is not valid for rfi
  });
});

describe('parseAction — invalid inputs', () => {
  it('unrecognized string → null', () => {
    expect(parseAction('blah', 'rfi')).toBeNull();
  });
  it('empty string → null', () => {
    expect(parseAction('', 'rfi')).toBeNull();
  });
  it('action invalid for context → null', () => {
    expect(parseAction('raise', 'rfi')).toBeNull();   // raise only valid in vs_sb_limp
    expect(parseAction('check', 'rfi')).toBeNull();   // check only valid in vs_sb_limp
    expect(parseAction('4bet', 'rfi')).toBeNull();    // 4bet only valid in vs_3bet
    expect(parseAction('open', 'vs_open')).toBeNull(); // open not valid vs opener
  });
});
