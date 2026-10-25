import React from 'react';

// Drains with exact pixel-locked coordinates
const SEWER_NODES_12KM = [
  { id: 'sewer_samneghat', name: 'Samne Ghat Outfall',    x: 150, startY: 100, endY: 226, isNorth: true },
  { id: 'sewer_assi',      name: 'Assi Nala Drain',      x: 270, startY: 100, endY: 226, isNorth: true },
  { id: 'sewer_central',   name: 'Central Outfall',      x: 390, startY: 100, endY: 226, isNorth: true },
  { id: 'sewer_varuna_1',  name: 'Rajghat South Drain',  x: 210, startY: 400, endY: 274, isNorth: false },
  { id: 'sewer_varuna_2',  name: 'Varuna Bank Drain',    x: 330, startY: 400, endY: 274, isNorth: false },
];

export const MicroView = ({ activeSTPs, onDropSTP }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, sewerId) => {
    e.preventDefault();
    onDropSTP(sewerId);
  };

  const totalSewers = SEWER_NODES_12KM.length;
  const count = activeSTPs.length;
  const ratio = count / totalSewers;

  // Dynamic River Color Transition: Sewage Slate (#334155) -> Clean Sky Blue (#0284c7)
  const r = Math.round(51 + (2 - 51) * ratio);
  const g = Math.round(65 + (132 - 65) * ratio);
  const b = Math.round(85 + (199 - 85) * ratio);
  const dynamicRiverColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <div className="relative w-full h-[550px] bg-emerald-100 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 font-semibold z-10 shadow-sm">
        🔍 12km Micro View: Varuna-Ganga Confluence & Outfalls
      </div>

      <svg viewBox="0 0 800 500" className="w-full h-full select-none">
        <defs>
          <linearGradient id="gangaWaterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* 1. Ganga Main River Channel */}
        <path
          d="M 580 20 L 720 480"
          stroke="url(#gangaWaterGrad)"
          strokeWidth="110"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="635"
          y="250"
          fill="#ffffff"
          transform="rotate(73, 635, 250)"
          className="text-xs font-bold tracking-widest select-none drop-shadow"
        >
          GANGA RIVER
        </text>

        {/* 2. Varuna River Bank Outer Border (Flat end with strokeLinecap="butt") */}
        <path
          d="M 0 250 C 350 250, 480 250, 610 258"
          stroke="#cbd5e1"
          strokeWidth="34"
          fill="none"
          strokeLinecap="butt"
        />

        {/* Varuna Active Channel (Flat end seamlessly touching Ganga) */}
        <path
          d="M 0 250 C 350 250, 480 250, 608 258"
          stroke={dynamicRiverColor}
          strokeWidth="26"
          fill="none"
          strokeLinecap="butt"
          className="transition-colors duration-700 ease-in-out"
        />

        {/* Animated Water Current */}
        <path
          d="M 0 250 C 350 250, 480 250, 585 258"
          stroke="#ffffff"
          strokeWidth="3"
          strokeOpacity={0.6}
          fill="none"
          strokeDasharray="12 8"
          strokeLinecap="butt"
          className="animate-[dash_1.5s_linear_infinite]"
        />

        <text
          x="40"
          y="254"
          fill="#ffffff"
          className="text-[10px] font-bold tracking-wider select-none drop-shadow-sm"
        >
          VARUNA RIVER (12 km Stretch)
        </text>

        {/* Confluence Point Marker (Placed EXACTLY on the meeting point x: 600, y: 258) */}
        <g>
          <circle cx="600" cy="258" r="12" fill="#0284c7" opacity="0.35" />
          <circle cx="600" cy="258" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
          <text
            x="600"
            y="235"
            textAnchor="middle"
            fill="#ffffff"
            className="text-[11px] font-extrabold tracking-wide select-none drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            Confluence Point
          </text>
        </g>

        {/* 3. Drain Outfall Nodes (Fixed Coordinates) */}
        {SEWER_NODES_12KM.map((sewer) => {
          const isTreated = activeSTPs.includes(sewer.id);
          const pipeStreamColor = isTreated ? "#0284c7" : "#334155";

          return (
            <g key={sewer.id}>
              {/* Pipe Outline */}
              <line
                x1={sewer.x}
                y1={sewer.startY}
                x2={sewer.x}
                y2={sewer.endY}
                stroke="#94a3b8"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Sewage Flow Stream */}
              <line
                x1={sewer.x}
                y1={sewer.startY}
                x2={sewer.x}
                y2={sewer.endY}
                stroke={pipeStreamColor}
                strokeWidth="10"
                strokeDasharray="6 3"
                className="animate-[dash_1s_linear_infinite]"
              />

              {/* Drop Target Zone */}
              <g
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, sewer.id)}
                className="cursor-pointer"
              >
                <circle
                  cx={sewer.x}
                  cy={sewer.startY}
                  r="18"
                  fill={isTreated ? '#d1fae5' : '#ffe4e6'}
                  stroke={isTreated ? '#059669' : '#f43f5e'}
                  strokeWidth="2"
                />

                {isTreated ? (
                  <text
                    x={sewer.x}
                    y={sewer.startY + 4}
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-emerald-700 select-none"
                  >
                    STP
                  </text>
                ) : (
                  <circle
                    cx={sewer.x}
                    cy={sewer.startY}
                    r="5"
                    fill="#f43f5e"
                    className="animate-pulse"
                  />
                )}
              </g>

              {/* Drain Label */}
              <text
                x={sewer.x}
                y={sewer.isNorth ? sewer.startY - 14 : sewer.startY + 24}
                textAnchor="middle"
                className="text-[10px] fill-slate-800 font-bold select-none"
              >
                {sewer.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};