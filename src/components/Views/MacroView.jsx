import React from 'react';

export const MacroView = ({ onSelectConfluence }) => {
  return (
    <div className="relative w-full h-[550px] bg-emerald-100 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center">
      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 z-10 shadow-md">
        📍 Confluence Overview Map (Macro View)
      </div>

      <svg 
        viewBox="0 0 800 500" 
        preserveAspectRatio="none" 
        className="w-full h-full select-none"
      >
        {/* 1. Ganga Main Line (Framed directly from Top Edge y=0 to Bottom Edge y=500) */}
        <path
          d="M 520 0 C 560 180, 500 320, 290 500"
          stroke="#0284c7"
          strokeWidth="60"
          fill="none"
          strokeLinecap="butt"
        />
        <text
          x="450"
          y="340"
          fill="#ffffff"
          className="text-sm font-bold tracking-widest opacity-100 drop-shadow"
          transform="rotate(-60 485 385)"
        >
          GANGA RIVER
        </text>

        {/* 2. Varuna Tributary Line (Starts directly at Left Edge x=0) */}
        <path
          d="M 0 210 C 200 210, 380 200, 480 210"
          stroke="#0284c7"
          strokeWidth="45"
          fill="none"
          strokeLinecap="butt"
        />
        <text
          x="120"
          y="215"
          fill="#ffffff"
          className="text-sm font-bold tracking-widest opacity-100 drop-shadow"
        >
          VARUNA RIVER
        </text>

        {/* 3. Clickable Confluence Target (Intersection - Fixed Anchor) */}
        <g
          onClick={onSelectConfluence}
          className="cursor-pointer group"
          style={{ transformOrigin: '480px 210px' }}
        >
          {/* Pulsing Aura Circle */}
          <circle
            cx="480"
            cy="210"
            r="35"
            className="fill-emerald-500/30 stroke-emerald-600 stroke-2 animate-pulse pointer-events-none"
          />

          {/* Solid Fixed Core Circle */}
          <circle
            cx="480"
            cy="210"
            r="12"
            className="fill-emerald-600 stroke-white stroke-2 group-hover:scale-110 transition-transform origin-[480px_210px]"
          />

          {/* Label Badge */}
          <g className="group-hover:scale-105 transition-transform origin-[480px_270px]">
            <rect
              x="360"
              y="250"
              width="240"
              height="36"
              rx="8"
              className="fill-emerald-50 stroke-emerald-700 shadow-md"
            />
            <text
              x="480"
              y="273"
              textAnchor="middle"
              className="fill-emerald-700 text-base font-bold tracking-wide select-none"
            >
              Confluence Point
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};