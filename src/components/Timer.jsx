import { useState, useEffect, useRef } from 'react';

export default function Timer({ timeLimit, onTimeout }) {
  const [remaining, setRemaining] = useState(timeLimit);
  const fired = useRef(false);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  useEffect(() => {
    const startTime = Date.now();
    const tick = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const left = Math.max(0, timeLimit - elapsed);
      setRemaining(left);
      if (left === 0 && !fired.current) {
        fired.current = true;
        clearInterval(tick);
        onTimeoutRef.current();
      }
    }, 100);
    return () => clearInterval(tick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- one-shot; reset via key prop

  const pct = (remaining / timeLimit) * 100;
  const secs = Math.ceil(remaining);
  const barColor = pct > 50 ? 'bg-green-500' : pct > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-[width] duration-100 ease-linear`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm font-mono tabular-nums text-slate-400">
        {secs}s
      </span>
    </div>
  );
}
