# Testing spec

Test files mirror `src/` structure under `tests/`.

```bash
npm run test -- ranges.test.js   # run single file
```

## Required coverage

**`ranges.js`**
- Every hand string matches valid format: `/^(AA|KK|QQ|JJ|TT|99|88|77|66|55|44|33|22|[AKQJT98765432][AKQJT98765432][so])$/`
- Higher rank always first in suited/offsuit hands (enforce with rank-order lookup)
- No hand appears in two conflicting action arrays for same position/context

**`useAdaptive.js`**
- Level-up at 5 consecutive correct
- Level-down at 3 consecutive wrong
- Weight increases to 3 on wrong answer
- Weight resets to 1 after 3 consecutive correct on that hand

**Decision parsing**
- All input aliases map correctly: `o/open` → `open`, `3/3bet` → `3bet`, `4/4bet` → `4bet`, `c/call` → `call`, `f/fold` → `fold`, `l/limp` → `limp`, `r/raise` → `raise`, `x/check` → `check`
- Unrecognised input returns error, does not submit
- SB context: `c`/`call` maps to `limp`

**Storage**
- Schema version mismatch triggers reset, not silent corruption
- Reset logs console warning
