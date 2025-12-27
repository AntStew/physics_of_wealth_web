import { useMemo } from "react";
import { EngineType } from "@/lib/types";
import { calculateVolatileProjection } from "@/lib/calculations";
import { MAX_PROJECTION_YEARS } from "../constants";

interface UseFlightPathProjectionParams {
  initialInvestment: number;
  monthlyInvestment: number;
  engineType: EngineType;
  desiredGoal: number;
}

export function useFlightPathProjection({
  initialInvestment,
  monthlyInvestment,
  engineType,
  desiredGoal,
}: UseFlightPathProjectionParams) {
  const projection = useMemo(() => {
    return calculateVolatileProjection(
      initialInvestment,
      monthlyInvestment,
      engineType,
      desiredGoal,
      MAX_PROJECTION_YEARS
    );
  }, [initialInvestment, monthlyInvestment, engineType, desiredGoal]);

  // Format data for chart - show monthly data but sample for readability
  // Stop at goal time if goal is reached
  const chartData = useMemo(() => {
    // If goal is reached, only show data up to goal time
    let timelineToShow = projection.timeline;
    if (projection.yearsToGoal !== null) {
      const monthsToGoal = Math.ceil(projection.yearsToGoal * 12);
      timelineToShow = projection.timeline.slice(0, monthsToGoal + 1); // +1 to include the goal point
    }
    
    const sampleRate = Math.max(1, Math.floor(timelineToShow.length / 200)); // Show max 200 points
    return timelineToShow
      .filter((_, index) => index % sampleRate === 0 || index === timelineToShow.length - 1)
      .map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        "Portfolio Value": Math.round(entry.actualWealth),
        "Goal": desiredGoal,
      }));
  }, [projection.timeline, projection.yearsToGoal, desiredGoal]);

  return {
    projection,
    chartData,
  };
}

