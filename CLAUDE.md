# preflop-range-drilling

Preflop range drill — 6-max cash, 100BB. Target: sub-3s recall, 95%+ accuracy, 50 consecutive.
One question drives every decision: **does this help the user reach automatic preflop recall faster?**

## Stack

- React + Vite, Tailwind CSS
- `window.storage` for persistence (no backend)
- No external poker libraries — all range logic hand-coded and auditable

## Architecture

```
src/
  constants.js          # All magic numbers (timer default, thresholds, weights)
  data/
    ranges.js           # Single source of truth for GTO range data
    positions.js        # Position definitions, labels, order
  components/
    Drill.jsx           # Core flashcard loop
    Timer.jsx           # Countdown bar (configurable 10–60s)
    Stats.jsx           # Session and all-time metrics
    Settings.jsx        # Timer, hint toggle, reset
    Feedback.jsx        # Verdict + collapsible breakdown
  hooks/
    useStorage.js       # Thin wrapper around window.storage
    useAdaptive.js      # Spaced repetition and difficulty logic
  App.jsx / main.jsx
```

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run test      # Vitest unit tests
npm run lint      # ESLint
```

## Code style

- ES modules only — no CommonJS
- Functional components and hooks only
- Tailwind utility classes only — no custom CSS files
- No inline event handlers in JSX — extract named functions
- One component per file; file name matches component name exactly
- All magic numbers in `src/constants.js`

## Critical constraints

- **Never generate range data from model knowledge** — populate `ranges.js` only from chart images the developer provides
- No backend, no poker library, no GTO frequencies, no post-flop content
- Never hardcode hand decisions outside `ranges.js`
- Never change storage schema without version bump + migration function
- Never commit `ranges.js` changes without updating tests

## Specs (read when working on these areas)

- Range data format, hand strings, actions, positions: `src/data/CLAUDE.md`
- Drill loop, adaptive difficulty, storage schema, feedback: `docs/drill-spec.md`
- Test requirements: `docs/testing-spec.md`
