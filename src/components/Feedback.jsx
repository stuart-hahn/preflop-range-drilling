import { ACTION_LABELS } from '../constants.js';

export default function Feedback({ result, onNext }) {
  const { isCorrect, correctAction, timedOut } = result;

  const verdictText = timedOut ? 'Timed Out' : isCorrect ? 'Correct' : 'Wrong';
  const verdictColor = isCorrect && !timedOut ? 'text-green-400' : 'text-red-400';
  const showCorrect = !isCorrect || timedOut;

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="flex flex-col items-center gap-1">
        <span className={`text-3xl font-bold ${verdictColor}`}>{verdictText}</span>
        {showCorrect && (
          <span className="text-slate-400 text-sm">
            Correct:{' '}
            <span className="font-semibold text-slate-100">{ACTION_LABELS[correctAction]}</span>
          </span>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl bg-slate-600 hover:bg-slate-500 active:bg-slate-400 font-semibold transition-colors flex items-center justify-center gap-2"
      >
        Next
        <span className="text-xs text-slate-400">Enter</span>
      </button>
    </div>
  );
}
