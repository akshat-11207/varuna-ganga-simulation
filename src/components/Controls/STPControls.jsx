import React from 'react';
import { RotateCcw, RotateCw, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

export const STPControls = ({ undo, redo, reset, canUndo, canRedo, view, setView }) => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-3">
      {/* Draggable STP Source */}
      <div className="flex items-center gap-3">
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'STP_PLANT')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing shadow transition-all font-semibold text-xs select-none"
        >
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          Drag STP Icon
        </div>
        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          Drop onto any red sewer node to install
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setView(view === 'macro' ? 'micro' : 'macro')}
          className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-300 transition-colors mr-2"
        >
          {view === 'macro' ? <ZoomIn className="w-3.5 h-3.5 text-slate-600" /> : <ZoomOut className="w-3.5 h-3.5 text-slate-600" />}
          {view === 'macro' ? 'Go to Micro View' : 'Back to Overview'}
        </button>

        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 rounded-lg transition-colors border border-slate-200"
          title="Undo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 rounded-lg transition-colors border border-slate-200"
          title="Redo"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={reset}
          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
          title="Reset All STPs"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};