import { TimePeriod, TIME_PERIODS } from "../constants";

interface TimePeriodToggleProps {
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
}

export function TimePeriodToggle({ timePeriod, onTimePeriodChange }: TimePeriodToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-black/40 border border-cyan-500/30 rounded-lg p-1 backdrop-blur-sm">
        {TIME_PERIODS.map((period) => (
          <button
            key={period.value}
            onClick={() => onTimePeriodChange(period.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              timePeriod === period.value
                ? "bg-cyan-500/30 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                : "text-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-500/10"
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
}

