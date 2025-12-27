"use client";

interface CircularGaugeProps {
  value: number;
  label: string;
  size?: number;
  color?: "cyan" | "blue" | "green" | "purple";
}

export function CircularGauge({ value, label, size = 120, color = "cyan" }: CircularGaugeProps) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  
  const colorClasses = {
    cyan: "stroke-cyan-400",
    blue: "stroke-blue-400",
    green: "stroke-green-400",
    purple: "stroke-purple-400"
  };

  const textColorClasses = {
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400"
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={colorClasses[color]}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-3xl md:text-4xl font-bold ${textColorClasses[color]}`}>
          {value}%
        </div>
        <div className="text-sm text-cyan-300/70 uppercase tracking-wide mt-1">{label}</div>
      </div>
    </div>
  );
}

