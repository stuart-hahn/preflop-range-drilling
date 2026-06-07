import { useState } from 'react';
import Drill from './components/Drill.jsx';
import Stats from './components/Stats.jsx';
import Settings from './components/Settings.jsx';

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
      {screen === 'stats' && <Stats onBack={showDrill} />}
      {screen === 'settings' && <Settings onBack={showDrill} />}
    </div>
  );
}
