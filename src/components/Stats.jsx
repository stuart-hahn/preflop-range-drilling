import { useStorage } from '../hooks/useStorage.js';
import { DIFFICULTY_LABELS } from '../constants.js';

function StatRow({ label, value, sub }) {
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-slate-700/50 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="text-right">
        <span className="font-semibold tabular-nums">{value}</span>
        {sub && <span className="text-xs text-slate-500 block">{sub}</span>}
      </div>
    </div>
  );
}

export default function Stats({ onBack }) {
  const { state } = useStorage();
  const { allTimeTotal, allTimeCorrect, difficulty, streak } = state;

  const accuracyPct = allTimeTotal > 0
    ? Math.round((allTimeCorrect / allTimeTotal) * 100)
    : null;

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <button
        onClick={onBack}
        className="self-start text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-slate-800 rounded-2xl p-5 flex flex-col gap-1">
        <h2 className="font-bold text-lg mb-3">Stats</h2>

        <StatRow label="Questions" value={allTimeTotal} />
        <StatRow
          label="Accuracy"
          value={accuracyPct !== null ? `${accuracyPct}%` : '—'}
          sub={allTimeTotal > 0 ? `${allTimeCorrect} of ${allTimeTotal} correct` : null}
        />
        <StatRow label="Level" value={DIFFICULTY_LABELS[difficulty]} />
        <StatRow label="Streak" value={`${streak}`} sub="consecutive correct" />
      </div>
    </div>
  );
}
