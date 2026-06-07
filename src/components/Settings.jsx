import { useState } from 'react';
import { useStorage } from '../hooks/useStorage.js';
import { TIMER_MIN, TIMER_MAX } from '../constants.js';

export default function Settings({ onBack }) {
  const { state, update, reset } = useStorage();
  const { timerBase, hintEnabled } = state;
  const [confirmReset, setConfirmReset] = useState(false);

  function handleTimerChange(e) {
    update({ timerBase: Number(e.target.value) });
  }

  function handleHintToggle() {
    update({ hintEnabled: !hintEnabled });
  }

  function handleResetClick() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    reset();
    setConfirmReset(false);
    onBack();
  }

  function handleResetCancel() {
    setConfirmReset(false);
  }

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <button
        onClick={onBack}
        className="self-start text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-slate-800 rounded-2xl p-5 flex flex-col gap-6">
        <h2 className="font-bold text-lg">Settings</h2>

        {/* Timer */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-slate-300 font-medium">Base timer</span>
            <span className="font-mono text-sm tabular-nums text-slate-200">{timerBase}s</span>
          </div>
          <input
            type="range"
            min={TIMER_MIN}
            max={TIMER_MAX}
            step={5}
            value={timerBase}
            onChange={handleTimerChange}
            className="w-full accent-blue-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{TIMER_MIN}s</span>
            <span className="text-slate-600 text-center">
              multiplied by level (1.5× → 0.6×)
            </span>
            <span>{TIMER_MAX}s</span>
          </div>
        </div>

        {/* Hint toggle */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-300">Show hints</p>
            <p className="text-xs text-slate-500 mt-0.5">VPIP % shown at Beginner / Intermediate</p>
          </div>
          <button
            onClick={handleHintToggle}
            className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              hintEnabled
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-400'
            }`}
          >
            {hintEnabled ? 'On' : 'Off'}
          </button>
        </div>

        {/* Reset */}
        <div className="border-t border-slate-700 pt-4 flex flex-col gap-2">
          {confirmReset ? (
            <>
              <p className="text-sm text-center text-slate-400">
                All progress, weights, and level will be erased.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleResetCancel}
                  className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetClick}
                  className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-sm font-semibold transition-colors"
                >
                  Confirm Reset
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleResetClick}
              className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-red-900/60 text-slate-300 hover:text-red-300 text-sm font-semibold transition-colors"
            >
              Reset All Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
