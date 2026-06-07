import { useState, useRef, useEffect } from 'react';
import useAdaptive, {
  getActionButtons,
  getSituationText,
} from '../hooks/useAdaptive.js';
import Timer from './Timer.jsx';
import Feedback from './Feedback.jsx';
import {
  DIFFICULTY_LABELS,
  TIMER_MULTIPLIERS,
  SUIT_COLORS,
  SUIT_SYMBOLS,
  ACTION_LABELS,
  ACTION_SHORTCUTS,
  HINT_VPIP,
} from '../constants.js';

function HandDisplay({ cards }) {
  return (
    <div className="flex gap-4">
      {cards.map(({ rank, suit }, i) => (
        <span key={i} className={`text-5xl font-bold leading-none ${SUIT_COLORS[suit]}`}>
          {rank}
          <span className="text-4xl">{SUIT_SYMBOLS[suit]}</span>
        </span>
      ))}
    </div>
  );
}

export default function Drill() {
  const {
    scenario,
    level,
    streak,
    allTimeTotal,
    allTimeCorrect,
    timerBase,
    hintEnabled,
    submitAnswer,
    recordTimedOut,
    nextScenario,
  } = useAdaptive();

  const [phase, setPhase] = useState('question');
  const [result, setResult] = useState(null);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [timerKey, setTimerKey] = useState(0);

  const inputRef = useRef(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const nextRef = useRef(null);
  nextRef.current = () => {
    nextScenario();
    setPhase('question');
    setResult(null);
    setInput('');
    setTimerKey(k => k + 1);
  };

  // Auto-focus input on new question
  useEffect(() => {
    if (phase === 'question') {
      inputRef.current?.focus();
    }
  }, [phase, timerKey]);

  // Enter key advances from feedback phase
  useEffect(() => {
    function handleGlobalKey(e) {
      if (e.key === 'Enter' && phaseRef.current === 'feedback') {
        nextRef.current();
      }
    }
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const effectiveTimeLimit = timerBase * TIMER_MULTIPLIERS[level];
  const actions = getActionButtons(scenario, level);
  const situationText = getSituationText(scenario);
  const showHint = hintEnabled && level <= 1;
  const accuracyPct = allTimeTotal > 0
    ? Math.round((allTimeCorrect / allTimeTotal) * 100)
    : null;

  function handleSubmit(actionInput) {
    if (phase !== 'question') return;
    const response = submitAnswer(actionInput);
    if (response.error) {
      setInputError(response.error);
      return;
    }
    setResult({ ...response, timedOut: false });
    setPhase('feedback');
    setInputError('');
  }

  function handleTimeout() {
    if (phase !== 'question') return;
    const { correctAction } = recordTimedOut();
    setResult({ isCorrect: false, correctAction, timedOut: true });
    setPhase('feedback');
    setInput('');
    setInputError('');
  }

  function handleNext() {
    nextRef.current();
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    if (inputError) setInputError('');
  }

  function handleInputKeyDown(e) {
    if (e.key === 'Enter') handleSubmit(input);
  }

  function handleSubmitClick() {
    handleSubmit(input);
  }

  function handleActionClick(e) {
    handleSubmit(e.currentTarget.dataset.action);
  }

  const buttonCols = actions.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <span className="font-medium">{DIFFICULTY_LABELS[level]}</span>
        <span>Streak {streak}</span>
        {accuracyPct !== null && (
          <span>{accuracyPct}% <span className="text-slate-500">({allTimeTotal})</span></span>
        )}
      </div>

      {/* Scenario card */}
      <div className="bg-slate-800 rounded-2xl p-5 flex flex-col gap-4">

        {/* Position + situation */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-widest w-20 shrink-0">
              Position
            </span>
            <span className="font-bold text-xl">{scenario.position}</span>
          </div>
          {situationText && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest w-20 shrink-0">
                Situation
              </span>
              <span className="text-slate-200 text-sm">{situationText}</span>
            </div>
          )}
        </div>

        {/* Hand */}
        <HandDisplay cards={scenario.cards} />

        {/* Hint */}
        {showHint && (
          <p className="text-xs text-slate-500 italic">{HINT_VPIP[scenario.position]}</p>
        )}

        <div className="border-t border-slate-700" />

        {/* Phase content */}
        {phase === 'question' ? (
          <div className="flex flex-col gap-4">
            <Timer key={timerKey} timeLimit={effectiveTimeLimit} onTimeout={handleTimeout} />

            {/* Text input */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="o · f · c · 3 · 4…"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="flex-1 bg-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                />
                <button
                  onClick={handleSubmitClick}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl text-sm font-semibold transition-colors"
                >
                  Submit
                </button>
              </div>
              {inputError && (
                <p className="text-xs text-red-400 px-1">{inputError}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className={`grid ${buttonCols} gap-2`}>
              {actions.map(action => (
                <button
                  key={action}
                  data-action={action}
                  onClick={handleActionClick}
                  className="flex flex-col items-center py-3 px-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors"
                >
                  <span className="text-xs text-slate-500 mb-0.5">[{ACTION_SHORTCUTS[action]}]</span>
                  <span className="font-semibold text-sm">{ACTION_LABELS[action]}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Feedback result={result} onNext={handleNext} />
        )}
      </div>
    </div>
  );
}
