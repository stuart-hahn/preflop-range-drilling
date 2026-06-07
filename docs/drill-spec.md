# Drill spec

## Drill loop

One scenario = position + hand (+ opener position at Expert level).
User sees position and hand, types decision, submits.
Scored against `ranges.js` for that position/context.

Timer runs from scenario display until submission or expiry.
On expiry: do not auto-submit — show correct answer, mark timed-out (treated as wrong).

## Adaptive difficulty

| Level        | Positions     | Actions in scope          | Timer multiplier |
|--------------|---------------|---------------------------|-----------------|
| Beginner     | BTN, CO only  | open / fold               | 1.5×            |
| Intermediate | All           | open / fold               | 1.0×            |
| Advanced     | All           | open / fold / call        | 0.8×            |
| Expert       | All           | open / fold / call / 3bet | 0.6×            |

Timer multiplier applies to user-configured base timer (default 20s, range 10–60s).

Level-up: 5 consecutive correct → advance one level.
Level-down: 3 consecutive wrong → drop one level.
Thresholds reset on level change.

## Hints

Visible by default at Beginner/Intermediate. Hidden at Advanced/Expert. Always togglable.

Position VPIP hint text:
- UTG: ~17% | HJ: ~21% | CO: ~28% | BTN: ~42%
- SB: "raises ~27%, limps ~29%, folds ~43%"
- BB: varies (update when chart added)

## Spaced repetition

Wrong or timed-out → weight 3× in random selection pool.
Correct → return to weight 1× after 3 consecutive correct on that hand.

```js
// weights[position][hand] = 1 (normal) or 3 (needs work)
```

## Storage schema

Key: `preflop_drill_v1`

```js
{
  version: 1,           // increment on schema change; mismatch → reset + console.warn
  difficulty: 0,        // 0–3 index
  streak: 0,            // consecutive correct count
  allTimeTotal: 0,
  allTimeCorrect: 0,
  weights: {
    UTG: { AKs: 1, ... },
    // all positions
  },
  timerBase: 20,        // seconds
  hintEnabled: true,
}
```

On load: version missing or mismatched → reset to defaults, log console warning.
Do not silently corrupt state.

## Feedback

Immediate on submission:
- Verdict: correct / wrong / timed-out
- Correct answer if wrong or timed-out

Collapsible breakdown (one click):
- Why this hand is/isn't in range — from `reasons` export in `ranges.js` (developer-written, not model-generated)
- Positional gradient reminder
- Mental shortcut if one exists

Do not show solver frequencies or mixed strategy percentages.
