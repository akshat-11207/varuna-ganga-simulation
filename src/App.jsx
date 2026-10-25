import React, { useState } from 'react';
import { useSimulationHistory } from './hooks/useSimulationHistory';
import { MacroView } from './components/Views/MacroView';
import { MicroView } from './components/Views/MicroView';
import { STPControls } from './components/Controls/STPControls';

export default function App() {
  const [view, setView] = useState('macro'); // 'macro' or 'micro'
  const { activeSTPs, installSTP, undo, redo, reset, canUndo, canRedo } = useSimulationHistory();

  const stpCount = activeSTPs.length;
  const totalSewers = 5;

  const bodValue = Math.max(6, 65 - stpCount * 12);
  const doValue = Math.min(7.2, 0.8 + stpCount * 1.3).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8 flex flex-col gap-6 font-sans">
      {/* Header with Sky-Blue Text */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-2 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-sky-600">
            Varuna-Ganga Water Quality Simulation
          </h1>
          <p className="text-xs text-slate-500">
            12km Radius Interventions: Samne Ghat to Varuna-Ganga Confluence
          </p>
        </div>
        <div className="text-xs bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-medium">
          Installed STPs: <span className="font-bold text-sky-600">{stpCount} / {totalSewers}</span>
        </div>
      </header>

      {/* Control Toolbar */}
      <STPControls
        undo={undo}
        redo={redo}
        reset={reset}
        canUndo={canUndo}
        canRedo={canRedo}
        view={view}
        setView={setView}
      />

      {/* Main Content Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Area */}
        <div className="lg:col-span-3">
          {view === 'macro' ? (
            <MacroView onSelectConfluence={() => setView('micro')} />
          ) : (
            <MicroView activeSTPs={activeSTPs} onDropSTP={installSTP} />
          )}
        </div>

        {/* Analytics & Data Panel */}
        <aside className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <h2 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-2">
            📊 Water Parameters (REST API Sync)
          </h2>

          <div className="space-y-4 text-xs">
            {/* BOD Parameter */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-1 font-medium">Biological Oxygen Demand (BOD)</span>
              <div className="text-2xl font-bold text-slate-800">{bodValue} mg/L</div>
              <span className={`text-[11px] font-semibold ${bodValue <= 20 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {bodValue <= 20 ? '✓ Safe Limits Restored' : '⚠ Severe Sewage Contamination'}
              </span>
            </div>

            {/* DO Parameter */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-1 font-medium">Dissolved Oxygen (DO)</span>
              <div className="text-2xl font-bold text-slate-800">{doValue} mg/L</div>
              <span className={`text-[11px] font-semibold ${doValue >= 4.0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {doValue >= 4.0 ? '✓ Aquatic Life Support Active' : '⚠ Critical Hypoxia / Anoxic Zone'}
              </span>
            </div>

            {/* Overall Stream Health */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-1 font-medium">12km River Stretch Health</span>
              <div className="text-sm font-bold text-sky-700 mt-1">
                {stpCount === 0 && 'Highly Polluted (Raw Discharge)'}
                {stpCount >= 1 && stpCount < 3 && 'Partial Treatment Active'}
                {stpCount >= 3 && 'Restored Clean Flow (Ganga Quality)'}
              </div>
            </div>

            {/* Instructions Info Box */}
            <div className="bg-sky-50 p-3 rounded-lg border border-sky-200 text-[11px] text-sky-900 leading-relaxed">
              💡 <strong className="text-sky-950">How to use:</strong> Drag the green <strong className="text-emerald-600">STP Icon</strong> from the top toolbar onto any red outfall node on the map to treat that sewer branch.
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}