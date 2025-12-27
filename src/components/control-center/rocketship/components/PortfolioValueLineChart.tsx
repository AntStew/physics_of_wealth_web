"use client";

interface PortfolioValueLineChartProps {
  currentValue: number;
}

export function PortfolioValueLineChart({ currentValue }: PortfolioValueLineChartProps) {
  const months = 12;
  const initialValue = currentValue * 0.6; // Start at 60% of current value
  const growthRate = 0.02; // Exponential growth rate
  
  // Generate exponential growth data
  const data: number[] = [];
  for (let i = 0; i < months; i++) {
    // Exponential function: y = a * e^(r*t)
    const t = i / months;
    const value = initialValue * Math.exp(growthRate * t * months);
    data.push(value);
  }
  
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  // Full size dimensions
  const chartHeight = 200;
  const chartWidth = 300;
  const leftPadding = 40; // Space for y-axis labels
  const rightPadding = 10;
  const topPadding = 10;
  const bottomPadding = 30; // Space for x-axis labels
  const plotWidth = chartWidth - leftPadding - rightPadding;
  const plotHeight = chartHeight - topPadding - bottomPadding;
  
  // Generate points for the exponential curve
  const points = data.map((value, index) => {
    const x = (index / (months - 1)) * plotWidth + leftPadding;
    const y = topPadding + plotHeight - ((value - minValue) / range) * plotHeight;
    return `${x},${y}`;
  }).join(' ');
  
  // Create area path for the integral (area under the curve)
  const areaPath = [
    `M ${leftPadding},${topPadding + plotHeight}`,
    ...data.map((value, index) => {
      const x = (index / (months - 1)) * plotWidth + leftPadding;
      const y = topPadding + plotHeight - ((value - minValue) / range) * plotHeight;
      return `L ${x},${y}`;
    }),
    `L ${chartWidth - rightPadding},${topPadding + plotHeight}`,
    'Z'
  ].join(' ');
  
  // Generate y-axis dollar labels
  const yAxisSteps = 5;
  const yAxisLabels: number[] = [];
  for (let i = 0; i <= yAxisSteps; i++) {
    const value = minValue + (range * i / yAxisSteps);
    yAxisLabels.push(value);
  }
  
  // Generate x-axis time labels (months)
  const monthLabels = [];
  for (let i = 0; i < months; i += 2) { // Show every 2 months
    monthLabels.push(i);
  }
  if (monthLabels[monthLabels.length - 1] !== months - 1) {
    monthLabels.push(months - 1);
  }
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };
  
  return (
    <div className="w-full h-full min-h-[200px]">
      <svg 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        className="w-full h-full" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="integral-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.4)" />
            <stop offset="50%" stopColor="rgba(6,182,212,0.2)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.05)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines (horizontal) */}
        {yAxisLabels.map((value, i) => {
          const y = topPadding + plotHeight - (i / yAxisSteps) * plotHeight;
          return (
            <line
              key={i}
              x1={leftPadding}
              y1={y}
              x2={chartWidth - rightPadding}
              y2={y}
              stroke="rgba(6,182,212,0.15)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          );
        })}
        
        {/* Grid lines (vertical) */}
        {monthLabels.map((month) => {
          const x = (month / (months - 1)) * plotWidth + leftPadding;
          return (
            <line
              key={month}
              x1={x}
              y1={topPadding}
              x2={x}
              y2={topPadding + plotHeight}
              stroke="rgba(6,182,212,0.1)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          );
        })}
        
        {/* Area under curve (integral) */}
        <path
          d={areaPath}
          fill="url(#integral-gradient)"
          opacity={0.6}
        />
        
        {/* Exponential curve line */}
        <polyline
          points={points}
          fill="none"
          className="stroke-cyan-400"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.8))' }}
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (months - 1)) * plotWidth + leftPadding;
          const y = topPadding + plotHeight - ((value - minValue) / range) * plotHeight;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              className="fill-cyan-400"
              style={{ filter: 'drop-shadow(0 0 3px rgba(6,182,212,1))' }}
            />
          );
        })}
        
        {/* Y-axis labels (dollar amounts) */}
        {yAxisLabels.map((value, i) => {
          const y = topPadding + plotHeight - (i / yAxisSteps) * plotHeight;
          return (
            <text
              key={i}
              x={leftPadding - 5}
              y={y + 4}
              className="text-[9px] fill-cyan-300/80 font-mono"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {formatCurrency(value)}
            </text>
          );
        })}
        
        {/* X-axis labels (time - months) */}
        {monthLabels.map((month) => {
          const x = (month / (months - 1)) * plotWidth + leftPadding;
          return (
            <text
              key={month}
              x={x}
              y={chartHeight - 10}
              className="text-[9px] fill-cyan-300/80 font-mono"
              textAnchor="middle"
            >
              {month === 0 ? '0M' : month === months - 1 ? '12M' : `${month}M`}
            </text>
          );
        })}
        
        {/* Axis lines */}
        <line
          x1={leftPadding}
          y1={topPadding}
          x2={leftPadding}
          y2={topPadding + plotHeight}
          stroke="rgba(6,182,212,0.4)"
          strokeWidth="1"
        />
        <line
          x1={leftPadding}
          y1={topPadding + plotHeight}
          x2={chartWidth - rightPadding}
          y2={topPadding + plotHeight}
          stroke="rgba(6,182,212,0.4)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

