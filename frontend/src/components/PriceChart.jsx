// src/components/PriceChart.jsx
import React, { useState } from "react";

export default function PriceChart({ data = [] }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-neutral-400">
        डेटा उपलब्ध नाही (No data available)
      </div>
    );
  }

  const prices = data.map((d) => Number(d.price) || 0);
  const minVal = Math.min(...prices);
  const maxVal = Math.max(...prices);
  const range = maxVal - minVal || 1;
  const paddingBottom = 40;
  const paddingTop = 25;
  const chartHeight = 220;
  const chartWidth = 600;

  // Calculate coordinates
  const points = data.map((d, i) => {
    const x = 50 + (i / Math.max(data.length - 1, 1)) * (chartWidth - 80);
    const normalizedY = (d.price - minVal) / range;
    const y = chartHeight - paddingBottom - normalizedY * (chartHeight - paddingBottom - paddingTop);
    return { ...d, x, y };
  });

  // SVG path for line
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // SVG path for gradient area fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`;

  // Find index of 'today' or boundary between historical and forecast
  const todayIdx = points.findIndex((p) => p.status === "today");

  return (
    <div className="w-full space-y-2 select-none">
      {/* Legend / Hover tooltip */}
      <div className="flex items-center justify-between text-xs px-2 min-h-[28px]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
            चालू व मागील दर (Historical)
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            अंदाजित भाव (Projected)
          </span>
        </div>

        {hoveredPoint ? (
          <div className="bg-emerald-900 text-white font-bold px-2.5 py-1 rounded-lg text-xs shadow-md animate-fadeIn">
            {hoveredPoint.date}: ₹{hoveredPoint.price.toLocaleString("en-IN")}/क्विंटल
            {hoveredPoint.status === "forecast" ? " (अंदाज)" : ""}
          </div>
        ) : (
          <span className="text-neutral-400 text-[11px]">
            बिंदूवर टॅप करून दर पहा (Tap points for details)
          </span>
        )}
      </div>

      {/* SVG Chart Container */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto min-w-[500px]"
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = chartHeight - paddingBottom - pct * (chartHeight - paddingBottom - paddingTop);
            const val = Math.round(minVal + pct * range);
            return (
              <g key={idx}>
                <line
                  x1="45"
                  y1={y}
                  x2={chartWidth - 20}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeDasharray="4 4"
                />
                <text
                  x="40"
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-neutral-500 font-mono"
                >
                  ₹{val}
                </text>
              </g>
            );
          })}

          {/* Shaded Area under curve */}
          <path d={areaD} fill="url(#priceGradient)" />

          {/* Historical vs Forecast vertical boundary line */}
          {todayIdx !== -1 && (
            <g>
              <line
                x1={points[todayIdx].x}
                y1={paddingTop - 5}
                x2={points[todayIdx].x}
                y2={chartHeight - paddingBottom}
                stroke="#D97706"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x={points[todayIdx].x}
                y={paddingTop - 10}
                textAnchor="middle"
                className="text-[10px] fill-amber-700 font-bold"
              >
                आज (Today)
              </text>
            </g>
          )}

          {/* Main Price Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#2E7D32"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, i) => {
            const isToday = p.status === "today";
            const isForecast = p.status === "forecast";
            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => setHoveredPoint(p)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isToday ? 6 : 4.5}
                  fill={isToday ? "#D97706" : isForecast ? "#F59E0B" : "#1B5E20"}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all hover:r-7"
                />
                {/* X-axis date labels */}
                {(i % 2 === 0 || isToday || i === points.length - 1) && (
                  <text
                    x={p.x}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    className={`text-[10px] ${
                      isToday ? "fill-amber-800 font-bold" : "fill-neutral-500 font-medium"
                    }`}
                  >
                    {p.date.replace(" (आज)", "")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
