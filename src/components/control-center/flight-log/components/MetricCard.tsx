import { ReactNode } from "react";
import { InfoTooltip } from "../../rocketship/components/InfoTooltip";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  borderColor: string;
  textColor: string;
  iconColor: string;
  tooltipKey: string;
  tooltipText: string;
  isTooltipOpen: boolean;
  onTooltipToggle: () => void;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  borderColor,
  textColor,
  iconColor,
  tooltipKey,
  tooltipText,
  isTooltipOpen,
  onTooltipToggle,
}: MetricCardProps) {
  return (
    <div className={`relative bg-black/40 border ${borderColor} rounded-lg p-4 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs ${textColor} uppercase tracking-wide`}>{title}</span>
        <InfoTooltip 
          metricKey={tooltipKey} 
          isOpen={isTooltipOpen}
          onToggle={onTooltipToggle}
        />
      </div>
      {isTooltipOpen && (
        <div className={`mb-3 p-2 bg-black/80 rounded border ${borderColor} text-xs ${textColor}`}>
          {tooltipText}
        </div>
      )}
      <div className="flex items-center gap-2 mb-1">
        <div className={iconColor}>{icon}</div>
        <div className={`text-3xl font-bold ${textColor} font-mono`}>{value}</div>
      </div>
      <div className={`text-xs ${textColor} font-mono`}>{subtitle}</div>
    </div>
  );
}

