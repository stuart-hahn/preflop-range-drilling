# Range data rules

`ranges.js` is the single source of truth. No hand decision logic lives anywhere else.

## CRITICAL: Never generate range data from model knowledge

All ranges sourced from RangeConverter "6 max 100bb 500z GTO Ranges" PDF
(rangeconverter.com). When developer provides a chart image, read it and populate
the array. Missing positions stay as `[]` with `// TODO: add from chart` comment.
The drill skips empty arrays — never fill them with approximations.

## Hand string format

Exactly one of:
- Pocket pair: `'AA'`, `'KK'`, `'22'` (two identical ranks, no suffix)
- Suited: `'AKs'`, `'T9s'`, `'76s'` (higher rank first + `s`)
- Offsuit: `'AKo'`, `'QJo'`, `'72o'` (higher rank first + `o`)

Rank order (high→low): `A K Q J T 9 8 7 6 5 4 3 2`. Higher rank always first.

## Actions (canonical keys in ranges.js)

| Key      | Meaning                         | User inputs              | Scope    |
|----------|---------------------------------|--------------------------|----------|
| `open`   | Open-raise (no prior action)    | `o`, `open`              | All      |
| `3bet`   | 3-bet over open                 | `3`, `3bet`              | All      |
| `4bet`   | 4-bet over 3-bet                | `4`, `4bet`              | All      |
| `call`   | Call open or 3-bet              | `c`, `call`              | All      |
| `fold`   | Fold                            | `f`, `fold`              | All      |
| `limp`   | SB complete when folded to      | `l`, `limp`, `c`, `call` | SB only  |
| `raise`  | BB raises SB limp               | `r`, `raise`             | BB only  |
| `check`  | BB checks SB limp               | `x`, `check`             | BB only  |

**vs-3bet keys**: `4bet_vs_[pos]_3bet`, `call_vs_[pos]_3bet`. Absent from both = fold.

**SB folded-to**: valid answers `open`, `limp`, `fold`. Accept `c`/`call` as `limp`.
Display correct answer as "Limp" not "Call" in SB feedback.

**BB vs SB limp**: no fold option. Valid: `raise` or `check`.
Absent from `raise_vs_SB_limp` = check.

## Positions

`UTG`, `HJ`, `CO`, `BTN`, `SB`, `BB` — 6-max, in order.

- SB Drill #1: open or fold only (vs. no other limpers). Defending ranges deferred.
- BB Drill #1: call or fold vs. single opener. 3-bet ranges are Expert-level.

## ranges.js shape

Fold arrays omitted — any hand absent from action arrays = fold (no duplication).
Mixed strategies rounded to ≥50% threshold → included.

```js
export const RANGES_100BB_6MAX = {
  UTG: {
    open: ['AA', 'KK', /* ... */],
    '4bet_vs_HJ_3bet': ['AA', /* ... */],
    'call_vs_HJ_3bet': ['TT', /* ... */],
    // one entry per vs-position scenario
  },
  HJ: {
    open: [/* ... */],
    '3bet_vs_UTG': [/* ... */],
    // ...
  },
  CO: { /* same pattern */ },
  BTN: {
    open: [/* ... */],
    '3bet_vs_UTG': [/* ... */],
    call_vs_UTG: [/* ... */],   // BTN can call opens (no quotes = valid JS identifier)
    // ...
  },
  SB: {
    open: [/* ... */],    // raise hands
    call: [/* ... */],    // limp hands
    '3bet_vs_UTG': [/* ... */],
    call_vs_UTG: [],      // TODO: add from chart
    // ...
  },
  BB: {
    '3bet_vs_UTG': [/* ... */],
    call_vs_UTG: [/* ... */],
    raise_vs_SB_limp: [/* ... */],
    // no open array — BB never opens
  },
};
```

Each position populated from a separate chart image. Source PNG filename noted
in a comment above each position block.
