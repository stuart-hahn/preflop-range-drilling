import { useState } from 'react';
import Drill from './components/Drill.jsx';

function PlaceholderScreen({ title, onBack }) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <button
        onClick={onBack}
        className="self-start text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        ← Back
      </button>
      <div className="bg-slate-800 rounded-2xl p-6 text-center text-slate-500">
        {title} — coming soon
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('drill');

  function showStats() { setScreen('stats'); }
  function showSettings() { setScreen('settings'); }
  function showDrill() { setScreen('drill'); }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      {screen === 'drill' && (
        <div className="fixed top-4 right-4 flex gap-2 z-10">
          <button
            onClick={showStats}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Stats
          </button>
          <button
            onClick={showSettings}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            ⚙
          </button>
        </div>
      )}

      {screen === 'drill' && <Drill />}
      {screen === 'stats' && <PlaceholderScreen title="Stats" onBack={showDrill} />}
      {screen === 'settings' && <PlaceholderScreen title="Settings" onBack={showDrill} />}
    </div>
  );
}
